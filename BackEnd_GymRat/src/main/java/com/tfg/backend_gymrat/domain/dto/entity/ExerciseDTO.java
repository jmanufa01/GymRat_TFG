package com.tfg.backend_gymrat.domain.dto.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;

@JsonInclude(Include.NON_NULL)
public record ExerciseDTO (
        String name,
        String muscle,
        String type,
        String difficulty,
        Integer series,
        List<Integer> reps,
        List<Integer> weights,
        List<ExerciseDTO> exercises
) {}
