package io.nuri.streams.contoroller;

import io.nuri.streams.dto.ProblemRequest;
import io.nuri.streams.entity.Problem;
import io.nuri.streams.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
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
