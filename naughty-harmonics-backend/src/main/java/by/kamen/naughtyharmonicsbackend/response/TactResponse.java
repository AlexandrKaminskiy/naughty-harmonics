package by.kamen.naughtyharmonicsbackend.response;

import by.kamen.naughtyharmonicsbackend.model.Tact;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link Tact}
 */
public record TactResponse(int serialNumber, String size,
                           List<TactColumnResponse> tactColumns) {
}
