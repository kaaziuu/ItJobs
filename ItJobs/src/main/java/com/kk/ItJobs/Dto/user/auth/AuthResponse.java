package com.kk.ItJobs.Dto.user.auth;

import com.kk.ItJobs.Dto.user.BaseResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String name;
    private String surname;
    private String username;
    private Long id;
}
