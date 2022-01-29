package com.kk.ItJobs.service;

import com.kk.ItJobs.model.Role;
import com.kk.ItJobs.model.AppUser;

import java.util.List;

public interface UserService {
    AppUser saveUser(AppUser user);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    AppUser getUser(String username);
    List<AppUser> getUsers();
}
