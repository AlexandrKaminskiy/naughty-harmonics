package by.kamen.naughtyharmonicsbackend.mapper;

import by.kamen.naughtyharmonicsbackend.model.Client;
import by.kamen.naughtyharmonicsbackend.response.ClientResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.ERROR, componentModel = "spring")
public interface ClientMapper {

    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "photoUrl", source = "photoUrl")
    @Mapping(target = "email", source = "email")
    ClientResponse toClientResponse(final Client client);
}
