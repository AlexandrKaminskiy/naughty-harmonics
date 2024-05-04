package by.kamen.naughtyharmonicsbackend.service;

import by.kamen.naughtyharmonicsbackend.dto.NoteDto;
import by.kamen.naughtyharmonicsbackend.dto.TactColumnDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UniqueCompositionService {

    private final CompositionService compositionService;

    public void compareCompositions(final Long first, final Long second) {
        //function that will be static
        final List<Double> immobile = getFunctionValues(first);
        //function that will drive
        final List<Double> exploring = getFunctionValues(second);
        final List<Double> corellation = new ArrayList<>();
        for (int i = -exploring.size(); i < immobile.size() + exploring.size(); i++) {
            double result = 0;
            for (int j = 0; j < exploring.size(); j++) {
                result += exploring.get(j) * immobile.get(j + i);
            }
            corellation.add(result);
        }
        
    }
    private List<Double> getFunctionValues(Long id) {
        return compositionService.findCompositionModel(id).getStaves()
            .stream()
            .flatMap(it -> it.tacts().stream())
            .flatMap(it -> it.tactColumns().stream())
            .map(UniqueCompositionService::cartesianDistance)
            .toList();
    }

    public static double cartesianDistance(final TactColumnDto tactColumn) {
        return tactColumn.notes()
            .stream()
            .map(NoteDto::value)
            .map(Integer::parseInt)
            .reduce((a, b) -> a * a + b)
            .map(Math::sqrt)
            .orElse(0.0);
    }
}
