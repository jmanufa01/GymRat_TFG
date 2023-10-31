package com.tfg.backend_gymrat.domain.dto.entity;


import lombok.NonNull;

import java.util.Date;
import java.util.List;

public record RoutineDTO(
    @NonNull Date realizationDate,
    @NonNull List<String> muscularGroup,
    @NonNull List<String> users,
    @NonNull List<ExerciseDTO> exercises
) {}
