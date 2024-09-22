package io.nuri.streams.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "problem_examples")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProblemExample {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String testInput;
    private String testOutput;
    private String explanation;

    @ManyToOne
    @JsonIgnore
    private Problem problem;

    @Override
    public String toString() {
        return "ProblemExample{" +
                "id='" + id + '\'' +
                ", testInput='" + testInput + '\'' +
                ", testOutput='" + testOutput + '\'' +
                ", explanation='" + explanation + '\'' +
                '}';
    }
}
