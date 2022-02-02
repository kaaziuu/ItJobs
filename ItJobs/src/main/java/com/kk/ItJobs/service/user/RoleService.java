package com.kk.ItJobs.service.user;

import com.kk.ItJobs.model.Role;

public interface RoleService {
    Role saveRole(Role role);

    void addRoleToUser(String username, String roleName);
}
