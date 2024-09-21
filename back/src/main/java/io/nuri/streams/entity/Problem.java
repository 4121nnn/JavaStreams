package io.nuri.streams.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "problems")
@Setter
@Getter
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
