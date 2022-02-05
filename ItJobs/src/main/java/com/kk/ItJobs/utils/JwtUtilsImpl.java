package com.kk.ItJobs.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kk.ItJobs.Dto.user.auth.AuthResponse;
import com.kk.ItJobs.model.AppUser;
import com.kk.ItJobs.model.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@Service
public class JwtUtilsImpl implements JwtUtils {
    public static final String secret = "topSecret";
    private final Integer howLongIsValidAccessToken = 10 * 60 * 1000; // 30 minutes

    public String generateJwt(String username, List<String> roles, String requestUrl) {
        var algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + howLongIsValidAccessToken))
                .withIssuer(requestUrl)
                .withClaim("roles", roles)
                .sign(algorithm);
    }

    public String generateRefreshToken(String username, String requestUrl) {
        var algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 24 * 7 * 1000)) // one week
                .withIssuer(requestUrl)
                .sign(algorithm);
    }

    @Override
    public void setAuthResponseToResponse(HttpServletResponse response, String accessToken, AppUser user) throws IOException {
        response.setContentType(APPLICATION_JSON_VALUE);
        var authResponse = new AuthResponse(
                accessToken,
                user.getName(),
                user.getSurname(),
                user.getUsername(),
                user.getId()
        );
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
    }

    public void setErrorToResponse(HttpServletResponse response, Exception exception) throws IOException {
        log.error("Error loggin in: {}", exception.getMessage());
        response.setStatus(FORBIDDEN.value());
        Map<String, String> error = new HashMap<>();
        error.put("errorMessage", exception.getMessage());
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), error);
    }

    public void setRefreshTokenToCookie(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    @Override
    public String getUsernameFormRequest(HttpServletRequest request) {
        return null;
    }

    @Override
    public String setAccessTokenAndRefreshToken(HttpServletResponse response, HttpServletRequest request, AppUser user) {
        var roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
        var accessToken = generateJwt(user.getUsername(), roles, request.getRequestURL().toString());
        var refreshToken = generateRefreshToken(user.getUsername(), request.getRequestURL().toString());
        setRefreshTokenToCookie(response, refreshToken);
        return accessToken;
    }

    @Override
    public void removeRefreshToken(HttpServletResponse response) {
        Cookie cookie = new Cookie("refreshToken", "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

}
