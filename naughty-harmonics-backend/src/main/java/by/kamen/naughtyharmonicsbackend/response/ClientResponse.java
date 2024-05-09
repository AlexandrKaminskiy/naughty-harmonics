package by.kamen.naughtyharmonicsbackend.response;

public record ClientResponse(
    String email,
    String name,
    String firstName,
    String lastName,
    String photoUrl
) {
}
