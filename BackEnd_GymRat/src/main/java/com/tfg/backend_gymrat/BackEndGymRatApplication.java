package com.tfg.backend_gymrat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(scanBasePackages = "com.tfg.backend_gymrat")
@EnableMongoRepositories
public class BackEndGymRatApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackEndGymRatApplication.class, args);
    }

}
