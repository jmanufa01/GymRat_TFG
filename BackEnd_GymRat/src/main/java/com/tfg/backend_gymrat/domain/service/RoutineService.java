package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.constants.AppConstants;
import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.domain.repository.RoutineRepository;
import com.tfg.backend_gymrat.persistence.mapper.ExerciseMapper;
import com.tfg.backend_gymrat.persistence.mapper.RoutineMapper;
import com.tfg.backend_gymrat.persistence.mongo.RoutineMongo;
import com.tfg.backend_gymrat.util.Log;
import com.tfg.backend_gymrat.util.UtilClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.tfg.backend_gymrat.exceptions.AppExceptions.*;

@Service
public class RoutineService {

    @Autowired
    private RoutineRepository repository;
    @Autowired
    private RoutineMongo routineMongo;
    @Autowired
    private ExerciseMapper exerciseMapper;
    private final Log log = new Log();

    public List<RoutineDTO> findRoutineByUserAndMonth(String username, String date) throws Exception {
        try {
            log.log(AppConstants.OBTAINING_ROUTINES);
            Date firstDayOfMonth = new SimpleDateFormat("yyyy-MM-dd").parse(date.substring(0,8) + "01");
            Date lastDayOfMonth = new SimpleDateFormat("yyyy-MM-dd").parse(date.substring(0,8) + "31");
            final var routines = repository.findAllRoutinesByUsernameAndDateBetween(username,firstDayOfMonth, lastDayOfMonth);
            log.log(AppConstants.ROUTINE_OBTAINMENT_SUCCESS);
            return routines;
        }catch (Exception e) {
            log.log("Error: " + e.getMessage());
            log.log(AppConstants.ROUTINE_OBTAINMENT_FAILURE);
            throw e;
        }
    }

    public void insertRoutine(RoutineDTO routine) throws Exception {
        try {
            log.log(AppConstants.INSERTING_ROUTINE);

            if (!UtilClass.isRoutineRequestValid(routine)) {
                throw new MissingRequestDataException();
            }

            repository.insertRoutine(routine);
            log.log(AppConstants.ROUTINE_INSERTION_SUCCESS);
        } catch (Exception e) {
            log.log("Error: " + e.getMessage());
            log.log(AppConstants.ROUTINE_INSERTION_FAILURE);
            throw e;
        }
    }

    public void updateRoutine(RoutineDTO routineDTO) throws Exception {
        try {
            log.log(AppConstants.UPDATING_ROUTINE);
            if (!UtilClass.isRoutineRequestValid(routineDTO)) {
                throw new MissingRequestDataException();
            }

            final var routine = routineMongo.findById(routineDTO.id()).orElseThrow(RoutineNotFoundException::new);
            routine.setRealizationDate(routineDTO.realizationDate());
            routine.setUsers(routineDTO.users());
            routine.setExercises(exerciseMapper.toExercises(routineDTO.exercises()));
            routine.setMuscularGroup(routineDTO.muscularGroup());
            routineMongo.save(routine);
            log.log(AppConstants.ROUTINE_UPDATE_SUCCESS);
        } catch (Exception e) {
            log.log("Error: " + e.getMessage());
            log.log(AppConstants.ROUTINE_UPDATE_FAILURE);
            throw e;
        }
    }

}
