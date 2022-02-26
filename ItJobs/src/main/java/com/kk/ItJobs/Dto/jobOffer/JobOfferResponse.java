package com.kk.ItJobs.Dto.jobOffer;

import com.kk.ItJobs.Dto.company.CompanyResponse;
import com.kk.ItJobs.model.JobOffer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

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
    private String email;
    private Date createAt;
    private CompanyResponse companyResponse;

    public static JobOfferResponse jobOfferResponseFromJobOffer(JobOffer jobOffer){
        return new JobOfferResponse(
            jobOffer.getUuid(),
            jobOffer.getMinimumSalary(),
            jobOffer.getMaximumSalary(),
            jobOffer.getDescription(),
            jobOffer.getPosition(),
            jobOffer.getEmail(),
            jobOffer.getCreateAt(),
            CompanyResponse.companyResponseFromCompany(jobOffer.getCompany())
        );
    }
}
