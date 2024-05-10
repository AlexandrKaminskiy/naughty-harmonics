package by.kamen.naughtyharmonicsbackend.repository;

import by.kamen.naughtyharmonicsbackend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> getClientByEmail(final String email);

    @Query("""
        SELECT i.target
        FROM Invitation i
        WHERE i.source = :id AND i.accepted = :isFriend
        UNION
        SELECT i1.source
        FROM Invitation i1
        WHERE i1.target = :id AND i1.accepted = :isFriend
        """)
    List<Client> findClientInvitations(
        @Param("id") final Long id,
        @Param("isFriend") final boolean isFriend);
}
