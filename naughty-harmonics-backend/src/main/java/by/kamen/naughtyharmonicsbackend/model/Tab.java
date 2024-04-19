package by.kamen.naughtyharmonicsbackend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
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
public class Tab extends PrimaryEntity {

    private Integer number;

    @ManyToOne
    private Composition composition;
}
