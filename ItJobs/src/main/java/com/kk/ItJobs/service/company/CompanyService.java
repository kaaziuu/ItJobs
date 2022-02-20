package com.kk.ItJobs.service.company;

import com.kk.ItJobs.Dto.BaseResponse;
import com.kk.ItJobs.Dto.company.CompanyResponse;
import com.kk.ItJobs.Dto.company.CreateCompanyRequest;
import com.kk.ItJobs.model.AppUser;

public interface CompanyService {
    BaseResponse<CompanyResponse> createCompany(CreateCompanyRequest createCompanyRequest, AppUser user);

    CompanyResponse getCompany(AppUser user);
}
