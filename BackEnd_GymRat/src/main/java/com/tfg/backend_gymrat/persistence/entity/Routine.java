package com.tfg.backend_gymrat.persistence.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Data
@Builder
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Document("routine")
public class Routine{
    @Id
    private String id;
    private Date realizationDate;
    private List<String> muscularGroup;
    private List<String> users;
    private List<Exercise> exercises;
}
