package by.kamen.naughtyharmonicsbackend.repository;

import by.kamen.naughtyharmonicsbackend.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    @Query("""
        SELECT count(*) FROM Rating r WHERE r.composition.id = :compositionId
        """)
    Integer getCompositionRating(@Param("compositionId") Long compositionId);

    Optional<Rating> findByClientIdAndCompositionId(final Long clientId, final Long compositionId);
}
