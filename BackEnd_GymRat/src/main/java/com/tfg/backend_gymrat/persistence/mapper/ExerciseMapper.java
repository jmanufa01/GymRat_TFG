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
                return Superset.builder()
                        .series(exercise.getSeries())
                        .exercises(toExercises(exercise.getExercises()))
                        .build();
            }

            return SimpleExercise.builder()
                    .name(exercise.getName())
                    .muscle(exercise.getMuscle())
                    .type(exercise.getType())
                    .difficulty(exercise.getDifficulty())
                    .series(exercise.getSeries())
                    .reps(exercise.getReps())
                    .weights(exercise.getWeights())
                    .build();
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
            exerciseDTO.setSeries(simpleExercise.getSeries());
            return exerciseDTO;
        }
        abstract List<ExerciseDTO> toExerciseDTOs(List<Exercise> exercises);
}
