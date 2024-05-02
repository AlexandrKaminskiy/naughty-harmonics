package by.kamen.naughtyharmonicsbackend.response;

import by.kamen.naughtyharmonicsbackend.dto.SheetDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompositionResponse {
    private String name;
    private Integer complexity;
    private String description;
    private Integer bpm;
    private String videoLink;
    private List<SheetDto> sheets;
}
