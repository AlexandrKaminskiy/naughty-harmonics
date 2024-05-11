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
}
