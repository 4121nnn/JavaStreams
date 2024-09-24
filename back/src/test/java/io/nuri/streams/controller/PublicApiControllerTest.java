package io.nuri.streams.controller;

import io.nuri.streams.config.ProblemTitleDtoAssembler;
import io.nuri.streams.dto.OneTimeToken;
import io.nuri.streams.dto.ProblemTitleDto;
import io.nuri.streams.dto.UserRequest;
import io.nuri.streams.service.ProblemService;
import io.nuri.streams.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PublicApiControllerTest {

    @Mock
    ProblemService problemService;
    @Mock
    UserService userService;
    @Mock
    private PagedResourcesAssembler<ProblemTitleDto> pagedResourcesAssembler;
    @Mock
    private ProblemTitleDtoAssembler problemTitleDtoAssembler;

    @InjectMocks
    PublicApiController publicApiController;

    @Test
    void signUp_Success() {
        // given
        UserRequest userRequest = new UserRequest("email@gmail.com", "password");
        doNothing().when(userService).createUser(userRequest);

        // when
        publicApiController.signUp(userRequest);

        // then
        verify(userService).createUser(userRequest);
    }

    @Test
    void login_Success() {
        // given
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.ErO0fS1yKjr73zJmeYqazVauy8z4Xwuhebs9fXVr3u4";
        UserRequest userRequest = new UserRequest("email@gmail.com", "password");
        when(userService.login(userRequest)).thenReturn(token);

        // when
        var result = publicApiController.login(userRequest);

        // then
        assertEquals(result, token);
        verify(userService, times(1)).login(userRequest);
    }

    @Test
    void getProblemTitles_ReturnsPageModel() {
        // given
        Pageable pageable = Pageable.unpaged();
        List<ProblemTitleDto> problemTitleDtoList = List.of(
                new ProblemTitleDto("id1", "Problem 1", "EASY", 50, 100),
                new ProblemTitleDto("id2", "Problem 2", "EASY", 50, 100)
        );

        Page<ProblemTitleDto> problemPage = new PageImpl<>(problemTitleDtoList);

        when(problemService.getProblemTitles(pageable)).thenReturn(problemPage);

        // Mock the PagedResourcesAssembler to return a PagedModel
        PagedModel<EntityModel<ProblemTitleDto>> pagedModel = PagedModel.of(
                problemTitleDtoList.stream()
                        .map(problemTitleDtoAssembler::toModel)
                        .toList(),
                new PagedModel.PageMetadata(
                        problemPage.getSize(),
                        problemPage.getNumber(),
                        problemPage.getTotalElements()
                )
        );

        when(pagedResourcesAssembler.toModel(problemPage, problemTitleDtoAssembler)).thenReturn(pagedModel);

        // When
        PagedModel<EntityModel<ProblemTitleDto>> result = publicApiController.getProblemTitles(pageable);

        // Then
        assertEquals(pagedModel, result);
        verify(problemService, times(1)).getProblemTitles(pageable);
        verify(pagedResourcesAssembler, times(1)).toModel(problemPage, problemTitleDtoAssembler);
    }

    @Test
    void exchangeOneTimeToken_ReturnsToken() {
        // given
        OneTimeToken oneTimeToken = new OneTimeToken("token");
        when(userService.exchangeOneTimeToken(oneTimeToken.token())).thenReturn(oneTimeToken.token());

        // when
        var result = publicApiController.exchangeOneTimeToken(oneTimeToken);

        // then
        assertEquals(result, oneTimeToken.token());
        verify(userService, times(1)).exchangeOneTimeToken(oneTimeToken.token());
    }
}