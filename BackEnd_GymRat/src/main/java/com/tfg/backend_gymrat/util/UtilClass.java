package com.tfg.backend_gymrat.util;


import com.tfg.backend_gymrat.domain.dto.entity.ExerciseDTO;
import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;

public class UtilClass {

    public static boolean isEmailValid(String email){
        System.out.println(email.split("@")[0]);
        return email.endsWith(".com") && email.contains("@") && !email.split("@")[0].trim().equals("");
    }

    public static boolean isRoutineRequestValid(RoutineDTO routine){

        boolean validExercises = true;

        for(ExerciseDTO exerciseDTO: routine.getExercises()){
            if (exerciseDTO.getReps().size() != exerciseDTO.getSeries()
                    && exerciseDTO.getWeights().size() != exerciseDTO.getSeries()) {
                validExercises = false;
                break;
            }
        }

        return !routine.getCode().equals("")
                && routine.getExercises().size() > 0
                && routine.getMuscularGroup().size() > 0
                && routine.getUsers().size() > 0
                && validExercises;
    }

}
