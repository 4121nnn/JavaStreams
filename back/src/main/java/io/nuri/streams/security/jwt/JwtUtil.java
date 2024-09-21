package io.nuri.streams.security.jwt;

import io.nuri.streams.entity.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class JwtUtil {

    private static final long EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days
    private static final String SIGNING_KEY = "thisIsMySecretKeyForMyApplicationIWillChangeItLaterthisIsMySecretKeyForMyApplicationIWillChangeItLater";

    public static String generateToken(UserEntity user){
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("roles", user.getRoles())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getKey())
                .compact();
    }

    public static String generateOneTimeToke(UserEntity user){
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("name", user.getUsername())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 10))
                .signWith(getKey())
                .compact();
    }

    public static Claims getClaims(String token){
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public static Claims getClaimsOfOneTimeToken(String token){
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public static String getEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public static boolean isTokenValid(String token){
        return !isExpired(token);
    }

    private static boolean isExpired(String token) {
        return getClaims(token)
                .getExpiration()
                .before(new Date());
    }


    private static SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SIGNING_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public static List<GrantedAuthority> getAuthoritiesFromToken(String token) {
        Claims claims = getClaims(token);
        List<String> roles = claims.get("roles", List.class);

        if (roles == null) {
            return List.of();
        }

        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    private static  <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getClaims(token);
        return claimsResolver.apply(claims);
    }
}
