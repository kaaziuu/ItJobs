package com.kk.ItJobs.service.jobOffer;

import com.kk.ItJobs.Dto.BaseResponse;
import com.kk.ItJobs.Dto.jobOffer.CreateUpdateJobOfferRequest;
import com.kk.ItJobs.Dto.jobOffer.JobOfferResponse;
import com.kk.ItJobs.model.AppUser;
import com.kk.ItJobs.model.JobOffer;
import com.kk.ItJobs.repository.CompanyRepository;
import com.kk.ItJobs.repository.JobOfferRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class JobOfferServiceImpl implements JobOfferService {
    private JobOfferRepository jobOfferRepository;
    private CompanyRepository companyRepository;

    @Override
    public BaseResponse<JobOfferResponse> getJobOfferByUuid(String uuid) {
        var jobOffer = jobOfferRepository.getByUuid(uuid);
        if (jobOffer == null) {
            return BaseResponse.fail("Offer doesn't exists");
        }

        return BaseResponse.success(JobOfferResponse.jobOfferResponseFromJobOffer(jobOffer));
    }

    @Override
    public BaseResponse<List<JobOfferResponse>> getJobOffer(Integer page, Integer size) {
        var jobOffers = jobOfferRepository
                .findAll(PageRequest.of(page, size))
                .stream()
                .map(JobOfferResponse::jobOfferResponseFromJobOffer)
                .collect(Collectors.toList());

        return BaseResponse.success(jobOffers);
    }

    @Override
    public BaseResponse<JobOfferResponse> createJobOffer(CreateUpdateJobOfferRequest createForm, AppUser user) {
        var company = companyRepository.getCompanyByUser(user);
        if (company == null) {
            return BaseResponse.fail("User doesn't have a company");
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
