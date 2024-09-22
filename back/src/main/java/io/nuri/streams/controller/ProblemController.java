package io.nuri.streams.controller;

import io.nuri.streams.dto.Response;
import io.nuri.streams.entity.Problem;
import io.nuri.streams.entity.Submission;
import io.nuri.streams.service.ProblemService;
import io.nuri.streams.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/problem")
@RequiredArgsConstructor
public class ProblemController {

    private final ProblemService problemService;
    private final SubmissionService submissionService;

    @GetMapping("/{problemId}")
    @ResponseStatus(HttpStatus.OK)
    public Problem getProblemById(@PathVariable String problemId){
        return problemService.getProblemById(problemId);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Problem> getAllProblems(@RequestParam("page") int page, @RequestParam("size") int size) {
        return problemService.getAllProblems(page, size);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Response submitSolution(@RequestBody Submission submission, Principal principal) {
        return problemService.submitSolution(submission, principal.getName());
    }

    @GetMapping("/template/{problemId}")
    @ResponseStatus(HttpStatus.OK)
    public String getProblemTemplateById(@PathVariable String problemId){
        return problemService.getTemplateById(problemId);
    }

    @GetMapping("/solved")
    @ResponseStatus(HttpStatus.OK)
    public Set<String> getSolvedProblemsIdByUserId(Principal principal){
        return submissionService.getProblemIdsSolvedByUserEmail(principal.getName());
    }
}
