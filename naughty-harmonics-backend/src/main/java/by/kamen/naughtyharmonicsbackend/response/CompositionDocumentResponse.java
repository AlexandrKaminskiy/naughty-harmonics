package by.kamen.naughtyharmonicsbackend.response;

public record CompositionDocumentResponse(
    Long id,
    String name,
    Integer complexity,
    String description,
    Integer bpm,
    String videoLink,
    String clientId,
    boolean isPublic,
    String clientName,
    String photoUrl,
    Boolean deleted,
    Boolean banned,
    Integer stavesCount
) {

}
