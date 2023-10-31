package com.tfg.backend_gymrat.exceptions;

import com.tfg.backend_gymrat.constants.ErrorConstants;

public class AppExceptions {

    public static class IncorrectRegistrationException extends Exception {
        public IncorrectRegistrationException(){ super(ErrorConstants.INCORRECT_EMAIL); }
    }

    public static class MissingRequestDataException extends Exception {
        public MissingRequestDataException() {
            super(ErrorConstants.MISSING_DATA);
        }
    }

    public static class UserNotFoundException extends Exception {
        public UserNotFoundException() { super(ErrorConstants.USER_NOT_FOUND); }
    }

    public static class ExpiredTokenException extends Exception {
        public ExpiredTokenException() { super(ErrorConstants.EXPIRED_TOKEN); }
    }

    public static class InvalidProvidedDateException extends Exception {
        public InvalidProvidedDateException() { super(ErrorConstants.INVALID_DATE); }
    }

}
