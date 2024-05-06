package by.kamen.naughtyharmonicsbackend.service;

public interface PdfCreatorService {

    byte[] createFromComposition(final Long id);
}
