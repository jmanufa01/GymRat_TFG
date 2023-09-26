package com.tfg.backend_gymrat.persistence.mongo;

import com.tfg.backend_gymrat.persistence.entity.Routine;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface RoutineMongo extends MongoRepository<Routine,String> {
    //Optional<List<Routine>> findAllByUsersContaining(String username);

    Optional<List<Routine>> findAllByUsersContainingAndRealizationDateBetween(String username, Date start, Date finish);
}
