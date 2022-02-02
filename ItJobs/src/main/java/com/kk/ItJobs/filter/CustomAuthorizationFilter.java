package com.kk.ItJobs.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.kk.ItJobs.security.PublicApi;
import com.kk.ItJobs.utils.JwtUtils;
import com.kk.ItJobs.utils.JwtUtilsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
@RequiredArgsConstructor
public class CustomAuthorizationFilter extends OncePerRequestFilter {
    private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var authorizationHeader = request.getHeader(AUTHORIZATION);

        if (!PublicApi.publicApiList.contains(request.getServletPath())
                && authorizationHeader != null
                && authorizationHeader.startsWith("Bearer ")) {
            try {
                var token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256(JwtUtilsImpl.secret.getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(token);
                var username = decodedJWT.getSubject();
                var roles = decodedJWT.getClaim("roles").asArray(String.class);
                Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                stream(roles).forEach(role -> {
                    authorities.add(new SimpleGrantedAuthority(role));
                });
                var authenticationToken = new UsernamePasswordAuthenticationToken(username, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } catch (Exception exception) {
                jwtUtils.setErrorToResponse(response, exception);
            }
        }
        filterChain.doFilter(request, response);
    }
}