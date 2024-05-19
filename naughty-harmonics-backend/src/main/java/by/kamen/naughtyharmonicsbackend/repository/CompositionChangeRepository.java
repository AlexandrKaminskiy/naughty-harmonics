package by.kamen.naughtyharmonicsbackend.repository;

import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.model.CompositionChange;
import by.kamen.naughtyharmonicsbackend.projection.CompositionDocumentProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CompositionChangeRepository extends JpaRepository<CompositionChange, Long> {

    @Query("""
        SELECT cc.composition.id                                                          as id,
               cc.composition.name                                                        as name,
               cc.composition.complexity                                                  as complexity,
               cc.composition.description                                                 as description,
               cc.composition.bpm                                                         as bpm,
               cc.composition.videoLink                                                   as videoLink,
               cc.composition.isPublic                                                    as isPublic,
               (SELECT count(*) FROM Rating r WHERE r.composition.id = cc.composition.id) as rating,
               cc.composition.client.id                                                   as clientId,
               cc.composition.client.name                                                 as clientName,
               cc.composition.client.photoUrl                                             as photoUrl,
               cc.composition.isBanned                                                    as isDeleted,
               cc.composition.isDeleted                                                   as isBanned
               
        FROM CompositionChange cc
        WHERE cc.composition.id = :compositionId
        AND cc.published
        ORDER BY cc.versionNumber DESC
        LIMIT 1
        """)
    Optional<CompositionDocumentProjection> findLastComposition(@Param("compositionId") final Long compositionId);

    @Query(value = """
        SELECT cc.composition.id                                                            as id,
               cc.composition.name                                                          as name,
               cc.composition.complexity                                                    as complexity,
               cc.composition.description                                                   as description,
               cc.composition.bpm                                                           as bpm,
               cc.composition.videoLink                                                     as videoLink,
               cc.composition.isPublic                                                      as isPublic,
               (SELECT count(*) FROM Rating r WHERE r.composition.id = cc.composition.id)   as rating,
               cc.composition.isBanned                                                      as isDeleted,
               cc.composition.isDeleted                                                     as isBanned
        FROM CompositionChange cc
                 JOIN Client cl ON cc.composition.client.id = cl.id
        WHERE cl.id = :userId
          AND (:isAdmin = true OR NOT cc.composition.isBanned)
          AND (:isAdmin = true OR NOT cc.composition.isDeleted)
          AND (cc.id = (
            SELECT max(cc1.versionNumber)
            FROM CompositionChange cc1
            WHERE cc1.composition.id = cc.composition.id)
          )
          AND (cc.published)
        """)
    List<CompositionDocumentProjection> findUserCompositions(
        @Param("userId") final Long userId,
        @Param("isAdmin") final Boolean isAdmin
    );
}
