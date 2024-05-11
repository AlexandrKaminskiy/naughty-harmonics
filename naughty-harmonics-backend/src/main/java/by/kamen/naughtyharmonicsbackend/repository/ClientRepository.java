package by.kamen.naughtyharmonicsbackend.repository;

import by.kamen.naughtyharmonicsbackend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> getClientByEmail(final String email);

    @Query("""
        SELECT i.target
        FROM Invitation i
        WHERE i.source.id = :id AND i.accepted
        UNION
        SELECT i1.source
        FROM Invitation i1
        WHERE i1.target.id = :id AND i1.accepted
        """)
    List<Client> findClientFriends(
        @Param("id") final Long id);

    @Query("""
        SELECT i.source
        FROM Invitation i
        WHERE i.target.id = :id AND NOT i.accepted
        """)
    List<Client> findClientInvitations(
        @Param("id") final Long id);

    @Query("""
        SELECT i.target
        FROM Invitation i
        WHERE i.source.id = :id AND NOT i.accepted
        """)
    List<Client> findInvitationsFromClient(
        @Param("id") final Long id);
}
