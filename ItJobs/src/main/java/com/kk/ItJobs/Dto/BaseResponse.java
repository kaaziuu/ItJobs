package com.kk.ItJobs.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponse<T> {
    private Boolean isSuccess;
    private String message;
    private String accessToken;
    private T data;
}
