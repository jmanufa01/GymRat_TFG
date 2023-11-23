package com.tfg.backend_gymrat.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Document("simpleExercise")
public class SimpleExercise extends Exercise{
    private String name;
    private String muscle;
    private String type;
    private String difficulty;
    private List<Integer> reps;
    private List<Integer> weights;
}