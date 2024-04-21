package by.kamen.naughtyharmonicsbackend.model;

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
public class Sheet extends PrimaryEntity {

    private String number;

    @ManyToOne
    private Composition composition;

    @OneToMany(mappedBy = "sheet")
    private List<Tact> tacts;
}
