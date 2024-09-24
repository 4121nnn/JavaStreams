package io.nuri.streams.controller;

import io.nuri.streams.dto.UserDto;
import io.nuri.streams.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    UserService userService;

    @InjectMocks
    UserController userController;

    @Test
    void getUserById_ReturnsUserDto() {
        // given
        UserDto userDto = new UserDto("userId", "username", "email");
        when(userService.getUserById(userDto.id())).thenReturn(userDto);

        // when
        var result = userController.getUserById(userDto.id());

        // then
        assertEquals(userDto, result);
        verify(userService).getUserById(userDto.id());
    }

    @Test
    void deleteUserById_Success() {
        // given
        doNothing().when(userService).deleteUserById(anyString());

        // when
        userController.deleteUserById(anyString());

        // then
        verify(userService).deleteUserById(anyString());

    }
}