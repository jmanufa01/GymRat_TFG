package com.tfg.backend_gymrat.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@EqualsAndHashCode
@AllArgsConstructor
@Document("user")
public class User {
    @Id
    private String email;
    private String password;
    private String gym_experiece;
    private Integer age;
    private Double height;
    private Double weight;
}
