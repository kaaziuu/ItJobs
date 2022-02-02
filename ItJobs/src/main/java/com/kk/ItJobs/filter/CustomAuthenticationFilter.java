package com.kk.ItJobs.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kk.ItJobs.Dto.user.auth.AuthRequest;
import com.kk.ItJobs.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            var reader = request.getReader();
            StringBuffer stringBuffer = new StringBuffer();
            String line = null;
            while ((line = reader.readLine()) != null) {
                stringBuffer.append(line);
            }
            String parsedReq = stringBuffer.toString();
            ObjectMapper mapper = new ObjectMapper();
            var authRequest = mapper.readValue(parsedReq, AuthRequest.class);
            var authenticationToken =
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword());
            return authenticationManager.authenticate(authenticationToken);
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException {
        User user = (User) authResult.getPrincipal();

        var roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        String accessToken = jwtUtils.generateJwt(user.getUsername(), roles, request.getRequestURL().toString());

        String refreshToken = jwtUtils.generateRefreshToken(user.getUsername(), request.getRequestURL().toString());
        jwtUtils.setRefreshTokenToCookie(response, refreshToken);
        jwtUtils.setTokensToResponse(response, accessToken);
    }
}
