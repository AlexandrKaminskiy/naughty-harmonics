package by.kamen.naughtyharmonicsbackend.dto;

import by.kamen.naughtyharmonicsbackend.model.FunctionType;

/**
 * DTO for {@link Note}
 */
public record NoteDto(int stringNumber, String value, FunctionType functionType) {
}
