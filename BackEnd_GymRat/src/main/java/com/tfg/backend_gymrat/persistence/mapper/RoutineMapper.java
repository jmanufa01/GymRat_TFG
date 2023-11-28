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
public class RoutineMapper {

    @Autowired
    private ExerciseMapper mapper;

    public RoutineDTO toRoutineDTO(Routine routine){
        return new RoutineDTO(
                routine.getId(),
                routine.getRealizationDate(),
                routine.getMuscularGroup(),
                routine.getUsers(),
                mapper.toExerciseDTOs(routine.getExercises()));
    }

    public Routine toRoutine(RoutineDTO routineDTO){
        return Routine.builder()
                .realizationDate(routineDTO.realizationDate())
                .muscularGroup(routineDTO.muscularGroup())
                .users(routineDTO.users())
                .exercises(mapper.toExercises(routineDTO.exercises()))
                .build();
    }

    public List<Routine> toRoutines(List<RoutineDTO> routineDTOs){
        return routineDTOs.stream().map(this::toRoutine).collect(Collectors.toList());
    }

    public List<RoutineDTO> toRoutineDTOs(List<Routine> routines){
        return routines.stream().map(this::toRoutineDTO).collect(Collectors.toList());
    }
}
