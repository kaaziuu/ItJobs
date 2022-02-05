package com.kk.ItJobs.service.user;

import com.kk.ItJobs.Dto.user.auth.LoginRequest;
import com.kk.ItJobs.Dto.user.auth.RegisterRequest;
import com.kk.ItJobs.model.AppUser;
import com.kk.ItJobs.model.Role;
import com.kk.ItJobs.repository.RoleRepository;
import com.kk.ItJobs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByUsername(username);
        if (user == null) {
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User found in the database: {}", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public AppUser saveUser(AppUser user) {
        log.info("Saving new user {} to database", user.getName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public AppUser register(RegisterRequest request) {
        if(userRepository.findByUsername(request.getUsername()) != null){
            return null;
        }
        log.info("Register a new user {}", request.getName());
        var roles = new ArrayList<Role>();
        roles.add(roleRepository.findByName("ROLE_USER"));
        var user = new AppUser(
                null,
                request.getName(),
                request.getSurname(),
                request.getUsername(),
                passwordEncoder.encode(request.getPassword()),
                roles
        );
        return userRepository.save(user);
    }

    @Override
    public AppUser login(LoginRequest request) {
        var user = userRepository.findByUsername(request.getUsername());
        if(user == null){
            return  null;
        }
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            return null;
        }
        return user;
    }


    @Override
    public AppUser getUser(String username) {
        log.info("Fetching user {}", username);
        return userRepository.findByUsername(username);
    }

    @Override
    public List<AppUser> getUsers() {
        log.info("Fetching all users");
        return userRepository.findAll();
    }
}
