package com.kk.ItJobs.Dto.company;

import com.kk.ItJobs.model.Company;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CompanyResponse {
    private Long id;
    private String name;
    private Integer size;
    private String description;
    private String motto;

    public static CompanyResponse companyResponseFromCompany(Company company) {
        return new CompanyResponse(
                company.getId(),
                company.getName(),
                company.getSize(),
                company.getDescription(),
                company.getMotto()
        );
    }
}
