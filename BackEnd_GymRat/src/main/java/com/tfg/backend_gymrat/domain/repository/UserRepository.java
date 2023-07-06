package com.tfg.backend_gymrat.domain.repository;

import com.tfg.backend_gymrat.persistence.entity.User;

public interface UserRepository {
    void createUser(User user);
}
