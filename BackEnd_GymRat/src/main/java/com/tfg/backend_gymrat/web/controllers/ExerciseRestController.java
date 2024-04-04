package com.tfg.backend_gymrat.web.controllers;

import com.tfg.backend_gymrat.domain.dto.entity.ExerciseDTO;
import com.tfg.backend_gymrat.domain.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("exercises")
@RequiredArgsConstructor
public class ExerciseRestController {
    private final ExerciseService exerciseService;
    @GetMapping(params = "name")
    public ResponseEntity<List<ExerciseDTO>> obtainExercisesIncludedInRoutines(@RequestParam String name) throws Exception{
        final var exercises = exerciseService.findExercisesIncludedInRoutines(name);
        return ok(exercises);
    }

}
