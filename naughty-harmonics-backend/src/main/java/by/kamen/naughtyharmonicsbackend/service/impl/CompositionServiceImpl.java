package by.kamen.naughtyharmonicsbackend.service.impl;

import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentReponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import by.kamen.naughtyharmonicsbackend.service.CompositionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompositionServiceImpl implements CompositionService {

    @Override
    public List<CompositionDocumentReponse> findAllCompositions(Pageable pageable) {
        return Collections.emptyList();
    }

    @Override
    public CompositionResponse findComposition(Long id) {
        return null;
    }
}
