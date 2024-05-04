package by.kamen.naughtyharmonicsbackend.response;

import by.kamen.naughtyharmonicsbackend.dto.SheetDto;

import java.util.List;


public record CompositionResponse(
    Long id,
    String name,
    Integer complexity,
    String description,
    Integer bpm,
    String videoLink,
    List<SheetDto> sheets
) {

}
