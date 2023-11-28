package com.tfg.backend_gymrat.domain.repository.impl;

import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.domain.repository.RoutineRepository;
import com.tfg.backend_gymrat.persistence.mapper.RoutineMapper;
import com.tfg.backend_gymrat.persistence.mongo.RoutineMongo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class RoutineRepositoryImpl implements RoutineRepository {

    @Autowired
    private RoutineMongo mongo;
    @Autowired
    private RoutineMapper mapper;

    @Override
    public List<RoutineDTO> findAllRoutinesByUsernameAndDateBetween(String username, Date start, Date finish) {
        return mongo.findAllByUsersContainingAndRealizationDateBetween(username,start,finish).stream()
                .map(routines -> mapper.toRoutineDTO(routines)).toList();
    }

    @Override
    public void insertRoutine(RoutineDTO routineDTO) {
        mongo.insert(mapper.toRoutine(routineDTO));
    }

    @Override
    public void updateRoutine(RoutineDTO routineDTO) {
        mongo.save(mapper.toRoutine(routineDTO));
    }

    @Override
    public boolean existsRoutineById(String routineId) {
        return mongo.existsById(routineId);
    }
}
