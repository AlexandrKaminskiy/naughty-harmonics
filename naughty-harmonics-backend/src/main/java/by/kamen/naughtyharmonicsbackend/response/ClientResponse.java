package by.kamen.naughtyharmonicsbackend.response;

public record ClientResponse(
    Long id,
    String email,
    String name,
    String firstName,
    String lastName,
    String photoUrl
) {
}
