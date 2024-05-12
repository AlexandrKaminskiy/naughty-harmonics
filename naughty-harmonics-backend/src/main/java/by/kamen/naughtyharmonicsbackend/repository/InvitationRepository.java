package by.kamen.naughtyharmonicsbackend.repository;

import by.kamen.naughtyharmonicsbackend.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    @Query(value = """
            FROM Invitation i
            WHERE i.source.id = :sourceId
            AND i.target.id = :targetId
            OR  i.target.id = :sourceId
            AND i.source.id = :targetId
            """)
    Optional<Invitation> findBySourceAndTarget(
        @Param("sourceId") final Long sourceId,
        @Param("targetId") final Long targetId
    );

    @Query("""
        SELECT EXISTS(
            SELECT 1
            FROM Invitation i
            WHERE ((i.source.id = :sourceId AND i.target.id = :targetId)
            OR (i.target.id = :sourceId AND i.source.id = :targetId))
            AND i.accepted
            )
        """)
    boolean existFriend(final Long sourceId, final Long targetId);
}
