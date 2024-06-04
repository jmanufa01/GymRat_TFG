package com.tfg.backend_gymrat.util;


import com.tfg.backend_gymrat.domain.dto.entity.ExerciseDTO;
import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.persistence.entity.SimpleExercise;

public class UtilClass {

    public static boolean isEmailValid(String email){
        return email.endsWith(".com") && email.contains("@") && !email.split("@")[0].trim().equals("");
    }

    public static boolean isRoutineRequestValid(RoutineDTO routine){

        boolean validExercises = true;

        for(ExerciseDTO exerciseDTO: routine.exercises()){
            if (exerciseDTO.exercises() != null) { //Superset
                for (ExerciseDTO simpleExercise : exerciseDTO.exercises()) {
                    if(!isSimpleExerciseValid(simpleExercise)){
                        validExercises = false;
                        break;
                    }
                }
            } else { //SimpleExercise
                if(!isSimpleExerciseValid(exerciseDTO)){
                    validExercises = false;
                    break;
                }
            }
        }

        return !routine.exercises().isEmpty()
                && !routine.muscularGroup().isEmpty()
                && !routine.users().isEmpty()
                && validExercises;
    }

    private static boolean isSimpleExerciseValid(ExerciseDTO simpleExercise){
        return simpleExercise.reps() != null
                && simpleExercise.weights() != null
                && simpleExercise.reps().size() == simpleExercise.series()
                && simpleExercise.weights().size() == simpleExercise.series();
    }

}
