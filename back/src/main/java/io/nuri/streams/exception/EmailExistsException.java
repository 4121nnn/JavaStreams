package io.nuri.streams.exception;

public class EmailExistsException extends RuntimeException {
    public EmailExistsException(String emailAlreadyExists) {
        super(emailAlreadyExists);
    }
}
