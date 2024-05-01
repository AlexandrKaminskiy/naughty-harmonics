package by.kamen.naughtyharmonicsbackend.mapper;

import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.request.CompositionRequest;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentReponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueMappingStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
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
    Composition toComposition(final CompositionRequest compositionRequest);

}
