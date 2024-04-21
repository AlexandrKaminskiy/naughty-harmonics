package by.kamen.naughtyharmonicsbackend.response;

import java.util.List;

public record CompositionResponse(
    String name,
    Integer complexity,
    String description,
    Integer bpm,
    String videoLink,
    List<SheetResponse> sheets
) {
}
