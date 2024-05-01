package by.kamen.naughtyharmonicsbackend.request;

import by.kamen.naughtyharmonicsbackend.dto.SheetDto;

import java.util.List;

public record CompositionRequest(
    String name,
    Integer complexity,
    String description,
    Integer bpm,
    String videoLink,
    List<SheetDto> sheets
) {
}
