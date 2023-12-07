package com.tfg.backend_gymrat.exceptions;

import com.tfg.backend_gymrat.constants.ErrorConstants;

public class AppExceptions {

    //General exceptions
    public static class MissingRequestDataException extends Exception {
        public MissingRequestDataException() {
            super(ErrorConstants.MISSING_DATA);
        }
    }


    public static class InvalidProvidedDateException extends Exception {
        public InvalidProvidedDateException() { super(ErrorConstants.INVALID_DATE); }
    }

    //Authentication exceptions
    public static class IncorrectRegistrationException extends Exception {
        public IncorrectRegistrationException(){ super(ErrorConstants.INCORRECT_EMAIL); }
    }

    public static class ExpiredTokenException extends Exception {
        public ExpiredTokenException() { super(ErrorConstants.EXPIRED_TOKEN); }
    }

    //User exceptions
    public static class UserNotFoundException extends Exception {
        public UserNotFoundException() { super(ErrorConstants.USER_NOT_FOUND); }
    }

    //Routine exceptions
    public static class RoutineNotFoundException extends Exception {
        public RoutineNotFoundException() { super(ErrorConstants.ROUTINE_NOT_FOUND); }
    }

    public static class UserNotInRoutineException extends Exception {
        public UserNotInRoutineException() { super(ErrorConstants.USER_NOT_IN_ROUTINE); }
    }

}
