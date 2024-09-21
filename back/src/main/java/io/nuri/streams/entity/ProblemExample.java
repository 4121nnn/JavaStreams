package io.nuri.streams.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
