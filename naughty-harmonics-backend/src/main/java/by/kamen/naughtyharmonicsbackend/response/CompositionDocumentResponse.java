package by.kamen.naughtyharmonicsbackend.response;

public record CompositionDocumentResponse(
    Long id,
    String name,
    Integer complexity,
    String description,
    Integer bpm,
    String videoLink,
    boolean unique
) {

}
