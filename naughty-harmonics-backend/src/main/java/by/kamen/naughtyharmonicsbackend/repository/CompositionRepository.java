package by.kamen.naughtyharmonicsbackend.repository;

import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentReponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompositionRepository extends JpaRepository<Composition, Long> {

    @Query(value = """
        SELECT
            c.name,
            c.complexity,
            c.description,
            c.bpm,
            c.videoLink,
            c.unique
        FROM nh.composition c
        WHERE c.name LIKE :name
        """,
    nativeQuery = true,
    countQuery = "SELECT count(*) FROM nh.composition")
    Page<CompositionDocumentReponse> findCompositions(
        @Param("name") final String name,
        final Pageable pageable
    );
}
