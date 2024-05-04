package by.kamen.naughtyharmonicsbackend.mapper;

import by.kamen.naughtyharmonicsbackend.dto.NoteDto;
import by.kamen.naughtyharmonicsbackend.dto.SheetDto;
import by.kamen.naughtyharmonicsbackend.dto.TactColumnDto;
import by.kamen.naughtyharmonicsbackend.dto.TactDto;
import by.kamen.naughtyharmonicsbackend.model.Composition;
import by.kamen.naughtyharmonicsbackend.model.Note;
import by.kamen.naughtyharmonicsbackend.model.Sheet;
import by.kamen.naughtyharmonicsbackend.model.Tact;
import by.kamen.naughtyharmonicsbackend.model.TactColumn;
import by.kamen.naughtyharmonicsbackend.projection.CompositionDocumentProjection;
import by.kamen.naughtyharmonicsbackend.request.CompositionRequest;
import by.kamen.naughtyharmonicsbackend.response.CompositionDocumentResponse;
import by.kamen.naughtyharmonicsbackend.response.CompositionResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
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
    @Mapping(target = "sheets", source = "sheets", qualifiedByName = "toSheets")
    Composition toComposition(final CompositionRequest compositionRequest);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "bpm", source = "bpm")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "complexity", source = "complexity")
    @Mapping(target = "videoLink", source = "videoLink")
    @Mapping(target = "sheets", source = "sheets", qualifiedByName = "toSheetDto")
    CompositionResponse toCompositionResponse(Composition composition);

    @Named("toSheet")
    @Mapping(target = "number", source = "number")
    @Mapping(target = "tacts", source = "tacts", qualifiedByName = "toTact")
    Sheet toSheetDto(final SheetDto sheetDto);

    @Named("toSheetDto")
    @Mapping(target = "number", source = "number")
    @Mapping(target = "tacts", source = "tacts", qualifiedByName = "toTactDto")
    SheetDto toSheetDto(final Sheet sheet);

    @Named("toTact")
    @Mapping(target = "size", source = "size")
    @Mapping(target = "serialNumber", source = "serialNumber")
    @Mapping(target = "tactColumns", source = "tactColumns", qualifiedByName = "toTactColumnDto")
    Tact toTactDto(final TactDto tactDto);

    @Named("toTactDto")
    @Mapping(target = "size", source = "size")
    @Mapping(target = "serialNumber", source = "serialNumber")
    @Mapping(target = "tactColumns", source = "tactColumns", qualifiedByName = "toTactColumnDto")
    TactDto toTactDto(final Tact tact);

    @Named("toTactColumnDto")
    @Mapping(target = "numberInTact", source = "numberInTact")
    @Mapping(target = "duration", source = "duration")
    @Mapping(target = "notes", source = "notes", qualifiedByName = "toNoteDto")
    TactColumnDto toTactColumnDto(final TactColumn tactColumn);

    @Named("toNoteDto")
    @Mapping(target = "functionType", source = "functionType")
    @Mapping(target = "value", source = "value")
    @Mapping(target = "stringNumber", source = "stringNumber")
    NoteDto toNoteDto(final Note note);

    @Mapping(target = "description", source = "description")
    @Mapping(target = "bpm", source = "bpm")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "complexity", source = "complexity")
    @Mapping(target = "videoLink", source = "videoLink")
    @Mapping(target = "unique", source = "isUnique")
    CompositionDocumentResponse toCompositionDocumentResponse(final CompositionDocumentProjection compositionDocumentProjection);
}
