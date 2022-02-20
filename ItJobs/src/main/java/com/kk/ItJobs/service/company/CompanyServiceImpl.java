package com.kk.ItJobs.service.company;

import com.kk.ItJobs.Dto.BaseResponse;
import com.kk.ItJobs.Dto.company.CompanyResponse;
import com.kk.ItJobs.Dto.company.CreateCompanyRequest;
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
    public BaseResponse<CompanyResponse> createCompany(CreateCompanyRequest createCompanyRequest, AppUser user) {
        if (!CreateCompanyRequest.isValid(createCompanyRequest)) {
            return new BaseResponse<>(
                    false,
                    "invalid data of company",
                    null,
                    null
            );
        }

        if (companyRepository.existsCompanyByUser(user)) {
            return new BaseResponse<>(
                    false,
                    "User have a company",
                    null,
                    null
            );
        }

        if (companyRepository.existsCompanyByName(createCompanyRequest.getName())) {
            return new BaseResponse<>(
                    false,
                    "Company with this name exists",
                    null,
                    null
            );
        }

        log.info("create a company {}", createCompanyRequest.getName());
        var newCompany = new Company(
                null,
                createCompanyRequest.getName(),
                createCompanyRequest.getSize(),
                createCompanyRequest.getDescription(),
                createCompanyRequest.getMotto(),
                user
        );
        var company = companyRepository.save(newCompany);
        return new BaseResponse<>(
                true,
                null,
                null,
                CompanyResponse.CompanyResponseFromCompany(company)
        );
    }

    @Override
    public CompanyResponse getCompany(AppUser user) {
        var company = companyRepository.getCompanyByUser(user);
        if (company == null) {
            return null;
        }
        return CompanyResponse.CompanyResponseFromCompany(company);
    }

}
