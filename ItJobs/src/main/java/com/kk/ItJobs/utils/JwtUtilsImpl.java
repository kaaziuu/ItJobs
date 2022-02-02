package com.kk.ItJobs.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@Service
public class JwtUtilsImpl implements JwtUtils {
    public static final String secret = "topSecret";

    public String generateJwt(String username, List<String> roles, String requestUrl) {
        var algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000)) // 30 minutes
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

    public void setTokensToResponse(HttpServletResponse response, String accessToken) throws IOException {
        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", accessToken);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }

    public void setErrorToResponse(HttpServletResponse response, Exception exception) throws IOException {
        log.error("Error loggin in: {}", exception.getMessage());
        response.setHeader("error", exception.getMessage());
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

}
