package io.nuri.streams.security.oauth2;

import io.nuri.streams.entity.UserEntity;
import io.nuri.streams.security.jwt.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Slf4j
@Component
public class Oauth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        DefaultOAuth2User oAuth2User = (DefaultOAuth2User) authentication.getPrincipal();

        if(oAuth2User == null) {
            log.error("OAuth2 user is null");
        }
        String name = (String) oAuth2User.getAttributes().get("name");
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = null;
        if(attributes.containsKey("sub")){
            // google
            email = (String) attributes.get("email");
        }else if(attributes.containsKey("login")){
            // github
            email =  "[GITHUB]-" + (String) attributes.get("login");
        }


        String token = JwtUtil.generateOneTimeToke(UserEntity.builder()
                        .username(name)
                        .email(email)
                        .build());

        String redirectUrl =  "http://localhost:3000" + "/oauth2-success?token=" + URLEncoder.encode(token, StandardCharsets.UTF_8);

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
