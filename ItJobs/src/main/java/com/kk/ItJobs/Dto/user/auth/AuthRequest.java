package com.kk.ItJobs.Dto.user.auth;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class AuthRequest {
    private String username;
    private String password;
}
