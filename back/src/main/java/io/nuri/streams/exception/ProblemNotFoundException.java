package io.nuri.streams.exception;

public class ProblemNotFoundException extends RuntimeException{
    public ProblemNotFoundException(String message){
        super(message);
    }
}
