package com.tfg.backend_gymrat.domain.dto.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class RoutineDTO {
    private String code;
    private Date realizationDate;
    private List<String> muscularGroup;
    private List<String> users;
    private List<ExerciseDTO> exercises;
}
