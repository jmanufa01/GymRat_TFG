package com.tfg.backend_gymrat.domain.dto.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;


public record SupersetDTO(
        @NonNull Integer series,
        @NonNull List<ExerciseDTO> exercises){}
