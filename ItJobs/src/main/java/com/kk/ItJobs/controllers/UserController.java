package com.kk.ItJobs.controllers;

import com.kk.ItJobs.Dto.BaseResponse;
import com.kk.ItJobs.Dto.user.auth.AuthResponse;
import com.kk.ItJobs.Dto.user.auth.LoginRequest;
import com.kk.ItJobs.Dto.user.auth.RegisterRequest;
import com.kk.ItJobs.model.AppUser;
import com.kk.ItJobs.service.user.UserService;
import com.kk.ItJobs.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

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

    @PostMapping("/login/v2")
    public BaseResponse<AuthResponse> Login(
            @RequestBody LoginRequest loginRequest,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws RuntimeException {
        var user = userService.login(loginRequest);
        if (user == null) {
            throw new RuntimeException("invalid username or password");
        }
        var accessToken = jwtUtils.generateJwt(user, request.getRequestURL().toString());
        return new BaseResponse<>(
                true,
                "",
                accessToken,
                AuthResponse.fromAppUser(user)
        );
    }

    @PostMapping("/register")
    public BaseResponse<AuthResponse> register(
            @RequestBody RegisterRequest registerRequest,
            HttpServletRequest request
    ) {
        var user = userService.register(registerRequest);
        if (user == null) {
            return new BaseResponse<>(
                    false,
                    "user with this username exist",
                    "",
                    null
            );
        }
        var accessToken = jwtUtils.generateJwt(user, request.getRequestURL().toString());
        return new BaseResponse<>(
                true,
                "",
                accessToken,
                AuthResponse.fromAppUser(user)
        );
    }

    @PostMapping("/user/data")
    public BaseResponse<AuthResponse> refreshToken(
            @RequestBody String token,
            HttpServletRequest request) {

        if (token != null) {
            try {
                var username = jwtUtils.getUsernameFromToken(token);
                AppUser user = userService.getUser(username);
                var accessToken = jwtUtils.generateJwt(user, request.getRequestURL().toString());
                return new BaseResponse<>(
                        true,
                        "",
                        accessToken,
                        AuthResponse.fromAppUser(user)
                );

            } catch (Exception exception) {
                return new BaseResponse<>(
                        false,
                        "invalid token",
                        "",
                        null
                );
            }
        }
        return new BaseResponse<>(
                false,
                "missing token",
                "",
                null
        );
    }
}

