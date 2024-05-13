package by.kamen.naughtyharmonicsbackend.response;

import by.kamen.naughtyharmonicsbackend.model.Authority;

public record ClientResponse(
    Long id,
    String email,
    String name,
    String firstName,
    String lastName,
    String photoUrl,
    Authority authority
) {
}
