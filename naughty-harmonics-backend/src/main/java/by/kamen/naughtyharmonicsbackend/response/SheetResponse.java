package by.kamen.naughtyharmonicsbackend.response;

import by.kamen.naughtyharmonicsbackend.model.Sheet;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link Sheet}
 */
public record SheetResponse(String number, List<TactResponse> tacts) {
}
