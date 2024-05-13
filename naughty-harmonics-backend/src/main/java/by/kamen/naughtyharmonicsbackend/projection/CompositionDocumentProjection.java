package by.kamen.naughtyharmonicsbackend.projection;

public interface CompositionDocumentProjection {
    String getId();
    String getName();
    Integer getComplexity();
    String getDescription();
    Integer getBpm();
    String getVideoLink();
    Boolean getIsUnique();
    Integer getRating();
    Long getClientId();
    String getClientName();
    String getPhotoUrl();
    Boolean getIsDeleted();
    Boolean getIsBanned();
}
