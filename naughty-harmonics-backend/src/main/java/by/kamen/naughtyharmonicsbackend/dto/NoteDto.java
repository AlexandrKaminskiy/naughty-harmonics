package by.kamen.naughtyharmonicsbackend.dto;

import by.kamen.naughtyharmonicsbackend.model.FunctionType;
import by.kamen.naughtyharmonicsbackend.model.Note;

/**
 * DTO for {@link Note}
 */
public record NoteDto(int stringNumber, Integer value, FunctionType functionType) {
}
