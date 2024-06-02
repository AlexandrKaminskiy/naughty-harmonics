package by.kamen.naughtyharmonicsbackend.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;

public interface PdfCreatorService {

    byte[] createFromComposition(final Long id) throws IOException;
}
