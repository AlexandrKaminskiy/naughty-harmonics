package by.kamen.naughtyharmonicsbackend.response;

import by.kamen.naughtyharmonicsbackend.model.TactColumn;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link TactColumn}
 */
public record TactColumnResponse(int numberInTact, int duration, List<NoteResponse> notes) {
}
