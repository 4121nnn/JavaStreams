package io.nuri.streams.dto;

import jakarta.validation.constraints.NotBlank;

public record UserDto(
          @NotBlank(message = "User ID can not be blank")
          String id,
          @NotBlank(message = "Username can not be blank")
          String username,
          @NotBlank(message = "User email can not be blank")
          String email) {
}
