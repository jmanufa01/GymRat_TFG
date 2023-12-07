package com.tfg.backend_gymrat.constants;

public class ErrorConstants {

    //General errors
    public static final String BAD_CREDENTIALS = "Provided credentials are not valid";
    public static final String MISSING_DATA = "Missing data in request";
    public static final String INVALID_DATE = "Provided date is invalid";

    //Authentication errors
    public static final String INCORRECT_EMAIL = "Introduced email is incorrect";
    public static final String EXPIRED_TOKEN = "Jwt token has expired";

    //User errors
    public static final String USERNAME_NOT_FOUND = "Provided username was not found in database";

    public static final String USER_NOT_FOUND = "Provided username was not found in database";
    public static final String USER_ALREADY_EXISTS = "Provided username already exists in database";

    //Routine errors
    public static final String ROUTINE_NOT_FOUND = "Provided routine was not found in database";

    public static final String USER_NOT_IN_ROUTINE = "Provided user doesnt contain the routine";
}
