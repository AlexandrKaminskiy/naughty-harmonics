package by.kamen.naughtyharmonicsbackend.service.impl;

import by.kamen.naughtyharmonicsbackend.exception.NaughtyHarmonicsException;
import by.kamen.naughtyharmonicsbackend.mapper.CompositionMapper;
import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.repository.CompositionRepository;
import by.kamen.naughtyharmonicsbackend.repository.InvitationRepository;
import by.kamen.naughtyharmonicsbackend.request.CompositionRequest;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentResponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import by.kamen.naughtyharmonicsbackend.service.CompositionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompositionServiceImpl implements CompositionService {

    private final CompositionRepository compositionRepository;
    private final CompositionMapper compositionMapper;
    private final InvitationRepository invitationRepository;

    @Override
    public Page<CompositionDocumentResponse> findAllCompositions(
        final String name,
        final Integer complexity,
        final Integer bpm,
        final Pageable pageable
    ) {
        return new PageImpl<>(compositionRepository.findByFilters(
                name, complexity, bpm, pageable.getPageSize(), pageable.getOffset()
            )
            .stream()
            .map(compositionMapper::toCompositionDocumentResponse)
            .toList());
    }

    @Override
    public List<CompositionDocumentResponse> findAllUserCompositions(
        final Long currentUserId,
        final Long userId
    ) {
        //todo test
        final boolean isFriend = invitationRepository.existFriend(currentUserId, userId);
        if (!isFriend) {
            return Collections.emptyList();
        }
        return compositionRepository.findUserCompositions(currentUserId)
            .stream()
            .map(compositionMapper::toCompositionDocumentResponse)
            .toList();
    }

    @Override
    public CompositionResponse findComposition(final Long id) {
        return compositionRepository.findById(id)
            .map(compositionMapper::toCompositionResponse)
            .orElseThrow(() -> new NaughtyHarmonicsException("Cannot find composition with id " + id));
    }

    @Override
    public Composition findCompositionModel(final Long id) {
        return compositionRepository.findById(id)
            .orElseThrow(() -> new NaughtyHarmonicsException("Cannot find composition with id " + id));
    }

    @Override
    public Long createComposition(final CompositionRequest compositionRequest) {
        final Composition composition = compositionMapper.toComposition(compositionRequest);
        final Composition saved = compositionRepository.save(composition);
        return saved.getId();
    }

    @Override
    public Long updateComposition(final Long id, final CompositionRequest compositionRequest) {
        final Composition composition = compositionMapper.toComposition(compositionRequest);
        composition.setId(id);
        compositionRepository.save(composition);
        return id;
    }

    @Override
    public void updateCompositionUniqueStatus(final Long id, final boolean unique) {
        final Composition composition = findCompositionModel(id);
        composition.setUnique(unique);
        compositionRepository.save(composition);
    }

    @Override
    public CompositionDocumentResponse findBriefInfo(final Long id) {
        return compositionRepository.findBriefInfo(id)
            .map(compositionMapper::toCompositionDocumentResponse)
            .orElseThrow(() -> new NaughtyHarmonicsException("Cannot find composition with id " + id));
    }
}
