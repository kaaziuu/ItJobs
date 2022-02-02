package com.kk.ItJobs.Dto.user.auth;

import com.kk.ItJobs.Dto.user.BaseResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterResponse {
    private String accessToken;
}
