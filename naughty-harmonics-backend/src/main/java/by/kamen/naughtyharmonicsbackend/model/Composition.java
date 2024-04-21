package by.kamen.naughtyharmonicsbackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
    private int bpm;
    private String videoLink;

    @Column(name = "is_unique")
    private boolean unique;

    @OneToMany(mappedBy = "composition")
    private List<Sheet> sheets;
}
