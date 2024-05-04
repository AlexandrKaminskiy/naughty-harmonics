package by.kamen.naughtyharmonicsbackend.request;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record TactRequest(
    String sizeStr,
    @NotEmpty List<List<NoteRequest>> notes,
    Integer serialNumber
) {
}
