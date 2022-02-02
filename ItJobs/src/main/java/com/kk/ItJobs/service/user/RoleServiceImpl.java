package com.kk.ItJobs.service.user;

import com.kk.ItJobs.model.Role;
import com.kk.ItJobs.repository.RoleRepository;
import com.kk.ItJobs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new role {} to database", role.getName());
        return roleRepository.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}", roleName, username);
        var user = userRepository.findByUsername(username);
        var role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
    }
}
