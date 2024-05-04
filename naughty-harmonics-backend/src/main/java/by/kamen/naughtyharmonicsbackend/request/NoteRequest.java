package by.kamen.naughtyharmonicsbackend.request;

import by.kamen.naughtyharmonicsbackend.model.FunctionType;

public record NoteRequest(
    String value,
    Integer duration,
    FunctionType functionType
) {
}
