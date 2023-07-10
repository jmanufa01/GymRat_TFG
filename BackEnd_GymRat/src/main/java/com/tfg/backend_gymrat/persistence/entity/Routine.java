package com.tfg.backend_gymrat.persistence.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document("routine")
public class Routine {
    @Id
    private String code;
    private Date realization_date;
    private List<String> muscular_group;
    private List<String> users;
    private List<Exercise> exercises;
}
