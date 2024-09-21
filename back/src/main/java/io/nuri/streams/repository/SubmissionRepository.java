package io.nuri.streams.repository;

import io.nuri.streams.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface SubmissionRepository extends JpaRepository<Submission, String> {

    @Query("SELECT EXISTS (SELECT 1 FROM Submission s WHERE s.problemId = :problemId AND s.userId = :userId)")
    boolean isProblemSolved(@Param("userId") String userId, @Param("problemId") String problemId);

    @Query("SELECT s.problemId FROM Submission s WHERE s.userId = :userId")
    Set<String> findAllProblemIdsByUserId(@Param("userId") String userId);
}
