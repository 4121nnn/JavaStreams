package io.nuri.streams.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "submissions")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String userId;
    private String problemId;
    private String solution;
}
