package io.nuri.streams.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "problems")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Problem {

    @Id
    private String id;
    private String title;
    private String description;
    private String difficulty;
    private String template;
    private Integer accepted;
    private Integer submitted;
    private String hint;


    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProblemExample> exampleList;

}
