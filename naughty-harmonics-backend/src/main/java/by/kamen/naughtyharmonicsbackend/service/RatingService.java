package by.kamen.naughtyharmonicsbackend.service;

import by.kamen.naughtyharmonicsbackend.config.ClientDetails;

public interface RatingService {
    boolean rate(final ClientDetails clientDetails, final Long compositionId);
    Integer getCompositionRating(final Long compositionId);
    boolean isCompositionRated(final ClientDetails clientDetails, final Long compositionId);

    int getClientRating(final Long clientId);
}
