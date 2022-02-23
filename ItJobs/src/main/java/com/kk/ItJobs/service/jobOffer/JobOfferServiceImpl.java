package com.kk.ItJobs.service.jobOffer;

import com.kk.ItJobs.Dto.BaseResponse;
import com.kk.ItJobs.Dto.jobOffer.CreateUpdateJobOfferRequest;
import com.kk.ItJobs.Dto.jobOffer.JobOfferResponse;
import com.kk.ItJobs.Dto.jobOffer.ListJobOfferResponse;
import com.kk.ItJobs.model.AppUser;
import com.kk.ItJobs.model.JobOffer;
import com.kk.ItJobs.repository.CompanyRepository;
import com.kk.ItJobs.repository.JobOfferRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class JobOfferServiceImpl implements JobOfferService {
    private final JobOfferRepository jobOfferRepository;
    private final CompanyRepository companyRepository;

    @Override
    public BaseResponse<JobOfferResponse> getJobOfferByUuid(String uuid) {
        var jobOffer = jobOfferRepository.getByUuid(uuid);
        if (jobOffer == null) {
            return BaseResponse.fail("Offer doesn't exists");
        }

        return BaseResponse.success(JobOfferResponse.jobOfferResponseFromJobOffer(jobOffer));
    }

    @Override
    public BaseResponse<ListJobOfferResponse> getJobOffer(Integer page, Integer size) {
        var jobOffers = jobOfferRepository
                .findAll()
                .stream()
                .skip((long) (page - 1) * size)
                .limit(size)
                .collect(Collectors.toList());

        return BaseResponse.success(ListJobOfferResponse.listJobOfferResponseFromListJobOffer(jobOffers, jobOfferRepository.count()));
    }

    @Override
    public BaseResponse<ListJobOfferResponse> getUserJobOffer(AppUser user) {
        var userCompany = companyRepository.getCompanyByUser(user);
        if (userCompany == null) {
            return BaseResponse.fail("user don't have a company");
        }
        var jobOffers = new ArrayList<>(jobOfferRepository.getAllByCompany(userCompany));

        return BaseResponse.success(ListJobOfferResponse.listJobOfferResponseFromListJobOffer(jobOffers, jobOfferRepository.count()));
    }

    @Override
    public BaseResponse<JobOfferResponse> createJobOffer(CreateUpdateJobOfferRequest createForm, AppUser user) {
        var company = companyRepository.getCompanyByUser(user);
        if (company == null) {
            return BaseResponse.fail("User doesn't have a company");
        }
        if (!CreateUpdateJobOfferRequest.verify(createForm)) {
            return BaseResponse.fail("Invalid data");
        }

        var jobOffer = new JobOffer(
                null,
                UUID.randomUUID().toString(),
                createForm.getMinimumSalary(),
                createForm.getMaximumSalary(),
                createForm.getDescription(),
                createForm.getPosition(),
                company
        );

        var createJobOffer = jobOfferRepository.save(jobOffer);
        return BaseResponse.success(JobOfferResponse.jobOfferResponseFromJobOffer(createJobOffer));
    }

    @Override
    public BaseResponse<JobOfferResponse> updateJobOffer(CreateUpdateJobOfferRequest updateForm, String uuid, AppUser user) {
        var company = companyRepository.getCompanyByUser(user);
        var jobOffer = company.getJobOffers().stream().filter(x -> x.getUuid().equals(uuid)).findFirst();
        if (jobOffer.isEmpty()) {
            return BaseResponse.fail("job offer not found");
        }
        var entityOffer = jobOffer.get();
        entityOffer.setDescription(updateForm.getDescription());
        entityOffer.setMaximumSalary(updateForm.getMaximumSalary());
        entityOffer.setMinimumSalary(updateForm.getMinimumSalary());
        entityOffer.setPosition(updateForm.getPosition());

        return BaseResponse.success(JobOfferResponse.jobOfferResponseFromJobOffer(entityOffer));
    }
}
