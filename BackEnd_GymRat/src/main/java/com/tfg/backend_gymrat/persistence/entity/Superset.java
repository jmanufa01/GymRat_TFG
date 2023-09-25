package com.tfg.backend_gymrat.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@Document("superset")
public class Superset extends Exercise {
    private List<Exercise> exercises;
}
