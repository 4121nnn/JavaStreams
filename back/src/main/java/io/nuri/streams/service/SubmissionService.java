package io.nuri.streams.service;

import io.nuri.streams.entity.Submission;
import io.nuri.streams.entity.UserEntity;
import io.nuri.streams.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final UserService userService;

    public boolean isProblemSolved(String userId, String problemId){
        return submissionRepository.isProblemSolved(userId, problemId);
    }

    public void saveSolvedProblem(String userId, String problemId, String solution){
        submissionRepository.save(Submission.builder()
                        .id(UUID.randomUUID().toString())
                        .userId(userId)
                        .problemId(problemId)
                        .solution(solution)
                        .build());
    }


    public Set<String> getProblemIdsSolvedByUserEmail(String email) {
        if(email != null){
            UserEntity user = userService.findByEmail(email);
            return submissionRepository.findAllProblemIdsByUserId(user.getId());
        }
        return Collections.emptySet();
    }
}
