package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.domain.repository.UserRepository;
import com.tfg.backend_gymrat.persistence.entity.User;
import com.tfg.backend_gymrat.persistence.mongo.UserMongo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public void createUser(User user){
        repository.createUser(user);
    }
}
