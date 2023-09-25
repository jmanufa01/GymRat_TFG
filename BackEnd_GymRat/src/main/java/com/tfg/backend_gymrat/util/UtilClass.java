package com.tfg.backend_gymrat.util;


import com.tfg.backend_gymrat.domain.dto.entity.ExerciseDTO;
import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;

public class UtilClass {

    public static boolean isEmailValid(String email){
        return email.endsWith(".com") && email.contains("@") && !email.split("@")[0].trim().equals("");
    }

    public static boolean isRoutineRequestValid(RoutineDTO routine){

        boolean validExercises = true;

        /*for(ExerciseDTO exerciseDTO: routine.exercises()){
            if (exerciseDTO.getReps().size() != exerciseDTO.series()
                    && exerciseDTO.weights().size() != exerciseDTO.series()) {
                validExercises = false;
                break;
            }
        }*/

        return //!routine.getId().equals("")
                 routine.getExercises().size() > 0
                && routine.getMuscularGroup().size() > 0
                && routine.getUsers().size() > 0;
                //&& validExercises;
    }

}
