package com.tfg.backend_gymrat.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Document("routine")
@AllArgsConstructor
public class Routine{
    private Date realizationDate;
    private List<String> muscularGroup;
    private List<String> users;
    private List<Exercise> exercises;
}
