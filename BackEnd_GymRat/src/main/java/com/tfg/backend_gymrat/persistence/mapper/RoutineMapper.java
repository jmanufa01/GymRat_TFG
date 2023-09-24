package com.tfg.backend_gymrat.persistence.mapper;

import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.persistence.entity.Routine;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper
public interface RoutineMapper {

    @Mappings({
            @Mapping(source = "realization_date", target = "realizationDate"),
            @Mapping(source = "muscular_group", target = "muscularGroup")
    })
    RoutineDTO toRoutineDTO(Routine routine);
    List<RoutineDTO> toRoutineDTOs(List<Routine> routines);


    @InheritInverseConfiguration
    Routine toRoutine(RoutineDTO routineDTO);
    List<Routine> toRoutines(List<RoutineDTO> routineDTOs);
}
