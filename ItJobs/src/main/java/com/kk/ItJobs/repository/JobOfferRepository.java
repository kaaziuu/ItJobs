package com.kk.ItJobs.repository;

import com.kk.ItJobs.model.Company;
import com.kk.ItJobs.model.JobOffer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {
    JobOffer getByUuid(String uuid);
    List<JobOffer> getAllByCompany(Company company);
}
