package by.kamen.naughtyharmonicsbackend.projection;

public interface CompositionDocumentProjection {
    String name();
    Integer complexity();
    String description();
    Integer bpm();
    String videoLink();
    boolean unique();
}
