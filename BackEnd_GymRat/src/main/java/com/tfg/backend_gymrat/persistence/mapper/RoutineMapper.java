package com.tfg.backend_gymrat.persistence.mapper;

import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.persistence.entity.Routine;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper
public interface RoutineMapper {

    @Mappings({
            @Mapping(source = "realization_date", target = "realizationDate"),
            @Mapping(source = "muscular_group", target = "muscularGroup")
    })
    RoutineDTO toRoutineDTO(Routine routine);


    @InheritInverseConfiguration
    Routine toRoutine(RoutineDTO routineDTO);
}
