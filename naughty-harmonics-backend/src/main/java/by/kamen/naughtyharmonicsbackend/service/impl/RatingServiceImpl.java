package by.kamen.naughtyharmonicsbackend.service.impl;

import by.kamen.naughtyharmonicsbackend.config.ClientDetails;
import by.kamen.naughtyharmonicsbackend.model.Client;
import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.model.Rating;
import by.kamen.naughtyharmonicsbackend.repository.RatingRepository;
import by.kamen.naughtyharmonicsbackend.service.ClientService;
import by.kamen.naughtyharmonicsbackend.service.CompositionService;
import by.kamen.naughtyharmonicsbackend.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;
    private final ClientService clientService;
    private final CompositionService compositionService;

    @Override
    public void rate(final ClientDetails clientDetails, final Long compositionId) {
        ratingRepository.findByClientIdAndCompositionId(clientDetails.getId(), compositionId)
            .ifPresentOrElse(ratingRepository::delete, () -> {
                final Client profile = clientService.getProfile(clientDetails.getId());
                final Composition composition = compositionService.findCompositionModel(compositionId);
                ratingRepository.save(new Rating(composition, profile));
            });
    }

    @Override
    public Integer getCompositionRating(final Long compositionId) {
        return ratingRepository.getCompositionRating(compositionId);
    }
}
