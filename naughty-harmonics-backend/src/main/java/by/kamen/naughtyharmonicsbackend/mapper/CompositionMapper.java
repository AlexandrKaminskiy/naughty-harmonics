package by.kamen.naughtyharmonicsbackend.mapper;

import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.request.CompositionRequest;
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

//    @Mapping(target = "description", source = "description")
//    @Mapping(target = "bpm", source = "bpm")
//    @Mapping(target = "name", source = "name")
//    @Mapping(target = "complexity", source = "complexity")
//    @Mapping(target = "videoLink", source = "videoLink")
//    @Mapping(target = "sheets", source = "sheets")
//    CompositionResponse toCompositionResponse(final Composition composition);
}
