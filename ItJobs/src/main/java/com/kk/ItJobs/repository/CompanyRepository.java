package com.kk.ItJobs.repository;

import com.kk.ItJobs.model.AppUser;
import com.kk.ItJobs.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company getCompanyByUser(AppUser user);
    Company getCompanyByName(String name);
    boolean existsCompanyByName(String name);
    boolean existsCompanyByUser(AppUser user);
}
