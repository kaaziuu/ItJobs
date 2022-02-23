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

    public static boolean verify(CreateUpdateJobOfferRequest request) {
        var v1 = request.getDescription() != null
                && request.getMaximumSalary() != null
                && request.getMinimumSalary() != null
                && request.getPosition() != null;

        var v2 = request.getMaximumSalary() >= request.getMinimumSalary();

        return v1 && v2;
    }
}
