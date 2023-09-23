package com.tfg.backend_gymrat.domain.dto.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;

public record ExerciseDTO(
        @NonNull String name,
        @NonNull String muscle,
        @NonNull String type,
        @NonNull String difficulty,
        @NonNull Integer series,
        @NonNull List<Integer> reps,
        @NonNull List<Integer> weights) {}
