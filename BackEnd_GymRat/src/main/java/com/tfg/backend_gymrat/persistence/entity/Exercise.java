package com.tfg.backend_gymrat.persistence.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("exercise")
public class Exercise {
    private String name;
    private String muscle;
    private String type;
    private String difficulty;
    private Integer reps;
    private Integer series;
    private Integer weight;
}