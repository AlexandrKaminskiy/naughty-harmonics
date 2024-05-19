package by.kamen.naughtyharmonicsbackend.service.impl;

import by.kamen.naughtyharmonicsbackend.dto.CorrelationResult;
import by.kamen.naughtyharmonicsbackend.dto.NoteDto;
import by.kamen.naughtyharmonicsbackend.dto.TactColumnDto;
import by.kamen.naughtyharmonicsbackend.projection.CompositionIdProjection;
import by.kamen.naughtyharmonicsbackend.repository.CompositionRepository;
import by.kamen.naughtyharmonicsbackend.service.CompositionService;
import by.kamen.naughtyharmonicsbackend.service.UniqueCompositionService;
import by.kamen.naughtyharmonicsbackend.util.NotesConverterUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.IntStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class UniqueCompositionServiceImpl implements UniqueCompositionService {

    public static final double UNIQUE_COEFFICIENT = 0.9;
    @Lazy
    @Autowired
    private CompositionService compositionService;
    private final CompositionRepository compositionRepository;

    @Override
    public CorrelationResult checkUnique(final Long id) {
        //function that will be static
        final List<Double> immobile = getFunctionValues(id);

        return compositionRepository.findAllIds()
            .stream()
            .map(CompositionIdProjection::getId)
            .filter(it -> !Objects.equals(id, it))
            .map(it -> compareCompositions(immobile, it))
            .max(Comparator.comparingDouble(CorrelationResult::maxCorrelationValue))
            .stream()
            .peek(it -> compositionService.updateCompositionUniqueStatus(id, it.isUnique()))
            .findFirst()
            .orElseGet(() -> new CorrelationResult(0, 0, true));
    }


    private CorrelationResult compareCompositions(final List<Double> immobile, final Long second) {

        //function that will drive
        final List<Double> exploring = getFunctionValues(second);

        double immobileSum = immobile
            .stream()
            .map(it -> it * it)
            .reduce(Double::sum)
            .orElse(1.0);
        double exploringSum = exploring
            .stream()
            .map(it -> it * it)
            .reduce(Double::sum)
            .orElse(1.0);

        final List<Double> correlation = new ArrayList<>();

        for (int i = 0; i < immobile.size() + exploring.size() * 2; i++) {
            double result = 0;
            for (int j = 0; j < exploring.size(); j++) {
                if (!inBounds(i + j, immobile.size(), exploring.size())) {
                    continue;
                }
                result += exploring.get(j) * immobile.get(j + i - exploring.size());
            }
            correlation.add(result / Math.sqrt(immobileSum * exploringSum));
        }

        IntStream.range(0, correlation.size()).forEach(
            it -> System.out.print("(" + it + "," + correlation.get(it) + "), ")
        );
        final double maxCoefficient = correlation.stream()
            .max(Comparator.comparingDouble(Double::doubleValue))
            .orElse(0.0);
        return new CorrelationResult(maxCoefficient, second, UNIQUE_COEFFICIENT > maxCoefficient);
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
