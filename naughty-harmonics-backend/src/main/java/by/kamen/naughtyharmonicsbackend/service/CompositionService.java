package by.kamen.naughtyharmonicsbackend.service;

import by.kamen.naughtyharmonicsbackend.config.ClientDetails;
import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.request.CompositionRequest;
import by.kamen.naughtyharmonicsbackend.projection.CompositionDocumentProjection;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentResponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CompositionService {
    Page<CompositionDocumentResponse> findAllCompositions(
        final String name,
        final Integer complexity,
        final Integer bpm,
        final Pageable pageable
    );

    List<CompositionDocumentResponse> findAllUserCompositions(
        final Long userId
    );

    CompositionResponse findComposition(final Long id);

    Composition findCompositionModel(final Long id);

    Long createComposition(final CompositionRequest compositionRequest);

    Long updateComposition(final Long id, final CompositionRequest compositionRequest);

    void updateCompositionUniqueStatus(final Long id, final boolean unique);
}
