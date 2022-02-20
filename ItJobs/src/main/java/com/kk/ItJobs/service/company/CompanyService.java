package com.kk.ItJobs.service.company;

import com.kk.ItJobs.Dto.BaseResponse;
import com.kk.ItJobs.Dto.company.CompanyResponse;
import com.kk.ItJobs.Dto.company.CreateUpdateCompanyRequest;
import com.kk.ItJobs.model.AppUser;

public interface CompanyService {
    BaseResponse<CompanyResponse> createCompany(CreateUpdateCompanyRequest createUpdateCompanyRequest, AppUser user);

    CompanyResponse getCompany(AppUser user);

    BaseResponse<CompanyResponse> updateCompany(CreateUpdateCompanyRequest updateCompanyRequest, AppUser user);
}
