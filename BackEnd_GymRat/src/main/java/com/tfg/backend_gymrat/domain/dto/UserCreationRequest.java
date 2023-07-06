package com.tfg.backend_gymrat.domain.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
public class UserCreationRequest {
    private String email;
    private String password;
    private String gym_experiece;
    private Integer age;
    private Double height;
    private Double weight;
}
