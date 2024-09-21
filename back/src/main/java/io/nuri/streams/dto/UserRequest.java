package io.nuri.streams.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequest(
        @NotBlank(message = "Email required")
        @Email(message = "Email not valid")
        String email,
        @NotBlank(message = "Password required")
        @Size(min = 6, message = "Length must be more than 6")
        String password) {
}
