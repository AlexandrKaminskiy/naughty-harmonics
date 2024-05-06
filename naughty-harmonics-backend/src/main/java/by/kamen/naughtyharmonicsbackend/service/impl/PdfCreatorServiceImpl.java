package by.kamen.naughtyharmonicsbackend.service.impl;

import by.kamen.naughtyharmonicsbackend.service.PdfCreatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PdfCreatorServiceImpl implements PdfCreatorService {
    @Override
    public byte[] createFromComposition(Long id) {
        return new byte[0];
    }
}
