package com.tfg.backend_gymrat.domain.dto.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseDTO {
    private String name;
    private String muscle;
    private String type;
    private String difficulty;
    private Integer series;
    private List<Integer> reps;
    private List<Integer> weights;
}
