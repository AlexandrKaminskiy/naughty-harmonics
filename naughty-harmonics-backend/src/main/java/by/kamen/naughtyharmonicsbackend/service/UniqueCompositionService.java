package by.kamen.naughtyharmonicsbackend.service;

import by.kamen.naughtyharmonicsbackend.model.Note;
import by.kamen.naughtyharmonicsbackend.model.TactColumn;
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
        return compositionService.findCompositionModel(id).getSheets()
            .stream()
            .flatMap(it -> it.getTacts().stream())
            .flatMap(it -> it.getTactColumns().stream())
            .map(UniqueCompositionService::cartesianDistance)
            .toList();
    }

    public static double cartesianDistance(final TactColumn tactColumn) {
        return tactColumn.getNotes()
            .stream()
            .map(Note::getValue)
            .reduce((a, b) -> a * a + b)
            .map(Math::sqrt)
            .orElse(0.0);
    }
}
