package by.kamen.naughtyharmonicsbackend.dto;

import by.kamen.naughtyharmonicsbackend.model.Tact;

import java.util.List;

/**
 * DTO for {@link Tact}
 */
public record TactResponse(
    int serialNumber,
    String size,
    List<TactColumnDto> tactColumns
) {
}
