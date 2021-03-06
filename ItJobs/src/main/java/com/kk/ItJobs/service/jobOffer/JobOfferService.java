package com.kk.ItJobs.service.jobOffer;

import com.kk.ItJobs.Dto.BaseResponse;
import com.kk.ItJobs.Dto.jobOffer.CreateUpdateJobOfferRequest;
import com.kk.ItJobs.Dto.jobOffer.JobOfferResponse;
import com.kk.ItJobs.Dto.jobOffer.ListJobOfferResponse;
import com.kk.ItJobs.model.AppUser;

import java.util.List;

public interface JobOfferService {
    BaseResponse<JobOfferResponse> getJobOfferByUuid(String uuid);

    BaseResponse<ListJobOfferResponse> getJobOffer(Integer page, Integer take, String search);

    BaseResponse<ListJobOfferResponse> getUserJobOffer(AppUser user, String search);

    BaseResponse<JobOfferResponse> createJobOffer(CreateUpdateJobOfferRequest createForm, AppUser user);

    BaseResponse<JobOfferResponse> updateJobOffer(CreateUpdateJobOfferRequest updateForm, String uuid, AppUser user);
}
