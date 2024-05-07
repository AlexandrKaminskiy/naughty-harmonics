package by.kamen.naughtyharmonicsbackend.service;

import by.kamen.naughtyharmonicsbackend.dto.CorrelationResult;

public interface UniqueCompositionService {
    CorrelationResult checkUnique(final Long id);
}
