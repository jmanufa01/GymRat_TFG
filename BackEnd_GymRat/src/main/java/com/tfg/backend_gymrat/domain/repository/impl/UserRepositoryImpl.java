package com.tfg.backend_gymrat.domain.repository.impl;

import com.tfg.backend_gymrat.domain.repository.UserRepository;
import com.tfg.backend_gymrat.persistence.entity.User;
import com.tfg.backend_gymrat.persistence.mongo.UserMongo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private UserMongo userMongo;


    @Override
    public void createUser(User user) {
        userMongo.insert(user);
    }

    @Override
    public Optional<User> findByUserName(String userName) {
        return userMongo.findUserByUsername(userName);
    }

    @Override
    public boolean existsUser(String userName) {
        return userMongo.existsUserByUserName(userName);
    }
}
