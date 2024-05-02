package by.kamen.naughtyharmonicsbackend.service.impl;

import by.kamen.naughtyharmonicsbackend.exception.NaughtyHarmonicsException;
import by.kamen.naughtyharmonicsbackend.mapper.CompositionMapper;
import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.repository.CompositionRepository;
import by.kamen.naughtyharmonicsbackend.request.CompositionRequest;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentReponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import by.kamen.naughtyharmonicsbackend.service.CompositionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompositionServiceImpl implements CompositionService {

    private final CompositionRepository compositionRepository;
    private final CompositionMapper compositionMapper;

    @Override
    public Page<CompositionDocumentReponse> findAllCompositions(final String name, final Pageable pageable) {
        return compositionRepository.findCompositions(name, pageable);
    }

    @Override
    public CompositionResponse findComposition(final Long id) {
        throw null;
    }

    @Override
    public Composition findCompositionModel(final Long id) {
        return compositionRepository.findById(id)
            .orElseThrow(() -> new NaughtyHarmonicsException("Cannot find composition with id " + id));
    }

    @Override
    public void createComposition(final CompositionRequest compositionRequest) {
        final Composition composition = compositionMapper.toComposition(compositionRequest);
        compositionRepository.save(composition);
    }

    @Override
    public void updateComposition(final Long id, final CompositionRequest compositionRequest) {
        final Composition composition = compositionMapper.toComposition(compositionRequest);
        composition.setId(id);
        compositionRepository.save(composition);
    }
}
