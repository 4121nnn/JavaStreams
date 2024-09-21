package io.nuri.streams.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PasswordDto(
        String email,
        @NotBlank(message = "Type the current password")
        String curPassword,
        @Size(min = 6, message = "Password must be at least 6 characters long")
        String newPassword,

        @Size(min = 6, message = "Password must be at least 6 characters long")
        String newPasswordRetype
) { }