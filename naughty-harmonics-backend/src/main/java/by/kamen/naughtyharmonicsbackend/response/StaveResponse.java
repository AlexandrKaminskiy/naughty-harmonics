package by.kamen.naughtyharmonicsbackend.response;

import java.util.List;

public record StaveResponse(
    String number,
    List<TactResponse> tacts
) {
}
