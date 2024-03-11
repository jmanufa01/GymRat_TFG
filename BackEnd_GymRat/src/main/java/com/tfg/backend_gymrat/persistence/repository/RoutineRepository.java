package com.tfg.backend_gymrat.persistence.repository;

import com.tfg.backend_gymrat.persistence.entity.Routine;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface RoutineRepository extends MongoRepository<Routine,String> {
    Optional<Routine> findById(String id);
    List<Routine> findAllByUsersContaining(String username);
    List<Routine> findAllByUsersContainingAndRealizationDateBetween(String username, Date start, Date finish);
    List<Routine> findAllByUsersContainingAndMuscularGroupContaining(String username, String muscle);
}
