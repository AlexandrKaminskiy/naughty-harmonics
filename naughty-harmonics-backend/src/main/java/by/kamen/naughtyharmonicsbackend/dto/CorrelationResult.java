package by.kamen.naughtyharmonicsbackend.dto;

public record CorrelationResult(
    double maxCorrelationValue,
    long id,
    boolean isUnique
) {
}
