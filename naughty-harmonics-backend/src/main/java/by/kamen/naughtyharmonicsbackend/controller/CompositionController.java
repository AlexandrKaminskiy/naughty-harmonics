package by.kamen.naughtyharmonicsbackend.controller;

import by.kamen.naughtyharmonicsbackend.config.ClientDetails;
import by.kamen.naughtyharmonicsbackend.dto.CorrelationResult;
import by.kamen.naughtyharmonicsbackend.request.CompositionRequest;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentResponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import by.kamen.naughtyharmonicsbackend.service.CompositionService;
import by.kamen.naughtyharmonicsbackend.service.PdfCreatorService;
import by.kamen.naughtyharmonicsbackend.service.UniqueCompositionService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/composition")
@RequiredArgsConstructor
public class CompositionController {

    private final CompositionService compositionService;
    private final UniqueCompositionService uniqueCompositionService;
    private final PdfCreatorService pdfCreatorService;

    @GetMapping
    public Page<CompositionDocumentResponse> findAll(
        @AuthenticationPrincipal final ClientDetails clientDetails,
        @RequestParam(required = false) final String name,
        @RequestParam(required = false) final Integer complexity,
        @RequestParam(required = false) final Integer bpm,
        @PageableDefault final Pageable pageable
    ) {
        return compositionService.findAllCompositions(
            clientDetails,
            name,
            complexity,
            bpm,
            pageable
        );
    }

    @GetMapping("/brief/{id}")
    public CompositionDocumentResponse findBriefInfo(
        @PathVariable final Long id,
        @AuthenticationPrincipal ClientDetails clientDetails
    ) {
        return compositionService.findBriefInfo(id, clientDetails);
    }

    @GetMapping("/user-compositions")
    public List<CompositionDocumentResponse> findAllUserComposition(
        @AuthenticationPrincipal final ClientDetails clientDetails,
        @RequestParam final Long userId
    ) {
        return compositionService.findAllUserCompositions(clientDetails, userId);
    }

    @GetMapping("/{id}")
    public CompositionResponse findById(
        @PathVariable final Long id,
        @AuthenticationPrincipal ClientDetails clientDetails
    ) {
        return compositionService.findComposition(id, clientDetails);
    }

    @PostMapping
    public Long createComposition(
        @RequestBody @Valid final CompositionRequest compositionRequest,
        @AuthenticationPrincipal final ClientDetails clientDetails
    ) {
        return compositionService.createComposition(compositionRequest, clientDetails);
    }

    @PutMapping("/{id}")
    public Long updateComposition(
        @PathVariable final Long id,
        @RequestBody @Valid final CompositionRequest compositionRequest,
        @AuthenticationPrincipal final ClientDetails clientDetails
    ) {
        return compositionService.updateComposition(id, compositionRequest, clientDetails);
    }
    
    @DeleteMapping("/{id}")
    public void delete(
        @PathVariable final Long id
    ) {
        compositionService.delete(id);
    }

    @PutMapping("/ban/{id}")
    public void ban(
        @PathVariable final Long id
    ) {
        compositionService.ban(id);
    }

    @PutMapping("/restore/{id}")
    public void restore(
        @PathVariable final Long id
    ) {
        compositionService.restore(id);
    }

    @PostMapping("/publish/{id}")
    public CorrelationResult checkIfUnique(
        @PathVariable final Long id
    ) {
        return compositionService.publish(id);
    }
}
