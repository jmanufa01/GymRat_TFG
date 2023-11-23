package com.tfg.backend_gymrat.persistence.mapper;

import com.tfg.backend_gymrat.domain.dto.entity.ExerciseDTO;
import com.tfg.backend_gymrat.persistence.entity.Exercise;
import com.tfg.backend_gymrat.persistence.entity.SimpleExercise;
import com.tfg.backend_gymrat.persistence.entity.Superset;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public class ExerciseMapper {

        public Exercise toExercise(ExerciseDTO exercise){
            if(exercise.exercises() != null){ //Superset
                return Superset.builder()
                        .series(exercise.series())
                        .exercises(toExercises(exercise.exercises()))
                        .build();
            }

            return SimpleExercise.builder()
                    .name(exercise.name())
                    .muscle(exercise.muscle())
                    .type(exercise.type())
                    .difficulty(exercise.difficulty())
                    .series(exercise.series())
                    .reps(exercise.reps())
                    .weights(exercise.weights())
                    .build();
        }

        public ExerciseDTO toExerciseDTO(Exercise exercise){
            if(exercise.getClass().getName().equals(Superset.class.getName())){
                Superset superset = (Superset) exercise;
                return new ExerciseDTO(
                        null,
                        null,
                        null,
                        null,
                        superset.getSeries(),
                        null,
                        null,
                        superset.getExercises().stream().map(this::toExerciseDTO).toList()
                );
            }

            SimpleExercise simpleExercise = (SimpleExercise) exercise;
            return new ExerciseDTO(
                    simpleExercise.getName(),
                    simpleExercise.getMuscle(),
                    simpleExercise.getType(),
                    simpleExercise.getDifficulty(),
                    simpleExercise.getSeries(),
                    simpleExercise.getReps(),
                    simpleExercise.getWeights(),
                    null
            );
        }

        public List<Exercise> toExercises(List<ExerciseDTO> exerciseDTOS){
            return exerciseDTOS.stream().map(this::toExercise).toList();
        }

        public List<ExerciseDTO> toExerciseDTOs(List<Exercise> exercises){
            return exercises.stream().map(this::toExerciseDTO).toList();
        }
}
