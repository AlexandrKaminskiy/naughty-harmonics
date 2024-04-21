package by.kamen.naughtyharmonicsbackend.response;

public record CompositionDocumentReponse(
    String name,
    Integer complexity,
    String description,
    Integer bpm,
    String videoLink,
    boolean unique
) {
}
