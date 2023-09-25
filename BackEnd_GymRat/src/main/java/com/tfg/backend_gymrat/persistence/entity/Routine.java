package com.tfg.backend_gymrat.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Document("routine")
@AllArgsConstructor
public class Routine implements Serializable {
    private Date realization_date;
    private List<String> muscular_group;
    private List<String> users;
    private List<Exercise> exercises;
}
