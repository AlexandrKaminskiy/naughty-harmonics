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
public class Sheet extends PrimaryEntity {

    private String number;

    @ManyToOne
    private Tab client;
}
