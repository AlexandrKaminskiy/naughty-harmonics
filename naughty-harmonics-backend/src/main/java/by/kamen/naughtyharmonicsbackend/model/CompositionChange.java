package by.kamen.naughtyharmonicsbackend.model;

import by.kamen.naughtyharmonicsbackend.dto.StaveDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class CompositionChange extends PrimaryEntity {

    private Integer versionNumber;
    private Boolean published;

    @ManyToOne
    @JoinColumn(name = "composition_id")
    private Composition composition;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Composition compositionDocument;
}
