package by.kamen.naughtyharmonicsbackend.dto;

import java.util.List;

/**
 * DTO for {@link Sheet}
 */
public record StaveDto(String number, List<TactDto> tacts) {
}
