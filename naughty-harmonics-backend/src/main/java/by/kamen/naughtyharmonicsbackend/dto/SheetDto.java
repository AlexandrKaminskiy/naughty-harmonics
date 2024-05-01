package by.kamen.naughtyharmonicsbackend.dto;

import by.kamen.naughtyharmonicsbackend.model.Sheet;

import java.util.List;

/**
 * DTO for {@link Sheet}
 */
public record SheetDto(String number, List<TactResponse> tacts) {
}
