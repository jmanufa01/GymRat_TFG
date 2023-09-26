package com.tfg.backend_gymrat.domain.repository.impl;

import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.domain.repository.RoutineRepository;
import com.tfg.backend_gymrat.persistence.mapper.RoutineMapper;
import com.tfg.backend_gymrat.persistence.mongo.RoutineMongo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class RoutineRepositoryImpl implements RoutineRepository {

    @Autowired
    private RoutineMongo mongo;
    @Autowired
    private RoutineMapper mapper;

    @Override
    public void insertRoutine(RoutineDTO routineDTO) {
        mongo.insert(mapper.toRoutine(routineDTO));
    }

    @Override
    public Optional<List<RoutineDTO>> findAllRoutinesByUsernameAndDateBetween(String username, Date start, Date finish) {
        return mongo.findAllByUsersContainingAndRealizationDateBetween(username,start,finish)
                .map(routines -> mapper.toRoutineDTOs(routines));
    }
}
