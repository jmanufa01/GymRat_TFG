package com.tfg.backend_gymrat.domain.dto.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class SupersetDTO extends ExerciseDTO{
    String id;
    List<ExerciseDTO> exercises;
}
