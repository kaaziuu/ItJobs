package com.kk.ItJobs.controllers;

import com.kk.ItJobs.Dto.BaseResponse;
import com.kk.ItJobs.Dto.company.CompanyResponse;
import com.kk.ItJobs.Dto.company.CreateCompanyRequest;
import com.kk.ItJobs.service.company.CompanyService;
import com.kk.ItJobs.service.user.UserService;
import com.kk.ItJobs.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CompanyController {
    private final CompanyService companyService;
    private final JwtUtils jwtUtils;
    private final UserService userService;

    @PostMapping("/company")
    public BaseResponse<CompanyResponse> create(
            @RequestBody CreateCompanyRequest createRequest,
            HttpServletRequest request
            ) {
        var user = userService.getUser(jwtUtils.getUsernameFromRequest(request));
        return companyService.createCompany(createRequest, user);
    }


    @GetMapping("/company")
    public BaseResponse<CompanyResponse> getCompany(
            HttpServletRequest request
    ) {
        var user = userService.getUser(jwtUtils.getUsernameFromRequest(request));
        var company = companyService.getCompany(user);
        if (company == null) {
            return new BaseResponse<>(
                    false,
                    "user don't have a company",
                    "",
                    null
            );
        }
        return new BaseResponse<>(
                true,
                "",
                "",
                company
        );
    }


}
