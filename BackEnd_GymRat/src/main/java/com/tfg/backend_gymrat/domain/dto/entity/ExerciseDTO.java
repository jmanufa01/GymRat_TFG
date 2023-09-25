package com.tfg.backend_gymrat.domain.dto.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;

@Data
@JsonInclude(Include.NON_NULL)
public class ExerciseDTO {
    private String name;
    private String muscle;
    private String type;
    private String difficulty;
    private Integer series;
    private List<Integer> reps;
    private List<Integer> weights;
    private List<ExerciseDTO> exercises;
}
