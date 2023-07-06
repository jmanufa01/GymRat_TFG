package com.tfg.backend_gymrat.persistence.mongo;

import com.tfg.backend_gymrat.persistence.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserMongo extends MongoRepository<User, String>{

}
