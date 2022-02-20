package com.kk.ItJobs.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kk.ItJobs.Dto.BaseResponse;
import com.kk.ItJobs.Dto.user.auth.AuthResponse;
import com.kk.ItJobs.model.AppUser;
import com.kk.ItJobs.model.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@Service
public class JwtUtilsImpl implements JwtUtils {
    public static final String secret = "topSecret";
    private final Integer howLongIsValidAccessToken = 60 * 60 * 24 * 7 * 1000; // 7 days

    public String generateJwt(String username, List<String> roles, String requestUrl) {
        var algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + howLongIsValidAccessToken))
                .withIssuer(requestUrl)
                .withClaim("roles", roles)
                .sign(algorithm);
    }

    @Override
    public String generateJwt(AppUser user, String requestUrl) {
        var roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
        return generateJwt(user.getUsername(), roles, requestUrl);
    }

    @Override
    public void setAuthResponseToResponse(HttpServletResponse response, String accessToken, AppUser user) throws IOException {
        response.setContentType(APPLICATION_JSON_VALUE);
        var baseResponse = new BaseResponse<>(
                true,
                "",
                accessToken,
                AuthResponse.fromAppUser(user)
        );
        new ObjectMapper().writeValue(response.getOutputStream(), baseResponse);
    }

    public void setErrorToResponse(HttpServletResponse response, Exception exception) throws IOException {
        log.error("Error loggin in: {}", exception.getMessage());
        response.setStatus(FORBIDDEN.value());
        Map<String, String> error = new HashMap<>();
        error.put("errorMessage", exception.getMessage());
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), error);
    }

    @Override
    public String getUsernameFromToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(JwtUtilsImpl.secret.getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getSubject();
    }

    @Override
    public String getUsernameFromRequest(HttpServletRequest request) {
        var token = request.getHeader(AUTHORIZATION);
        if(token != null && token.startsWith("Bearer ")){
            token = token.substring("Bearer ".length());
            return getUsernameFromToken(token);
        }
        return null;
    }

}
