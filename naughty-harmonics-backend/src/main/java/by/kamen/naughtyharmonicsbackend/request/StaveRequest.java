package by.kamen.naughtyharmonicsbackend.request;

import by.kamen.naughtyharmonicsbackend.dto.Instrument;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record StaveRequest(
    String number,
    @NotEmpty List<TactRequest> tacts,
    Instrument instrument
) {
}
