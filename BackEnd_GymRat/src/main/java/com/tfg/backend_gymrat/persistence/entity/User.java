package com.tfg.backend_gymrat.persistence.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@EqualsAndHashCode
@Document("user")
public class User {
    @Id
    private String username;
    @Indexed(unique = true)
    private String email;
    private String password;
    private String gym_experience;
    private Date birth_date;
    private Double height;
    private Double weight;
    private String role;
}
