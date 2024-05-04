package by.kamen.naughtyharmonicsbackend.dto;

import java.util.List;

/**
 * DTO for {@link TactColumn}
 */
public record TactColumnDto(int numberInTact, int duration, List<NoteDto> notes) {
}
