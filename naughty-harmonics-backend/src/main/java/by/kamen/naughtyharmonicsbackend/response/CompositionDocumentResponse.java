package by.kamen.naughtyharmonicsbackend.response;

public record CompositionDocumentResponse(
    String name,
    Integer complexity,
    String description,
    Integer bpm,
    String videoLink,
    boolean unique
) {

}
