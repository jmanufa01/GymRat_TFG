package com.tfg.backend_gymrat.domain.dto.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExerciseDTO {
    private String name;
    private String muscle;
    private String type;
    private String difficulty;
    private Integer reps;
    private Integer series;
    private Integer weight;
}
