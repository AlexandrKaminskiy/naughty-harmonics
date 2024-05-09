package by.kamen.naughtyharmonicsbackend.repository;

import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.projection.CompositionDocumentProjection;
import by.kamen.naughtyharmonicsbackend.projection.CompositionIdProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompositionRepository extends JpaRepository<Composition, Long> {

    @Query(value = "SELECT c.id as id FROM nh.composition c", nativeQuery = true)
    List<CompositionIdProjection> findAllIds();

    @Query(value = """
        SELECT
            c.id as id,
            c.name as name,
            c.complexity as complexity,
            c.description as description,
            c.bpm as bpm,
            c.video_link as video_link,
            c.is_unique as is_unique
        FROM nh.composition c
        WHERE c.name LIKE concat('%', COALESCE(:name, ''), '%')
        """,
        nativeQuery = true,
        countQuery = "SELECT count(*) FROM nh.composition")
    Page<CompositionDocumentProjection> findCompositions(
        @Param("name") final String name,
        final Pageable pageable
    );
}
