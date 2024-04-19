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
public class Tact extends PrimaryEntity {

    private int serialNumber;
    private String size;

    @ManyToOne
    private Sheet sheet;
}
