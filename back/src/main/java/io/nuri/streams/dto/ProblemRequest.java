package io.nuri.streams.dto;

import io.nuri.streams.entity.Problem;

public record ProblemRequest(Problem problem, String testClass){
}
