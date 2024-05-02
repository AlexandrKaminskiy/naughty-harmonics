package by.kamen.naughtyharmonicsbackend.mapper;

import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.projection.CompositionDocumentProjection;
import by.kamen.naughtyharmonicsbackend.request.CompositionRequest;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentResponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.ERROR, componentModel = "spring")
public interface CompositionMapper {

    @Mapping(target = "unique", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "client", ignore = true)
    @Mapping(target = "description", source = "description")
    @Mapping(target = "bpm", source = "bpm")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "complexity", source = "complexity")
    @Mapping(target = "videoLink", source = "videoLink")
    @Mapping(target = "sheets", ignore = true)
    Composition toComposition(final CompositionRequest compositionRequest);

    @Mapping(target = "videoLink", ignore = true)
    @Mapping(target = "unique", ignore = true)
    @Mapping(target = "name", ignore = true)
    @Mapping(target = "description", ignore = true)
    @Mapping(target = "complexity", ignore = true)
    @Mapping(target = "bpm", ignore = true)
//    @Mapping(target = "description", expression = "java(compositionDocumentProjection.description)")
//    @Mapping(target = "bpm", source = "java(compositionDocumentProjection.bpm)")
//    @Mapping(target = "name", source = "java(compositionDocumentProjection.name)")
//    @Mapping(target = "complexity", source = "java(compositionDocumentProjection.complexity)")
//    @Mapping(target = "videoLink", source = "java(compositionDocumentProjection.videoLink)")
//    @Mapping(target = "unique", source = "java(compositionDocumentProjection.unique)")
    CompositionDocumentResponse toCompositionResponse(final CompositionDocumentProjection compositionDocumentProjection);
}
