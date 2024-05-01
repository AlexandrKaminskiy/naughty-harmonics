package by.kamen.naughtyharmonicsbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Value;

public record ErrorDto (
    String message
){
}
