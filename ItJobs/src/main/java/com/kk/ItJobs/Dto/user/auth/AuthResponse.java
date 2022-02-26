package com.kk.ItJobs.Dto.user.auth;

import com.kk.ItJobs.Dto.company.CompanyResponse;
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
    private CompanyResponse company;

    public static AuthResponse fromAppUser(AppUser user) {
        var company = user.getCompany() != null
                ? CompanyResponse.companyResponseFromCompany(user.getCompany())
                : null;

        return new AuthResponse(
                user.getName(),
                user.getSurname(),
                user.getUsername(),
                user.getId(),
                company
        );
    }
}
