package com.tfg.backend_gymrat.domain.repository;

import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;

import java.util.List;
import java.util.Optional;

public interface RoutineRepository {
    void insertRoutine(RoutineDTO routineDTO);
    Optional<List<RoutineDTO>> findAllRoutinesByUsername(String username);
}
