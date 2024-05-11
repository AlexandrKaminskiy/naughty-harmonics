package by.kamen.naughtyharmonicsbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.View;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@View(query = """
    SELECT
        r.composition_id as composition_id,
        count(composition_id) as rating
    FROM nh.rating r
    GROUP BY r.composition_id
    """)
public class RatingView {

    @Id
    private Long compositionId;
    private Integer rating;
}
