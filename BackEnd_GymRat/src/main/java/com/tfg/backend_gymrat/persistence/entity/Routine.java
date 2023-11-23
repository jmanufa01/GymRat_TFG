package com.tfg.backend_gymrat.persistence.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@SuperBuilder
@EqualsAndHashCode
@NoArgsConstructor
@Document("routine")
public class Routine{
    private Date realizationDate;
    private List<String> muscularGroup;
    private List<String> users;
    private List<Exercise> exercises;
}
