package com.kk.ItJobs.service.jobOffer;

import com.kk.ItJobs.Dto.BaseResponse;
import com.kk.ItJobs.Dto.jobOffer.CreateUpdateJobOfferRequest;
import com.kk.ItJobs.Dto.jobOffer.JobOfferResponse;
import com.kk.ItJobs.model.AppUser;

import java.util.List;

public interface JobOfferService {
    BaseResponse<JobOfferResponse> getJobOfferByUuid(String uuid);

    BaseResponse<List<JobOfferResponse>> getJobOffer(Integer page, Integer take);

    BaseResponse<JobOfferResponse> createJobOffer(CreateUpdateJobOfferRequest createForm, AppUser user);

    BaseResponse<JobOfferResponse> updateJobOffer(CreateUpdateJobOfferRequest updateForm, String uuid, AppUser user);
}
