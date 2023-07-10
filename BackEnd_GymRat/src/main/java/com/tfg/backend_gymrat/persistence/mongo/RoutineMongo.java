package com.tfg.backend_gymrat.persistence.mongo;

import com.tfg.backend_gymrat.persistence.entity.Routine;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoutineMongo extends MongoRepository<Routine,String> {

}
