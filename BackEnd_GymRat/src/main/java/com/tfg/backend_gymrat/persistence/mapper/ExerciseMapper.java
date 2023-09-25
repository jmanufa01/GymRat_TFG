package com.tfg.backend_gymrat.persistence.mapper;

import com.tfg.backend_gymrat.domain.dto.entity.ExerciseDTO;
import com.tfg.backend_gymrat.persistence.entity.Exercise;
import com.tfg.backend_gymrat.persistence.entity.SimpleExercise;
import com.tfg.backend_gymrat.persistence.entity.Superset;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public abstract class ExerciseMapper {

        public Exercise toExercise(ExerciseDTO exercise){
            if(exercise.getExercises() != null){ //Superset
                return new Superset(exercise.getExercises().stream().map(this::toExercise).toList());
            }

            return new SimpleExercise(exercise.getName(),
                    exercise.getMuscle(),
                    exercise.getType(),
                    exercise.getDifficulty(),
                    exercise.getReps(),
                    exercise.getWeights());
        }
        public abstract List<Exercise> toExercises(List<ExerciseDTO> exerciseDTOS);

        @InheritInverseConfiguration
        public ExerciseDTO toExerciseDTO(Exercise exercise){
            ExerciseDTO exerciseDTO = new ExerciseDTO();
            if(exercise.getClass().getName().equals(Superset.class.getName())){
                Superset superset = (Superset) exercise;
                exerciseDTO.setSeries(superset.getSeries());
                exerciseDTO.setExercises(superset.getExercises().stream().map(this::toExerciseDTO).toList());
                return exerciseDTO;
            }

            SimpleExercise simpleExercise = (SimpleExercise) exercise;
            exerciseDTO.setName(simpleExercise.getName());
            exerciseDTO.setType(simpleExercise.getType());
            exerciseDTO.setDifficulty(simpleExercise.getDifficulty());
            exerciseDTO.setMuscle(simpleExercise.getMuscle());
            exerciseDTO.setReps(simpleExercise.getReps());
            exerciseDTO.setWeights(simpleExercise.getWeights());
            return exerciseDTO;
        }
        abstract List<ExerciseDTO> toExerciseDTOs(List<Exercise> exercises);
}
