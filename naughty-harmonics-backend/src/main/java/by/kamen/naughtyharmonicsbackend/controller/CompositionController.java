package by.kamen.naughtyharmonicsbackend.controller;

import by.kamen.naughtyharmonicsbackend.request.CompositionRequest;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentResponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import by.kamen.naughtyharmonicsbackend.service.CompositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/composition")
@RequiredArgsConstructor
public class CompositionController {

    private final CompositionService compositionService;

    @GetMapping
    public Page<CompositionDocumentResponse> findAll(
        @RequestParam(required = false) final String name,
        @PageableDefault final Pageable pageable
    ) {
        return compositionService.findAllCompositions(name, pageable);
    }

    @GetMapping("/{id}")
    public CompositionResponse findById(@PathVariable final Long id) {
        return compositionService.findComposition(id);
    }

    @PostMapping
    public void createComposition(@RequestBody final CompositionRequest compositionRequest) {
        compositionService.createComposition(compositionRequest);
    }

    @PutMapping("/{id}")
    public void updateComposition(
        @PathVariable final Long id,
        @RequestBody final CompositionRequest compositionRequest
    ) {
        compositionService.updateComposition(id, compositionRequest);
    }
}
