package by.kamen.naughtyharmonicsbackend;

import by.kamen.naughtyharmonicsbackend.config.OAuthGoogleFilter;
import by.kamen.naughtyharmonicsbackend.dto.TokenDto;
import by.kamen.naughtyharmonicsbackend.service.security.SecurityService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class NaughtyHarmonicsBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(NaughtyHarmonicsBackendApplication.class, args);
    }
}
