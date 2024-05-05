package by.kamen.naughtyharmonicsbackend.response;

import java.util.List;


public record CompositionResponse(
    Long id,
    String name,
    Integer complexity,
    String description,
    Integer bpm,
    String videoLink,
    List<StaveResponse> staves
) {

}
