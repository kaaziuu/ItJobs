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
    private String email;

    public static boolean verify(CreateUpdateJobOfferRequest request) {
        var v1 = request.getDescription() != null
                && request.getMaximumSalary() != null
                && request.getMinimumSalary() != null
                && request.getPosition() != null
                && request.getEmail() != null;

        var v2 = request.getMaximumSalary() >= request.getMinimumSalary() && request.getMinimumSalary() > 0;

        var v3 = request.getDescription().length() > 0 && request.getPosition().length() > 0 && request.getEmail().length() > 0;

        return v1 && v2 && v3;
    }
}
