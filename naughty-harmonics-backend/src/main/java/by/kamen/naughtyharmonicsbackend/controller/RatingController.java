package by.kamen.naughtyharmonicsbackend.controller;

import by.kamen.naughtyharmonicsbackend.config.ClientDetails;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import by.kamen.naughtyharmonicsbackend.service.CompositionService;
import by.kamen.naughtyharmonicsbackend.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rating")
public class RatingController {

    private final RatingService ratingService;

    @GetMapping
    public Integer getRating(@RequestParam final Long compositionId) {
        return ratingService.getCompositionRating(compositionId);
    }

    @GetMapping("/client")
    public int getClientRating(@RequestParam final Long clientId) {
        return ratingService.getClientRating(clientId);
    }

    @PostMapping
    public boolean rate(
        @AuthenticationPrincipal ClientDetails clientDetails,
        @RequestParam final Long compositionId
    ) {
        return ratingService.rate(clientDetails, compositionId);
    }

    @GetMapping("/rated")
    public boolean isRated(
        @AuthenticationPrincipal ClientDetails clientDetails,
        @RequestParam final Long compositionId
    ) {
        return ratingService.isCompositionRated(clientDetails, compositionId);
    }
}
