package io.nuri.streams.service;

import io.nuri.streams.dto.ProblemRequest;
import io.nuri.streams.dto.ProblemTitleDto;
import io.nuri.streams.entity.Problem;
import io.nuri.streams.exception.ProblemNotFoundException;
import io.nuri.streams.repository.ProblemExampleRepository;
import io.nuri.streams.repository.ProblemRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutorService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProblemServiceTest {

    @Mock
    ProblemRepository problemRepository;

    @Mock
    private ExecutorService executorService;

    @Mock
    private DynamicCompiler dynamicCompiler;

    @Mock
    private UserService userService;

    @Mock
    ProblemExampleRepository problemExampleRepository;

    @Mock
    private SubmissionService submissionService;

    @InjectMocks
    ProblemService problemService;

    @Test
    void getProblemById_ProblemExists_ReturnsProblem() {
        // given
        var problem = Problem.builder().id("problemId").build();
        when(problemRepository.findById(problem.getId())).thenReturn(Optional.of(problem));
        // when
        var result = problemService.getProblemById(problem.getId());

        // then
        assertEquals(problem, result);
        verify(problemRepository).findById(problem.getId());
    }

    @Test
    void getProblemById_ProblemDoesNotExists_ThrowsProblemNotFoundException() {
        // given
        String problemId = "nonExistentId";
        when(problemRepository.findById(problemId)).thenReturn(Optional.empty());

        // when
        var exception = assertThrows(ProblemNotFoundException.class, () -> problemService.getProblemById(problemId));
        // then
        assertEquals("error.problem.not_found", exception.getMessage() );
        verify(problemRepository).findById(anyString());
    }

    @Test
    void getProblemTitles_ReturnsPageOfProblemsTitleDto() {
        // given
        Pageable pageable = Pageable.ofSize(10);
        List<ProblemTitleDto> titles = List.of(
                new ProblemTitleDto("id1", "title1", "EASY", 100, 100),
                new ProblemTitleDto("id1", "title1", "EASY", 100, 100));
        Page<ProblemTitleDto> page = new PageImpl<>(titles, pageable, titles.size());
        when(problemRepository.findAllProblemTitles(pageable)).thenReturn(page);
        // when
        var result = problemService.getProblemTitles(pageable);

        // then
        assertEquals(page, result);
        verify(problemRepository).findAllProblemTitles(pageable);
    }

    @Test
    void getTemplateById_ReturnsString() {
        // given
        String problemId = "problemId";
        String expected = "class Solution {}";
        when(problemRepository.findTemplateById(problemId)).thenReturn(expected);

        // when
        var result = problemService.getTemplateById(problemId);

        // then
        assertEquals(expected, result);
        verify(problemRepository).findTemplateById(problemId);
    }

    @Test
    void createProblem_Success_ReturnsProblem() {
        // given
        Problem problem = Problem.builder().title("Problem Title").build();
        Problem expected = Problem.builder().id("problem_title").title("Problem Title").build();
        ProblemRequest problemRequest =  new ProblemRequest(problem, "class");
        doNothing().when(dynamicCompiler).createProblemFiles(problemRequest);
        when(problemRepository.save(problem)).thenReturn(expected);

        // when
        var result = problemService.createProblem(problemRequest);

        // then
        assertEquals(expected, result);
        verify(problemRepository).save(problem);
        verify(dynamicCompiler).createProblemFiles(problemRequest);
    }

//    @Test
//    void updateProblem_Success_ReturnsProblem() {
//        // given
//        Problem problem = Problem.builder()
//                .title("Problem Title")
//                .exampleList(List.of(new ProblemExample(), new ProblemExample()))
//                .build();
//        Problem problemFromDb = Problem.builder()
//                .id("problem_title")
//                .title("Problem title")
//                .exampleList(List.of(new ProblemExample(), new ProblemExample()))
//                .build();
//        ProblemRequest problemRequest =  new ProblemRequest(problem, "class");
//        when(problemRepository.findById(problem.getId())).thenReturn(Optional.of(problemFromDb));
//        doNothing().when(dynamicCompiler).createProblemFiles(problemRequest);
//        when(problemRepository.save(problem)).thenReturn(problemFromDb);
//        when(problemExampleRepository.saveAll(anyList())).thenReturn(anyList());
//
//        // when
//        problemService.updateProblem(problemRequest);
//
//        // then
//        verify(problemRepository).save(problem);
//        verify(dynamicCompiler).createProblemFiles(problemRequest);
//        verify(problemExampleRepository).save(any(ProblemExample.class));
//    }

}