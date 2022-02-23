package com.kk.ItJobs.Dto.jobOffer;

import com.kk.ItJobs.model.JobOffer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ListJobOfferResponse {
    List<JobOfferResponse> jobOffers;
    Long maxCount;
    Long currentCount;

    public static ListJobOfferResponse listJobOfferResponseFromListJobOffer(List<JobOffer> jobOfferList, Long maxCount) {
        return new ListJobOfferResponse(
                jobOfferList.stream().map(JobOfferResponse::jobOfferResponseFromJobOffer).collect(Collectors.toList()),
                maxCount,
                (long) jobOfferList.size()
        );
    }
}
