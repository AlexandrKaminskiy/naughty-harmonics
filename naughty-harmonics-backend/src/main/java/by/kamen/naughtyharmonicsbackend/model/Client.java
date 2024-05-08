package by.kamen.naughtyharmonicsbackend.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Client extends PrimaryEntity {

    private String email;
    private String name;
    private String firstName;
    private String lastName;
    private String photoUrl;

    @ManyToMany
    @JoinTable(
        name = "friend_list",
        joinColumns = { @JoinColumn(name = "source_user") },
        inverseJoinColumns = { @JoinColumn(name = "target_user") }
    )
    private List<Client> friends;

    @Enumerated(EnumType.STRING)
    private Authority authority;
}
