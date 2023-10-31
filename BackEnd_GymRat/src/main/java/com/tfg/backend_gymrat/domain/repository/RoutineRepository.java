package com.tfg.backend_gymrat.domain.repository;

import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;

import java.util.Date;
import java.util.List;

public interface RoutineRepository {
    void insertRoutine(RoutineDTO routineDTO);
    List<RoutineDTO> findAllRoutinesByUsernameAndDateBetween(String username, Date start, Date finish);
}
