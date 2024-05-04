package by.kamen.naughtyharmonicsbackend.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record CompositionRequest(
    String name,
    Integer complexity,
    String description,
    Integer bpm,
    String videoLink,
    @NotEmpty List<StaveRequest> staves
) {
}
