package by.kamen.naughtyharmonicsbackend.model;

import by.kamen.naughtyharmonicsbackend.dto.StaveDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<StaveDto> staves;
}
