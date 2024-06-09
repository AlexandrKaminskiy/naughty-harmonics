package by.kamen.naughtyharmonicsbackend.service;

import java.io.IOException;

public interface PdfCreatorService {

    byte[] createFromComposition(final Long id) throws IOException;
}
