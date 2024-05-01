package by.kamen.naughtyharmonicsbackend.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class NaughtyHarmonicsException extends RuntimeException {
    public NaughtyHarmonicsException(String message) {
        super(message);
    }
}
