package com.tfg.backend_gymrat.persistence.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Document("exercise")
public class SimpleExercise extends Superset {
    private String name;
    private String muscle;
    private String type;
    private String difficulty;
    private List<Integer> reps;
    private List<Integer> weights;
}