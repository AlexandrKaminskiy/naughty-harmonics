package by.kamen.naughtyharmonicsbackend.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public abstract class PrimaryEntity {

    @Id
    @GeneratedValue
    private Long id;

}
