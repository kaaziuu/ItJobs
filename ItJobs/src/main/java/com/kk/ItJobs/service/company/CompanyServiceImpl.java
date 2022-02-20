package com.kk.ItJobs.service.company;

import com.kk.ItJobs.Dto.BaseResponse;
import com.kk.ItJobs.Dto.company.CompanyResponse;
import com.kk.ItJobs.Dto.company.CreateUpdateCompanyRequest;
import com.kk.ItJobs.model.AppUser;
import com.kk.ItJobs.model.Company;
import com.kk.ItJobs.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;

    @Override
    public BaseResponse<CompanyResponse> createCompany(CreateUpdateCompanyRequest createUpdateCompanyRequest, AppUser user) {
        if (!CreateUpdateCompanyRequest.isValid(createUpdateCompanyRequest)) {
            return BaseResponse.fail("invalid data of company");
        }

        if (companyRepository.existsCompanyByUser(user)) {
            return BaseResponse.fail("User have a company");
        }

        if (companyRepository.existsCompanyByName(createUpdateCompanyRequest.getName())) {
            return BaseResponse.fail("Company with this name exists");
        }

        log.info("create a company {}", createUpdateCompanyRequest.getName());
        var newCompany = new Company(
                null,
                createUpdateCompanyRequest.getName(),
                createUpdateCompanyRequest.getSize(),
                createUpdateCompanyRequest.getDescription(),
                createUpdateCompanyRequest.getMotto(),
                user,
                null
        );
        var company = companyRepository.save(newCompany);
        return BaseResponse.success(CompanyResponse.companyResponseFromCompany(company));
    }

    @Override
    public CompanyResponse getCompany(AppUser user) {
        var company = companyRepository.getCompanyByUser(user);
        if (company == null) {
            return null;
        }
        return CompanyResponse.companyResponseFromCompany(company);
    }

    @Override
    public BaseResponse<CompanyResponse> updateCompany(CreateUpdateCompanyRequest updateCompanyRequest, AppUser user) {
        var company = companyRepository.getCompanyByUser(user);

        if (!CreateUpdateCompanyRequest.isValid(updateCompanyRequest)) {
            return BaseResponse.fail("invalid request");
        }

        if (company == null) {
            return BaseResponse.fail("User doesn't have a company");
        }
        company.setDescription(updateCompanyRequest.getDescription());
        company.setSize(updateCompanyRequest.getSize());
        company.setName(updateCompanyRequest.getName());
        company.setMotto(updateCompanyRequest.getMotto());

        return BaseResponse.success(CompanyResponse.companyResponseFromCompany(company));
    }

}
