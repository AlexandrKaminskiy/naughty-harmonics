package by.kamen.naughtyharmonicsbackend.mapper;

import by.kamen.naughtyharmonicsbackend.dto.NoteDto;
import by.kamen.naughtyharmonicsbackend.dto.StaveDto;
import by.kamen.naughtyharmonicsbackend.dto.TactColumnDto;
import by.kamen.naughtyharmonicsbackend.dto.TactDto;
import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.projection.CompositionDocumentProjection;
import by.kamen.naughtyharmonicsbackend.request.CompositionRequest;
import by.kamen.naughtyharmonicsbackend.request.NoteRequest;
import by.kamen.naughtyharmonicsbackend.request.StaveRequest;
import by.kamen.naughtyharmonicsbackend.request.TactRequest;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentResponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.IntStream;

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
    @Mapping(target = "sheets", source = "sheets", qualifiedByName = "toSheetDtoFromSheetRequest")
    Composition toComposition(final CompositionRequest compositionRequest);

    @Named("toSheetDtoFromSheetRequest")
    @Mapping(target = "number", source = "number")
    @Mapping(target = "tacts", source = "tacts", qualifiedByName = "toTactDtoFromTactRequest")
    StaveDto toSheetDtoFromSheetRequest(final StaveRequest staveRequest);

    @Named("toTactDtoFromTactRequest")
    default TactDto toSheetDtoFromSheetRequest(final TactRequest tactRequest) {
        final List<TactColumnDto> tactColumns = IntStream.range(0, tactRequest.notes().size())
            .mapToObj(it -> {
                final List<NoteRequest> noteRequests = tactRequest.notes().get(it);
                final List<NoteDto> notes = IntStream.range(0, noteRequests.size())
                    .mapToObj(strNum -> new NoteDto(
                        strNum,
                        noteRequests.get(strNum).value(),
                        noteRequests.get(strNum).functionType())
                    ).toList();

                return new TactColumnDto(it, noteRequests.get(0).duration(), notes);
            }).toList();
        return new TactDto(tactRequest.serialNumber(), tactRequest.sizeStr(), tactColumns);
    }

    @Mapping(target = "id", source = "id")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "bpm", source = "bpm")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "complexity", source = "complexity")
    @Mapping(target = "videoLink", source = "videoLink")
    @Mapping(target = "sheets", source = "staves")
    CompositionResponse toCompositionResponse(Composition composition);

    @Mapping(target = "description", source = "description")
    @Mapping(target = "bpm", source = "bpm")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "complexity", source = "complexity")
    @Mapping(target = "videoLink", source = "videoLink")
    @Mapping(target = "unique", source = "isUnique")
    CompositionDocumentResponse toCompositionDocumentResponse(final CompositionDocumentProjection compositionDocumentProjection);
}
