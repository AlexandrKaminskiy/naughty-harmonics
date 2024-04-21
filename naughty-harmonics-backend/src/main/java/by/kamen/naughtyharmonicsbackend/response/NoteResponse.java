package by.kamen.naughtyharmonicsbackend.response;

import by.kamen.naughtyharmonicsbackend.model.FunctionType;
import by.kamen.naughtyharmonicsbackend.model.Note;

import java.io.Serializable;

/**
 * DTO for {@link Note}
 */
public record NoteResponse(int stringNumber, Integer value, FunctionType functionType) {
}
