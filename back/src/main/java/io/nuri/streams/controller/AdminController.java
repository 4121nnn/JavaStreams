package io.nuri.streams.controller;

import io.nuri.streams.dto.ProblemRequest;
import io.nuri.streams.entity.Problem;
import io.nuri.streams.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProblemService problemService;

    @PostMapping("/problem")
    @ResponseStatus(HttpStatus.CREATED)
    public Problem createProblem(@RequestBody ProblemRequest problemRequest){
        return problemService.createProblem(problemRequest);
    }

    @PutMapping("/problem")
    @ResponseStatus(HttpStatus.OK)
    public void updateProblem(@RequestBody ProblemRequest problemRequest){
        problemService.updateProblem(problemRequest);
    }
}
