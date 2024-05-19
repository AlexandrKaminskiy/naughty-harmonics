package by.kamen.naughtyharmonicsbackend.service;

import by.kamen.naughtyharmonicsbackend.config.ClientDetails;
import by.kamen.naughtyharmonicsbackend.dto.CorrelationResult;
import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.request.CompositionRequest;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentResponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CompositionService {
    Page<CompositionDocumentResponse> findAllCompositions(
        final ClientDetails clientDetails,
        final String name,
        final Integer complexity,
        final Integer bpm,
        final Pageable pageable
    );

    List<CompositionDocumentResponse> findAllUserCompositions(
        final ClientDetails clientDetails,
        final Long userId
    );

    CompositionResponse findComposition(final Long id, final ClientDetails clientDetails);

    Composition findCompositionModel(final Long id);

    Long createComposition(
        final CompositionRequest compositionRequest,
        final ClientDetails clientDetails
    );

    Long updateComposition(
        final Long id,
        final CompositionRequest compositionRequest,
        final ClientDetails clientDetails
    );

    void updateCompositionUniqueStatus(final Long id, final boolean unique);

    CompositionDocumentResponse findBriefInfo(final Long id, final ClientDetails clientDetails);

    void ban(final Long id);

    void restore(final Long id);

    void delete(final Long id);

    CorrelationResult publish(final Long id);
}
