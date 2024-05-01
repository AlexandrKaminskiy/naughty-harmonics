package by.kamen.naughtyharmonicsbackend.exception;

import by.kamen.naughtyharmonicsbackend.dto.ErrorDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class NaughtyHarmonicsExceptionHandler {

    @ExceptionHandler(Throwable.class)
    public ResponseEntity<ErrorDto> handleThrowable(final Throwable throwable) {
        log.error(throwable.getMessage(), throwable);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorDto(throwable.getMessage()));
    }

    @ExceptionHandler(NaughtyHarmonicsException.class)
    public ResponseEntity<ErrorDto> handleOasiRxRdException(final NaughtyHarmonicsException exception) {
        log.error(exception.getMessage(), exception);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorDto(exception.getMessage()));
    }
}
