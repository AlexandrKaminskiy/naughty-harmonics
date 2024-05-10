package by.kamen.naughtyharmonicsbackend.service.security;

import by.kamen.naughtyharmonicsbackend.config.ClientDetails;
import by.kamen.naughtyharmonicsbackend.dto.TokenDto;
import by.kamen.naughtyharmonicsbackend.model.Client;
import by.kamen.naughtyharmonicsbackend.service.ClientService;
import by.kamen.naughtyharmonicsbackend.service.impl.ClientServiceImpl;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SecurityService {

    @Value("${clientId}")
    private String clientId;
    private GoogleIdTokenVerifier verifier;
    private final ClientService clientService;

    @PostConstruct
    void init() {
        verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
            .setAudience(Collections.singletonList(clientId))
            .build();
    }

    public Optional<String> validate(final TokenDto tokenDto) {

        try {
            final GoogleIdToken idToken = verifier.verify(tokenDto.idToken());
            final GoogleIdToken.Payload payload = idToken.getPayload();
            final Client client = clientService.getClient(payload);
            final ClientDetails clientDetails = new ClientDetails(
                client.getId(),
                client.getEmail(),
                Collections.singletonList(new SimpleGrantedAuthority(client.getAuthority().name()))
            );
            final Authentication authentication = new UsernamePasswordAuthenticationToken(
                clientDetails,
                clientDetails.getAuthorities(),
                clientDetails.getAuthorities()
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            return Optional.of(tokenDto.idToken());
        } catch (Exception e) {
            e.printStackTrace();
            SecurityContextHolder.clearContext();
            return Optional.empty();
        }

    }
}
