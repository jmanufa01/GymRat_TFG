package com.tfg.backend_gymrat.domain.dto.entity;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.NonNull;

import java.util.Date;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.*;

@JsonInclude(Include.NON_NULL)
public record RoutineDTO(
        String id,
    @NonNull Date realizationDate,
    @NonNull List<String> muscularGroup,
    @NonNull List<String> users,
    @NonNull List<ExerciseDTO> exercises
) {}
