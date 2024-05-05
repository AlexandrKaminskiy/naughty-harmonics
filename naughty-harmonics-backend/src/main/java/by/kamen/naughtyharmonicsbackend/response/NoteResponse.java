package by.kamen.naughtyharmonicsbackend.response;

import by.kamen.naughtyharmonicsbackend.model.FunctionType;

public record NoteResponse(
    String value,
    Integer duration,
    FunctionType functionType
) {
}
