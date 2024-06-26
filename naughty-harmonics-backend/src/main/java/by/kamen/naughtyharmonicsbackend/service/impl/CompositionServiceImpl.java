package by.kamen.naughtyharmonicsbackend.service.impl;

import by.kamen.naughtyharmonicsbackend.config.ClientDetails;
import by.kamen.naughtyharmonicsbackend.dto.CorrelationResult;
import by.kamen.naughtyharmonicsbackend.exception.NaughtyHarmonicsException;
import by.kamen.naughtyharmonicsbackend.mapper.CompositionMapper;
import by.kamen.naughtyharmonicsbackend.model.Authority;
import by.kamen.naughtyharmonicsbackend.model.Client;
import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.repository.CompositionChangeRepository;
import by.kamen.naughtyharmonicsbackend.repository.CompositionRepository;
import by.kamen.naughtyharmonicsbackend.repository.InvitationRepository;
import by.kamen.naughtyharmonicsbackend.request.CompositionRequest;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentResponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import by.kamen.naughtyharmonicsbackend.service.ClientService;
import by.kamen.naughtyharmonicsbackend.service.CompositionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompositionServiceImpl implements CompositionService {

    private final CompositionRepository compositionRepository;
    private final CompositionMapper compositionMapper;
    private final InvitationRepository invitationRepository;
    private final ClientService clientService;
    private final CompositionChangeRepository compositionChangeRepository;
    private final UniqueCompositionServiceImpl uniqueCompositionService;

    @Override
    public Page<CompositionDocumentResponse> findAllCompositions(
        final ClientDetails clientDetails,
        final String name,
        final Integer complexity,
        final Integer bpm,
        final Pageable pageable
    ) {
        final Authority clientRole = clientService.getClientRole(clientDetails);
        final boolean isAdmin = clientRole == Authority.ROLE_ADMIN;
        return new PageImpl<>(compositionRepository.findByFilters(
                name, complexity, bpm, isAdmin, pageable.getPageSize(), pageable.getOffset()
            )
            .stream()
            .map(compositionMapper::toCompositionDocumentResponse)
            .toList());
    }

    @Override
    public List<CompositionDocumentResponse> findAllUserCompositions(
        final ClientDetails clientDetails,
        final Long userId
    ) {
        final Authority clientRole = clientService.getClientRole(clientDetails);
        final boolean isAdmin = clientRole == Authority.ROLE_ADMIN;
        final boolean isFriend = invitationRepository.existFriend(clientDetails.getId(), userId);
        if (!Objects.equals(userId, clientDetails.getId()) && !isFriend) {
            return Collections.emptyList();
        }
        return compositionRepository.findUserCompositions(userId, isAdmin)
            .stream()
            .map(compositionMapper::toCompositionDocumentResponse)
            .toList();
    }

    @Override
    public CompositionResponse findComposition(final Long id, final ClientDetails clientDetails) {
        final Authority clientRole = clientService.getClientRole(clientDetails);
        final boolean isAdmin = clientRole == Authority.ROLE_ADMIN;
        if (isAdmin) {
            compositionRepository.findById(id)
                .map(compositionMapper::toCompositionResponse)
                .orElseThrow(() -> new NaughtyHarmonicsException("Cannot find composition with id " + id));
        }

        return compositionRepository.findByIdAndIsDeletedFalseAndIsBannedFalse(id)
            .map(compositionMapper::toCompositionResponse)
            .orElseThrow(() -> new NaughtyHarmonicsException("Cannot find composition with id " + id));
    }

    @Override
    public Composition findCompositionModel(final Long id) {
        return compositionRepository.findById(id)
            .orElseThrow(() -> new NaughtyHarmonicsException("Cannot find composition with id " + id));
    }

    @Override
    public Long createComposition(
        final CompositionRequest compositionRequest,
        final ClientDetails clientDetails
    ) {
        final Client profile = clientService.getProfile(clientDetails.getId());
        final Composition composition = compositionMapper.toComposition(compositionRequest, profile);
        final Composition saved = compositionRepository.save(composition);
        return saved.getId();
    }

    @Override
    public Long updateComposition(
        final Long id,
        final CompositionRequest compositionRequest,
        final ClientDetails clientDetails
    ) {
        final Client profile = clientService.getProfile(clientDetails.getId());
        final Composition composition = compositionMapper.toComposition(compositionRequest, profile);
        composition.setId(id);
        compositionRepository.save(composition);
        return id;
    }

    @Override
    public void updateCompositionUniqueStatus(final Long id, final boolean unique) {
        final Composition composition = findCompositionModel(id);
        composition.setPublic(unique);
        compositionRepository.save(composition);
    }

    @Override
    public CompositionDocumentResponse findBriefInfo(final Long id, final ClientDetails clientDetails) {
        final Authority clientRole = clientService.getClientRole(clientDetails);
        final boolean isAdmin = clientRole == Authority.ROLE_ADMIN;
        return compositionRepository.findBriefInfo(id, isAdmin)
            .map(compositionMapper::toCompositionDocumentResponse)
            .orElseThrow(() -> new NaughtyHarmonicsException("Cannot find composition with id " + id));
    }

    @Override
    public void ban(final Long id) {
        compositionRepository.findById(id).ifPresent(it -> {
            it.setBanned(true);
            compositionRepository.save(it);
        });
    }

    @Override
    public void restore(final Long id) {
        compositionRepository.findById(id).ifPresent(it -> {
            it.setBanned(false);
            it.setDeleted(false);
            compositionRepository.save(it);
        });
    }

    @Override
    public void delete(final Long id) {
        compositionRepository.findById(id).ifPresent(it -> {
            it.setDeleted(true);
            compositionRepository.save(it);
        });
    }

    @Override
    public CorrelationResult publish(final Long id) {
        final CorrelationResult correlationResult = uniqueCompositionService.checkUnique(id);
        final Composition compositionModel = findCompositionModel(id);
        compositionModel.setPublic(correlationResult.isUnique());
        compositionRepository.save(compositionModel);
        return correlationResult;
    }

    @Override
    public byte[] generateDocument(Long id) {
        Resource resource = new ClassPathResource("PDF.pdf");
        try {
            return resource.getContentAsByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public int clientCompositionsCount(final Long clientId) {
        return compositionRepository.countByClientId(clientId);
    }
}
