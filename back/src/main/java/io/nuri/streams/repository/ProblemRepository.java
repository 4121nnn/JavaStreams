package io.nuri.streams.repository;

import io.nuri.streams.dto.ProblemTitleDto;
import io.nuri.streams.entity.Problem;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProblemRepository extends JpaRepository<Problem, String> {

    @Query("SELECT p.template AS template FROM Problem p WHERE p.id = :id")
    String findTemplateById(@Param("id") String id);

    @Query("SELECT new io.nuri.streams.dto.ProblemTitleDto(p.id, p.title, p.difficulty, p.accepted, p.submitted) FROM Problem p")
    Page<ProblemTitleDto> findAllProblemTitles(Pageable pageable);

    @Modifying
    @Transactional
    @Query("Update Problem p SET p.submitted = p.submitted + 1 WHERE p.id = :id")
    void increaseProblemSubmissionCount(@Param("id") String id);

    @Modifying
    @Transactional
    @Query("Update Problem p SET p.accepted = p.accepted + 1 WHERE p.id = :id")
    void increaseProblemAcceptanceCount(@Param("id") String id);


}
