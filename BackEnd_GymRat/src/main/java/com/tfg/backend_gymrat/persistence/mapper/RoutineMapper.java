package com.tfg.backend_gymrat.persistence.mapper;

import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.persistence.entity.Exercise;
import com.tfg.backend_gymrat.persistence.entity.Routine;
import com.tfg.backend_gymrat.persistence.entity.SimpleExercise;
import com.tfg.backend_gymrat.persistence.entity.Superset;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Mapper
public abstract class RoutineMapper {

    @Autowired
    private ExerciseMapper mapper;

    public RoutineDTO toRoutineDTO(Routine routine){
        return new RoutineDTO(
                routine.getRealization_date(),
                routine.getMuscular_group(),
                routine.getUsers(),
                mapper.toExerciseDTOs(routine.getExercises()));
    }
    public abstract List<RoutineDTO> toRoutineDTOs(List<Routine> routines);


    @InheritInverseConfiguration
    public Routine toRoutine(RoutineDTO routineDTO){
        return new Routine(
                routineDTO.getRealizationDate(),
                routineDTO.getMuscularGroup(),
                routineDTO.getUsers(),
                mapper.toExercises(routineDTO.getExercises()));
    }
    public abstract List<Routine> toRoutines(List<RoutineDTO> routineDTOs);
}
