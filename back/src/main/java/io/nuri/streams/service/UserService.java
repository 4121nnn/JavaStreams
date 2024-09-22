package io.nuri.streams.service;

import io.jsonwebtoken.Claims;
import io.nuri.streams.dto.PasswordDto;
import io.nuri.streams.dto.Response;
import io.nuri.streams.dto.UserDto;
import io.nuri.streams.dto.UserRequest;
import io.nuri.streams.entity.Role;
import io.nuri.streams.entity.UserEntity;
import io.nuri.streams.exception.EmailExistsException;
import io.nuri.streams.exception.UserNotFoundException;
import io.nuri.streams.repository.RoleRepository;
import io.nuri.streams.repository.UserRepository;
import io.nuri.streams.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager manager;
    private final RoleRepository roleRepository;

    public String createUser(UserRequest userRequest) {
        String email = userRequest.email().toLowerCase();
        Optional<UserEntity> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            throw new EmailExistsException("Email already exists");
        }
        Role role = roleRepository.findByName("USER").orElse(new Role(1L, "USER"));

        String name = email.substring(0, email.indexOf('@'));
        userRepository.save(UserEntity.builder()
                        .username(name)
                        .email(email)
                        .password(encoder.encode(userRequest.password()))
                        .roles(Set.of(role))
                        .build());

        return "Account Created.";
    }

    public UserDto getUserById(String userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User does not exists with id: " + userId));

        return new UserDto(user.getId(), user.getUsername(), user.getEmail());
    }

    public Response changeUserPassword(PasswordDto passwordDto){
        if(passwordDto.newPassword() != null && !passwordDto.newPassword().equals(passwordDto.newPasswordRetype())){
            return new Response(Map.of("newPassword", "Passwords do not match"));
        }

        UserEntity userEntity = findByEmail(passwordDto.email());
        userEntity.setPassword(passwordDto.newPassword());
        userRepository.save(userEntity);

        return new Response(Map.of("SUCCESS", "Password changed successfully"));
    }

    public void deleteUserById(String userId){
        userRepository.deleteById(userId);
    }

    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User does not exists with email: " + email));

    }

    public String login(UserRequest userRequest){
        // this token is different from Jwt
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                userRequest.email(),
                userRequest.password()
        );

        // this will fault if credentials are not valid
        Authentication authentication = manager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        UserEntity userEntity = findByEmail(user.getUsername());
        return JwtUtil.generateToken(userEntity);
    }

    public String oAuth2Handler(String name, String email) {
        Optional<UserEntity> optionalUser = userRepository.findByEmail(email);

        if(optionalUser.isPresent()){
            UserEntity userEntity = optionalUser.get();
            return JwtUtil.generateToken(userEntity);
        }else{
            Role role = roleRepository.findByName("USER").orElse(new Role(1L, "USER"));

            UserEntity newUser = userRepository.save(UserEntity.builder()
                    .username(name)
                    .email(email)
                    .password(encoder.encode("RANDOM_PASSWORD"))
                    .roles(Set.of(role))
                    .build());

            return JwtUtil.generateToken(newUser);
        }


    }

    public String exchangeOneTimeToken(String token) {
        Claims claims = JwtUtil.getClaimsOfOneTimeToken(token);

        String name = (String) claims.get("name");
        String email = claims.getSubject();
        return oAuth2Handler(name, email);
    }
}
