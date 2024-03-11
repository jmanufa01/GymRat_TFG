package com.tfg.backend_gymrat.persistence.repository;

import com.tfg.backend_gymrat.persistence.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends MongoRepository<User, String>{
    boolean existsUserByUsername(String userName);
    Optional<User> findUserByUsername(String userName);
    List<User> findAllByUsernameContaining(String username);
}
