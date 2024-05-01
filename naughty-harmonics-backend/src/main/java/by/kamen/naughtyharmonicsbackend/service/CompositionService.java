package by.kamen.naughtyharmonicsbackend.service;

import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentReponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CompositionService {
    List<CompositionDocumentReponse> findAllCompositions(final Pageable pageable);
    CompositionResponse findComposition(final Long id);
    Composition findCompositionModel(final Long id);
}
