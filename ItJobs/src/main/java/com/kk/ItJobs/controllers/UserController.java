package com.kk.ItJobs.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.kk.ItJobs.Dto.user.BaseResponse;
import com.kk.ItJobs.Dto.user.auth.RegisterRequest;
import com.kk.ItJobs.Dto.user.auth.RegisterResponse;
import com.kk.ItJobs.Dto.user.roles.RoleToUserForm;
import com.kk.ItJobs.model.AppUser;
import com.kk.ItJobs.model.Role;
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
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
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

    @PostMapping("/register")
    public BaseResponse<RegisterResponse> register(
            @RequestBody RegisterRequest registerRequest,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        var user = userService.register(registerRequest);
        if(user == null){
            return new BaseResponse<>(
                    false,
                    "user with this username exist",
                    null
            );
        }
        var roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
        var accessToken = jwtUtils.generateJwt(user.getUsername(), roles, request.getRequestURL().toString());
        var refreshToken = jwtUtils.generateRefreshToken(user.getUsername(), request.getRequestURL().toString());
        jwtUtils.setRefreshTokenToCookie(response, refreshToken);
        return new BaseResponse<>(
                true,
                "",
                new RegisterResponse(accessToken));
    }

    @PostMapping("/token/refresh")
    public void refreshToken(
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
                var roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
                String accessToken = jwtUtils.generateJwt(user.getUsername(), roles, request.getRequestURL().toString());
                jwtUtils.setTokensToResponse(response, accessToken);
            } catch (Exception exception) {
                jwtUtils.setErrorToResponse(response, exception);
            }
        } else {
            throw new RuntimeException("Refresh token is missing ");
        }

    }
}

