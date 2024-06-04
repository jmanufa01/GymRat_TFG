package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.domain.dto.entity.ExerciseDTO;
import com.tfg.backend_gymrat.persistence.entity.*;
import com.tfg.backend_gymrat.persistence.mapper.ExerciseMapper;
import com.tfg.backend_gymrat.persistence.repository.RoutineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExerciseService {
    private final RoutineRepository routineRepository;
    private final ExerciseMapper exerciseMapper;

    public List<ExerciseDTO> findExercisesIncludedInRoutines(String name) {
        final var loggedUser = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        final var userRoutines = routineRepository.findAllByUsersContaining(loggedUser);
        final var filteredExercises = new ArrayList<ExerciseDTO>();

        for (Routine routine : userRoutines) {
            for (Exercise exercise: routine.getExercises()) {
                if (exercise.getClass().equals(Superset.class)) {
                    final var superset = (Superset) exercise;
                    for (Exercise simpleExercise: superset.getExercises()) {
                        checkSimpleExerciseName((SimpleExercise) simpleExercise, name, filteredExercises);
                    }
                } else {
                    final var simpleExercise = (SimpleExercise) exercise;
                    checkSimpleExerciseName(simpleExercise, name, filteredExercises);
                }

            }
        }
        return filteredExercises;
    }

    private void checkSimpleExerciseName(SimpleExercise simpleExercise, String name, List<ExerciseDTO> filteredExercises) {
        if (simpleExercise.getName().toLowerCase().contains(name.toLowerCase()) && !exerciseContainedInList(simpleExercise, filteredExercises)) {
            filteredExercises.add(exerciseMapper.toExerciseDTO(simpleExercise));
        }
    }

    private boolean exerciseContainedInList(SimpleExercise exercise, List<ExerciseDTO> filteredExercises) {
        for (ExerciseDTO exerciseDTO: filteredExercises) {
            if (exerciseDTO.name().equals(exercise.getName())) {
                return true;
            }
        }
        return false;
    }
}
