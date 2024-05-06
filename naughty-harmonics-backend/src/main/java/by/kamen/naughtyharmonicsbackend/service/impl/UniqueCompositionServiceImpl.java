package by.kamen.naughtyharmonicsbackend.service.impl;

import by.kamen.naughtyharmonicsbackend.dto.NoteDto;
import by.kamen.naughtyharmonicsbackend.dto.TactColumnDto;
import by.kamen.naughtyharmonicsbackend.repository.CompositionRepository;
import by.kamen.naughtyharmonicsbackend.service.CompositionService;
import by.kamen.naughtyharmonicsbackend.service.UniqueCompositionService;
import by.kamen.naughtyharmonicsbackend.util.NotesConverterUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class UniqueCompositionServiceImpl implements UniqueCompositionService {

    private final CompositionService compositionService;
    private final CompositionRepository compositionRepository;

    @Override
    public void checkUnique(final Long id) {
        compareCompositions(id, id);
    }

    public void compareCompositions(final Long first, final Long second) {
        //function that will be static
        final List<Double> immobile = getFunctionValues(first);

        //function that will drive
        final List<Double> exploring = getFunctionValues(second);

        double immobileSum = immobile.stream().reduce(Double::sum).orElse(1.0);
        double exploringSum = exploring.stream().reduce(Double::sum).orElse(1.0);

        final List<Double> corellation = new ArrayList<>();

        for (int i = 0; i < immobile.size() + exploring.size() * 2; i++) {
            double result = 0;
            for (int j = 0; j < exploring.size(); j++) {
                if (!inBounds(i + j, immobile.size(), exploring.size())) {
                    continue;
                }
                result += exploring.get(j) * immobile.get(j + i - exploring.size());
            }
            corellation.add(result / Math.sqrt(immobileSum * exploringSum));
        }

        IntStream.range(0, corellation.size()).forEach(
            it -> System.out.print("(" + it + "," + corellation.get(it) + "), ")
        );
    }

    private boolean inBounds(int index, int immobileSize, int exploringSize) {
        if (index >= immobileSize + exploringSize) {
            return false;
        }
        if (index < exploringSize) {
            return false;
        }

        return true;
    }

    private List<Double> getFunctionValues(Long id) {
        return compositionService.findCompositionModel(id).getStaves()
            .stream()
            .flatMap(it -> it.tacts().stream())
            .flatMap(it -> it.tactColumns().stream())
            .map(UniqueCompositionServiceImpl::cartesianDistance)
            .toList();
    }

    public static double cartesianDistance(final TactColumnDto tactColumn) {
        double result = 0;
        for (int i = 0; i < tactColumn.notes().size(); i++) {
            double convert = convert(i, tactColumn);
            result += convert * convert;
        }

        return Math.sqrt(result);
    }

    public static double convert(final int index, final TactColumnDto tactColumn) {
        final NoteDto noteDto = tactColumn.notes().get(index);
        if (StringUtils.hasText(noteDto.value())) {
            return NotesConverterUtils.noteToInt(index, Integer.parseInt(noteDto.value()));
        }
        return 0;
    }

}
