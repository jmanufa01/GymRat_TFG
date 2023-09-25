package com.tfg.backend_gymrat.domain.dto.entity;

import com.tfg.backend_gymrat.persistence.entity.Exercise;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


@Data
@AllArgsConstructor
public class RoutineDTO{
    private Date realizationDate;
    private List<String> muscularGroup;
    private List<String> users;
    private List<ExerciseDTO> exercises;
}
