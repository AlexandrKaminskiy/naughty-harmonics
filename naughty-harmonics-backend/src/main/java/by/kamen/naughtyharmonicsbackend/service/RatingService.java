package by.kamen.naughtyharmonicsbackend.service;

import by.kamen.naughtyharmonicsbackend.config.ClientDetails;

public interface RatingService {
    void rate(final ClientDetails clientDetails, final Long compositionId);
    Integer getCompositionRating(final Long compositionId);
}
