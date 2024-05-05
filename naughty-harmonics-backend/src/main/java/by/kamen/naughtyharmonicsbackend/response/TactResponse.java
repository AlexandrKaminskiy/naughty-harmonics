package by.kamen.naughtyharmonicsbackend.response;

import java.util.List;

public record TactResponse(
    String sizeStr,
    List<List<NoteResponse>> notes,
    Integer serialNumber
) {
}
