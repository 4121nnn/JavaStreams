package io.nuri.streams.repository;

import io.nuri.streams.entity.ProblemExample;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemExampleRepository extends JpaRepository<ProblemExample, String> {
}
