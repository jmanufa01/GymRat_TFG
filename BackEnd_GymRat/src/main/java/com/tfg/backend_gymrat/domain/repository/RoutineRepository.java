package com.tfg.backend_gymrat.domain.repository;

import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;

public interface RoutineRepository {
    void insertRoutine(RoutineDTO routineDTO);
}
