package by.kamen.naughtyharmonicsbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Note extends PrimaryEntity {

    private Integer value;
    private Integer duration;

    @Enumerated(EnumType.STRING)
    private FunctionType functionType;

    @ManyToOne
    private TactColumn tactColumn;
}
