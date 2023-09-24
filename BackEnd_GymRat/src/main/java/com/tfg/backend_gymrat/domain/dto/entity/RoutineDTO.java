package com.tfg.backend_gymrat.domain.dto.entity;

import com.tfg.backend_gymrat.persistence.entity.Exercise;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

import java.util.Date;
import java.util.List;


public record RoutineDTO(
        @NonNull Date realizationDate,
        @NonNull List<String> muscularGroup,
        @NonNull List<String> users,
        List<ExerciseDTO> exercises) {} //Change
