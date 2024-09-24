package io.nuri.streams.service;

import io.nuri.streams.entity.Submission;
import io.nuri.streams.entity.UserEntity;
import io.nuri.streams.repository.SubmissionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anySet;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SubmissionServiceTest {

    @Mock
    SubmissionRepository submissionRepository;
    @Mock
    UserService userService;

    @InjectMocks
    SubmissionService submissionService;

    @Test
    void saveSolvedProblem_Success() {
        // given
        when(submissionRepository.save(any(Submission.class))).thenReturn(any(Submission.class));

        // when
        submissionService.saveSolvedProblem("userId", "problemId", "solution");

        // then
        verify(submissionRepository).save(any(Submission.class));
    }

    @Test
    void getProblemIdsSolvedByUserEmail_Success_ReturnsSetOfStrings() {
        // given
        UserEntity user = UserEntity.builder().id("id").email("email").build();
        when(userService.findByEmail(user.getEmail())).thenReturn(user);
        when(submissionRepository.findAllProblemIdsByUserId(user.getId())).thenReturn(anySet());

            // when
        var result = submissionService.getProblemIdsSolvedByUserEmail(user.getEmail());

        // then
        assertNotNull(result);
        verify(userService).findByEmail(user.getEmail());
        verify(submissionRepository).findAllProblemIdsByUserId(user.getId());
    }

    @Test
    void getProblemIdsSolvedByUserEmail_EmailIsNull_ReturnsEmptySet() {
        // given

        // when
        var result = submissionService.getProblemIdsSolvedByUserEmail(null);

        // then
        assertNotNull(result);
        verify(userService, times(0)).findByEmail(anyString());
        verify(submissionRepository, times(0)).findAllProblemIdsByUserId(anyString());
    }
}