package by.kamen.naughtyharmonicsbackend.controller;

import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentReponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import by.kamen.naughtyharmonicsbackend.service.CompositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/composition")
@RequiredArgsConstructor
public class CompositionController {

    private final CompositionService compositionService;

    @GetMapping
    public List<CompositionDocumentReponse> findAll(@PageableDefault final Pageable pageable) {
        return compositionService.findAllCompositions(pageable);
    }

    @GetMapping("/{id}")
    public CompositionResponse findById(@PathVariable final Long id) {
        return compositionService.findComposition(id);
    }


}
