package com.tfg.backend_gymrat.persistence.mongo;

import com.tfg.backend_gymrat.persistence.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface UserMongo extends MongoRepository<User, String>{
    boolean existsUserByUserName(String userName);
    Optional<User> findUserByUsername(String userName);
}
