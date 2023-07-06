package com.tfg.backend_gymrat.domain.repository.impl;

import com.tfg.backend_gymrat.domain.repository.UserRepository;
import com.tfg.backend_gymrat.persistence.entity.User;
import com.tfg.backend_gymrat.persistence.mongo.UserMongo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private UserMongo userMongo;

    //@Autowired
    //private MongoTemplate mongoTemplate;

    @Override
    public void createUser(User user) {
        //mongoTemplate.save(user);
        userMongo.insert(user);
    }
}
