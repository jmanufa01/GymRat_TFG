package com.tfg.backend_gymrat.persistence.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@SuperBuilder
@NoArgsConstructor
@Document("exercise")
public class Exercise {
    private Integer series;
}
