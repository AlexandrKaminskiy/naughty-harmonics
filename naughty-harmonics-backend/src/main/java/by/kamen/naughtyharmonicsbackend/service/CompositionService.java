package by.kamen.naughtyharmonicsbackend.service;

import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.request.CompositionRequest;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentReponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CompositionService {
    Page<CompositionDocumentReponse> findAllCompositions(final String name, final Pageable pageable);
    CompositionResponse findComposition(final Long id);
    Composition findCompositionModel(final Long id);
    void createComposition(final CompositionRequest compositionRequest);
    void updateComposition(final Long id, final CompositionRequest compositionRequest);
}
