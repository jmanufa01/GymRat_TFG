package com.tfg.backend_gymrat;

import com.tfg.backend_gymrat.persistence.mongo.UserMongo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackageClasses = {
        UserMongo.class
})
public class BackEndGymRatApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackEndGymRatApplication.class, args);
    }

}
