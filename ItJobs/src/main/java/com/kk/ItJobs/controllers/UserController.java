package com.kk.ItJobs.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.kk.ItJobs.Dto.user.BaseResponse;
import com.kk.ItJobs.Dto.user.auth.AuthResponse;
import com.kk.ItJobs.Dto.user.auth.LoginRequest;
import com.kk.ItJobs.Dto.user.auth.RegisterRequest;
import com.kk.ItJobs.model.AppUser;
import com.kk.ItJobs.service.user.UserService;
import com.kk.ItJobs.utils.JwtUtils;
import com.kk.ItJobs.utils.JwtUtilsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserController {
    private final UserService userService;
    private final JwtUtils jwtUtils;

    @GetMapping("/user/all")
    public ResponseEntity<List<AppUser>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/user/save")
    public ResponseEntity<AppUser> saveUser(@RequestBody AppUser user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @PostMapping("/login/v2")
    public AuthResponse Login(
            @RequestBody LoginRequest loginRequest,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws RuntimeException {
        var user = userService.login(loginRequest);
        if (user == null) {
            throw new RuntimeException("invalid username or password");
        }
        var accessToken = jwtUtils.setAccessTokenAndRefreshToken(response, request, user);
        return new AuthResponse(
                accessToken,
                user.getName(),
                user.getSurname(),
                user.getUsername(),
                user.getId()
        );
    }

    @PostMapping("/register")
    public BaseResponse<AuthResponse> register(
            @RequestBody RegisterRequest registerRequest,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        var user = userService.register(registerRequest);
        if (user == null) {
            return new BaseResponse<>(
                    false,
                    "user with this username exist",
                    null
            );
        }
        var accessToken = jwtUtils.setAccessTokenAndRefreshToken(response, request, user);
        return new BaseResponse<>(
                true,
                "",
                new AuthResponse(
                        accessToken,
                        user.getName(),
                        user.getSurname(),
                        user.getPassword(),
                        user.getId()
                ));
    }

    @PostMapping("/token/refresh")
    public AuthResponse refreshToken(
            @CookieValue(value = "refreshToken") String refreshToken,
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        if (refreshToken != null) {
            try {
                Algorithm algorithm = Algorithm.HMAC256(JwtUtilsImpl.secret.getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                var username = decodedJWT.getSubject();
                AppUser user = userService.getUser(username);
                var accessToken = jwtUtils.setAccessTokenAndRefreshToken(response, request, user);
                return new AuthResponse(
                        accessToken,
                        user.getName(),
                        user.getSurname(),
                        user.getUsername(),
                        user.getId()
                );

            } catch (Exception exception) {
                jwtUtils.setErrorToResponse(response, exception);
            }
        }
        throw new RuntimeException("Refresh token is missing ");
    }

    @PostMapping("/logout/v2")
    public void logout(HttpServletResponse response){
        jwtUtils.removeRefreshToken(response);
    }
}

