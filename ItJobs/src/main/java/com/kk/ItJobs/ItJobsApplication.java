package com.kk.ItJobs;

import com.kk.ItJobs.model.AppUser;
import com.kk.ItJobs.model.Role;
import com.kk.ItJobs.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;

@SpringBootApplication
public class ItJobsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ItJobsApplication.class, args);
    }

    @Bean
    CommandLineRunner run(UserService userService) {
        return args -> {
            userService.saveRole(new Role(null, "ROLE_USER"));
            userService.saveRole(new Role(null, "ROLE_ADMIN"));
            userService.saveRole(new Role(null, "ROLE_SUPER_ADMIN"));

            userService.saveUser(new AppUser(null, "Jhon Tr", "jhon", "1234", new ArrayList<>()));
            userService.saveUser(new AppUser(null, "Will Smith", "will", "1234", new ArrayList<>()));
            userService.saveUser(new AppUser(null, "Jim Carry", "jim", "1234", new ArrayList<>()));
            userService.saveUser(new AppUser(null, "Tomasz Karolak", "szczerba", "1234", new ArrayList<>()));

            userService.addRoleToUser("jhon", "ROLE_USER");
            userService.addRoleToUser("will", "ROLE_ADMIN");
            userService.addRoleToUser("jim", "ROLE_ADMIN");
            userService.addRoleToUser("jim", "ROLE_USER");
            userService.addRoleToUser("szczerba", "ROLE_SUPER_ADMIN");
            userService.addRoleToUser("szczerba", "ROLE_USER");
            userService.addRoleToUser("szczerba", "ROLE_ADMIN");
        };
    }
}
