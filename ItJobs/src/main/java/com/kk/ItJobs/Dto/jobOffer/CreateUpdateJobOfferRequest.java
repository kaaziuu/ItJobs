package com.kk.ItJobs.Dto.jobOffer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateUpdateJobOfferRequest {
    private Float minimumSalary;
    private Float maximumSalary;
    private String description;
    private String position;
}
