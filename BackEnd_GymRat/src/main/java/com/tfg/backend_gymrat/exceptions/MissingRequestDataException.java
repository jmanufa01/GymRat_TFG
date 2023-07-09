package com.tfg.backend_gymrat.exceptions;

public class MissingRequestDataException extends Exception{
    public MissingRequestDataException() {
        super("Missing data in request");
    }
}
