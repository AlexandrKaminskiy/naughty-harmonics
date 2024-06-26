package by.kamen.naughtyharmonicsbackend.dto;

import java.util.List;

/**
 * DTO for {@link Tact}
 */
public record TactDto(
    int serialNumber,
    String size,
    List<TactColumnDto> tactColumns
) {
}
