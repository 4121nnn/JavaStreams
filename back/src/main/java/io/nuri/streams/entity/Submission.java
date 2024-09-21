package io.nuri.streams.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.*;


@Entity
@Table(name = "submissions")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Submission {

    @Id
    private String id;
    private String userId;
    private String problemId;
    private String solution;
}
