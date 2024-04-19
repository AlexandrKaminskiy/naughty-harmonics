package by.kamen.naughtyharmonicsbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Composition extends PrimaryEntity {

    @ManyToOne
    private Client client;

    private String name;
    private Integer complexity;
    private String description;
    private Integer bpm;
    private String videoLink;
}
