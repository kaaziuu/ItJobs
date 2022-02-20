package com.kk.ItJobs.Dto.jobOffer;

import com.kk.ItJobs.Dto.company.CompanyResponse;
import com.kk.ItJobs.model.JobOffer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobOfferResponse {
    private String uuid;
    private Float minimumSalary;
    private Float maximumSalary;
    private String description;
    private String position;
    private CompanyResponse companyResponse;

    public static JobOfferResponse jobOfferResponseFromJobOffer(JobOffer jobOffer){
        return new JobOfferResponse(
            jobOffer.getUuid(),
            jobOffer.getMinimumSalary(),
            jobOffer.getMaximumSalary(),
            jobOffer.getDescription(),
            jobOffer.getPosition(),
            CompanyResponse.companyResponseFromCompany(jobOffer.getCompany())
        );
    }
}
