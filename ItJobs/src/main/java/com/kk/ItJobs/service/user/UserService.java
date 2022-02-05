package com.kk.ItJobs.service.user;

import com.kk.ItJobs.Dto.user.auth.LoginRequest;
import com.kk.ItJobs.Dto.user.auth.RegisterRequest;
import com.kk.ItJobs.model.AppUser;
import com.kk.ItJobs.model.Role;

import java.util.List;

public interface UserService {
    AppUser saveUser(AppUser user);

    AppUser register(RegisterRequest request);

    AppUser login(LoginRequest request);

    AppUser getUser(String username);

    List<AppUser> getUsers();
}
