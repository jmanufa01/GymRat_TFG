package com.tfg.backend_gymrat.persistence.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("exercise")
public class Exercise {
    private Integer series;
}
