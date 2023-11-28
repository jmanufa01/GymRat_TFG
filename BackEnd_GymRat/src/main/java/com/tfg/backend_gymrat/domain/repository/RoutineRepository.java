package com.tfg.backend_gymrat.domain.repository;

import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;

import java.util.Date;
import java.util.List;

public interface RoutineRepository {
    List<RoutineDTO> findAllRoutinesByUsernameAndDateBetween(String username, Date start, Date finish);
    void insertRoutine(RoutineDTO routineDTO);
    void updateRoutine(RoutineDTO routineDTO);
    boolean existsRoutineById(String routineId);
}
