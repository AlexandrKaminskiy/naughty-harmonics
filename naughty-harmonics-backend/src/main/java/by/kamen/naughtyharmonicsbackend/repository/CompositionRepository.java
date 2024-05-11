package by.kamen.naughtyharmonicsbackend.repository;

import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.projection.CompositionDocumentProjection;
import by.kamen.naughtyharmonicsbackend.projection.CompositionIdProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
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
            c.is_unique as is_unique,
            (SELECT count(*) FROM nh.rating r WHERE r.composition_id = c.id) as rating
        FROM nh.composition c
        WHERE (:name IS NULL OR c.name LIKE concat('%', COALESCE(:name, ''), '%'))
        AND (:complexity ISNULL OR c.complexity = :complexity)
        AND (:bpm ISNULL OR c.bpm = :bpm)
        AND c.is_public
        AND NOT c.is_banned
        AND NOT c.is_deleted
        ORDER BY rating DESC
        LIMIT :limit
        OFFSET :offset
        """,
        nativeQuery = true,
        countQuery = "SELECT count(*) FROM nh.composition")
    List<CompositionDocumentProjection> findByFilters(
        @Param("name") final String name,
        @Param("complexity") final Integer complexity,
        @Param("bpm") final Integer bpm,
        @Param("limit") final Integer limit,
        @Param("offset") final Long offset
    );

    @Query(value = """
        SELECT
            c.id as id,
            c.name as name,
            c.complexity as complexity,
            c.description as description,
            c.bpm as bpm,
            c.video_link as video_link,
            c.is_unique as is_unique,
            (SELECT count(*) FROM nh.rating r WHERE r.composition_id = c.id) as rating
        FROM nh.composition c
        JOIN nh.client cl ON c.client_id = cl.id
        WHERE cl.id = :userId
        AND NOT c.is_banned
        AND NOT c.is_deleted
        ORDER BY rating DESC
        """,
        nativeQuery = true)
    List<CompositionDocumentProjection> findUserCompositions(
        @Param("userId") final Long userId
    );
}
