package com.tfg.backend_gymrat.domain.repository;

import com.tfg.backend_gymrat.persistence.entity.User;

import java.util.Optional;

public interface UserRepository {
    void createUser(User user);
    Optional<User> findByUserName(String userName);
    boolean existsUser(String userName);
}
