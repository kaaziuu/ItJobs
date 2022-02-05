package com.kk.ItJobs;

import com.kk.ItJobs.model.AppUser;
import com.kk.ItJobs.model.Role;
import com.kk.ItJobs.service.user.RoleService;
import com.kk.ItJobs.service.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;

@SpringBootApplication
public class ItJobsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ItJobsApplication.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner run(UserService userService, RoleService roleService) {
        return args -> {
            roleService.saveRole(new Role(null, "ROLE_USER"));
            roleService.saveRole(new Role(null, "ROLE_ADMIN"));
            roleService.saveRole(new Role(null, "ROLE_SUPER_ADMIN"));

            userService.saveUser(new AppUser(null, "Jhon", "Tr", "jhon", "1234", new ArrayList<>()));
            userService.saveUser(new AppUser(null, "Will", "Smith", "will", "1234", new ArrayList<>()));
            userService.saveUser(new AppUser(null, "Jim", "Carry", "jim", "1234", new ArrayList<>()));
            userService.saveUser(new AppUser(null, "Tomasz", "Karolak", "szczerba", "1234", new ArrayList<>()));

            roleService.addRoleToUser("jhon", "ROLE_USER");
            roleService.addRoleToUser("will", "ROLE_ADMIN");
            roleService.addRoleToUser("jim", "ROLE_ADMIN");
            roleService.addRoleToUser("jim", "ROLE_USER");
            roleService.addRoleToUser("szczerba", "ROLE_SUPER_ADMIN");
            roleService.addRoleToUser("szczerba", "ROLE_USER");
            roleService.addRoleToUser("szczerba", "ROLE_ADMIN");
        };

    }
}
