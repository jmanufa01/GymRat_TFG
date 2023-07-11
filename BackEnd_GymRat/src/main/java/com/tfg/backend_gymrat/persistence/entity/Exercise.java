package com.tfg.backend_gymrat.persistence.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document("exercise")
public class Exercise {
    private String name;
    private String muscle;
    private String type;
    private String difficulty;
    private Integer series;
    private List<Integer> reps;
    private List<Integer> weights;
}