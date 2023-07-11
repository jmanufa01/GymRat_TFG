package com.tfg.backend_gymrat.persistence.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@Document("superset")
public class Superset extends Exercise{
    private String id;
    private List<Exercise> exercises;
}
