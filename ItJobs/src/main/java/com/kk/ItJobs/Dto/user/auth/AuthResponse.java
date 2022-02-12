package com.kk.ItJobs.Dto.user.auth;

import com.kk.ItJobs.Dto.user.BaseResponse;
import com.kk.ItJobs.model.AppUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String name;
    private String surname;
    private String username;
    private Long id;

    public static AuthResponse fromAppUser(AppUser user){
        return new AuthResponse(
                user.getName(),
                user.getSurname(),
                user.getUsername(),
                user.getId()
        );
    }
}
