package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.constants.AppConstants;
import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.persistence.entity.SimpleExercise;
import com.tfg.backend_gymrat.persistence.entity.Superset;
import com.tfg.backend_gymrat.persistence.mapper.ExerciseMapper;
import com.tfg.backend_gymrat.persistence.mapper.RoutineMapper;
import com.tfg.backend_gymrat.persistence.repository.RoutineRepository;
import com.tfg.backend_gymrat.persistence.repository.UserRepository;
import com.tfg.backend_gymrat.util.Log;
import com.tfg.backend_gymrat.util.UtilClass;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.tfg.backend_gymrat.exceptions.AppExceptions.*;

@Service
@RequiredArgsConstructor
public class RoutineService {

    private final RoutineRepository routineRepository;
    private final UserRepository userRepository;
    private final RoutineMapper mapper;
    private final ExerciseMapper exerciseMapper;
    private final Log log = new Log();

    public List<RoutineDTO> findRoutinesByUserAndMuscle(String username, String muscle) throws Exception {
        try {
            log.log(AppConstants.OBTAINING_ROUTINES);
            final var routines = routineRepository.findAllByUsersContainingAndMuscularGroupContaining(username, muscle);
            log.log(AppConstants.ROUTINE_OBTAINMENT_SUCCESS);
            return mapper.toRoutineDTOs(routines);
        }catch (Exception e) {
            log.log("Error: " + e.getMessage());
            log.log(AppConstants.ROUTINE_OBTAINMENT_FAILURE);
            throw e;
        }
    }

    public List<RoutineDTO> findRoutinesByUsernameAndExerciseName(String username, String exerciseName) throws Exception {
        try {
            log.log(AppConstants.OBTAINING_ROUTINES);
            final var routines = routineRepository.findAllByUsersContaining(username);

            routines.removeIf(
                    routine -> routine.getExercises().stream().noneMatch(
                            exercise -> {
                                if(exercise instanceof SimpleExercise) {
                                    return ((SimpleExercise) exercise).getName().toLowerCase().contains(exerciseName.toLowerCase());
                                }
                                else {
                                    return ((Superset) exercise).getExercises().stream().anyMatch(
                                            simpleExercise -> ((SimpleExercise) simpleExercise).getName().toLowerCase().contains(exerciseName.toLowerCase())
                                    );
                                }
                            }
                    )
            );

            log.log(AppConstants.ROUTINE_OBTAINMENT_SUCCESS);
            return mapper.toRoutineDTOs(routines);
        }catch (Exception e) {
            log.log("Error: " + e.getMessage());
            log.log(AppConstants.ROUTINE_OBTAINMENT_FAILURE);
            throw e;
        }
    }

    public List<RoutineDTO> findRoutinesByUserAndMonth(String username, String date) throws Exception {
        try {
            log.log(AppConstants.OBTAINING_ROUTINES);
            Date firstDayOfMonth = new SimpleDateFormat("yyyy-MM-dd").parse(date.substring(0,8) + "01");
            Date lastDayOfMonth = new SimpleDateFormat("yyyy-MM-dd").parse(date.substring(0,8) + "31");
            final var routines = routineRepository.findAllByUsersContainingAndRealizationDateBetween(username,firstDayOfMonth, lastDayOfMonth);
            log.log(AppConstants.ROUTINE_OBTAINMENT_SUCCESS);
            return mapper.toRoutineDTOs(routines);
        }catch (Exception e) {
            log.log("Error: " + e.getMessage());
            log.log(AppConstants.ROUTINE_OBTAINMENT_FAILURE);
            throw e;
        }
    }

    public List<RoutineDTO> findAllRoutinesByMonth(String date) throws Exception {
        try {
            log.log(AppConstants.OBTAINING_ROUTINES);
            Date firstDayOfMonth = new SimpleDateFormat("yyyy-MM-dd").parse(date.substring(0,8) + "01");
            Date lastDayOfMonth = new SimpleDateFormat("yyyy-MM-dd").parse(date.substring(0,8) + "31");
            final var routines = routineRepository.findAllByRealizationDateBetween(firstDayOfMonth, lastDayOfMonth);
            log.log(AppConstants.ROUTINE_OBTAINMENT_SUCCESS);
            return mapper.toRoutineDTOs(routines);
        }catch (Exception e) {
            log.log("Error: " + e.getMessage());
            log.log(AppConstants.ROUTINE_OBTAINMENT_FAILURE);
            throw e;
        }
    }

    public RoutineDTO insertRoutine(RoutineDTO routineDTO) throws Exception {
        try {
            log.log(AppConstants.INSERTING_ROUTINE);

            if (!UtilClass.isRoutineRequestValid(routineDTO)) {
                throw new MissingRequestDataException();
            }

            final var routine = mapper.toRoutine(routineDTO);

            log.log(AppConstants.ROUTINE_INSERTION_SUCCESS);
            return mapper.toRoutineDTO(routineRepository.insert(routine));
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

            final var routine = routineRepository.findById(routineDTO.id()).orElseThrow(RoutineNotFoundException::new);
            routine.setRealizationDate(routineDTO.realizationDate());
            routine.setUsers(routineDTO.users());
            routine.setExercises(exerciseMapper.toExercises(routineDTO.exercises()));
            routine.setMuscularGroup(routineDTO.muscularGroup());
            routineRepository.save(routine);
            log.log(AppConstants.ROUTINE_UPDATE_SUCCESS);
        } catch (Exception e) {
            log.log("Error: " + e.getMessage());
            log.log(AppConstants.ROUTINE_UPDATE_FAILURE);
            throw e;
        }
    }

    public void deleteRoutineByUserName(String routineId, String username) throws Exception {
        try {
            log.log(AppConstants.DELETING_ROUTINE);
            final var routine = routineRepository.findById(routineId).orElseThrow(RoutineNotFoundException::new);


            if(!userRepository.existsUserByUsername(username)) {
                throw new UserNotFoundException();
            }

            if(!routine.getUsers().contains(username)) {
                throw new UserNotInRoutineException();
            }

            if(routine.getUsers().size() > 1) {
                routine.getUsers().remove(username);
                routineRepository.save(routine);
            }else{
                routineRepository.deleteById(routineId);
            }
            log.log(AppConstants.ROUTINE_DELETION_SUCCESS);
        } catch (Exception e) {
            log.log("Error: " + e.getMessage());
            log.log(AppConstants.ROUTINE_DELETION_FAILURE);
            throw e;
        }
    }

    public void deleteRoutine(String routineId) throws Exception {
        try {
            log.log(AppConstants.DELETING_ROUTINE);
            final var routine = routineRepository.findById(routineId).orElseThrow(RoutineNotFoundException::new);
            routineRepository.delete(routine);
            log.log(AppConstants.ROUTINE_DELETION_SUCCESS);
        } catch (Exception e) {
            log.log("Error: " + e.getMessage());
            log.log(AppConstants.ROUTINE_DELETION_FAILURE);
            throw e;
        }
    }

}
