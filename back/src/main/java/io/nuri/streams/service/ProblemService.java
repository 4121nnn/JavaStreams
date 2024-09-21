package io.nuri.streams.service;

import io.nuri.streams.dto.ProblemRequest;
import io.nuri.streams.dto.ProblemTitleDto;
import io.nuri.streams.dto.Response;
import io.nuri.streams.exception.ProblemNotFoundException;
import io.nuri.streams.entity.Problem;
import io.nuri.streams.entity.ProblemExample;
import io.nuri.streams.entity.Submission;
import io.nuri.streams.entity.UserEntity;
import io.nuri.streams.repository.ProblemExampleRepository;
import io.nuri.streams.repository.ProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProblemService {

    private  final ProblemExampleRepository problemExampleRepository;
    private final ProblemRepository problemRepository;
    private final SubmissionService submissionService;
    private final DynamicCompiler dynamicCompiler;
    //private final ExecutorService executorService = Executors.newVirtualThreadPerTaskExecutor();
    private final ExecutorService executorService = Executors.newSingleThreadExecutor();
    private final UserService userService;


    public Problem getProblemById(String problemId) {
//        boolean isProblemSolved = false;
//        executorService.submit(() -> {
//            isProblemSolved = submissionService.isProblemSolved(userId, problemId);
//        });
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new ProblemNotFoundException("Problem not exists by id " + problemId));

        return problem;
    }

    public Page<ProblemTitleDto> getProblemTitles(Pageable page) {
        return problemRepository.findAllProblemTitles(page);
    }

    public String getTemplateById(String problemId) {
        return problemRepository.findTemplateById(problemId);
    }

    public Response submitSolution(Submission submission, String userEmail) {
        executorService.submit(() -> {
            problemRepository.increaseProblemSubmissionCount(submission.getProblemId());
        });

        dynamicCompiler.submit(submission);

        int detectedLoopAtLine = containsLoop(submission.getSolution());
        if(detectedLoopAtLine > 0){
            return new Response(Map.of("WARN","Contains a 'for' or 'while' loop at line " + detectedLoopAtLine + ".\n Please solve it with Java Stream API."));
        }

        executorService.submit(() -> {
            UserEntity user = userService.findByEmail(userEmail);
            problemRepository.increaseProblemAcceptanceCount(submission.getProblemId());
            submissionService.saveSolvedProblem(user.getId(), submission.getProblemId(), submission.getSolution());
        });

        return new Response(Map.of("SUCCESS", "ACCEPTED"));
    }

    public Problem createProblem(ProblemRequest problemRequest) {

        dynamicCompiler.createProblemFiles(problemRequest);

        Problem newProblem = problemRequest.problem();
        String problemId = newProblem.getTitle().toLowerCase().replace(' ', '_');
        newProblem.setSubmitted(0);
        newProblem.setAccepted(0);
        newProblem.setId(problemId);
        return problemRepository.save(newProblem);
    }

    public void updateProblem(ProblemRequest problemRequest) {
        dynamicCompiler.createProblemFiles(problemRequest);

        Problem problem = problemRequest.problem();
        Problem problemFromDatabase = problemRepository.findById(problem.getId())
                .orElseThrow(() -> new ProblemNotFoundException("Problem not found by id " + problem.getId()));
        problemFromDatabase.setTitle(problem.getTitle());
        problemFromDatabase.setDescription(problem.getDescription());
        problemFromDatabase.setTemplate(problem.getTemplate());
        problemFromDatabase.setDifficulty(problem.getDifficulty());

        ProblemExample example1 = problem.getExampleList().get(0);
        ProblemExample example2 = problem.getExampleList().get(1);
        example1.setProblem(problem);
        example2.setProblem(problem);

        List<ProblemExample> exampleList = List.of(example1, example2);

        problemFromDatabase.setHint(problem.getHint());

        problemRepository.save(problemFromDatabase);

        problemExampleRepository.saveAll(exampleList);

    }

    public List<Problem> getAllProblems(int page, int size) {
        Pageable pageable = PageRequest.of(page-1, size);
        Page<Problem> problemPage = problemRepository.findAll(pageable);
        return problemPage.stream()
                .collect(Collectors.toList());
    }

    private int containsLoop(String code) {
        String[] lines = code.split("\n");

        for (int i = 0; i < lines.length; i++) {
            String line = lines[i];

            // Skip empty lines or lines with only comments
            if (line.isEmpty() || isComment(line)) {
                continue;
            }
            // Check for loops
            if (line.contains(" for ") || line.contains("for(") || line.contains(" while ") || line.contains("while(")) {
                return i + 1;
            }
        }
        return -1;
    }

    private static boolean isComment(String line) {
        return line.matches("^\\s*(//|/\\*|\\*|\\*/).*");
    }

}
