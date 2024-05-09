package by.kamen.naughtyharmonicsbackend.service.impl;

import by.kamen.naughtyharmonicsbackend.exception.NaughtyHarmonicsException;
import by.kamen.naughtyharmonicsbackend.mapper.ClientMapper;
import by.kamen.naughtyharmonicsbackend.model.Client;
import by.kamen.naughtyharmonicsbackend.repository.ClientRepository;
import by.kamen.naughtyharmonicsbackend.response.ClientResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public Client getProfile(Long id) {
        return clientRepository.findById(id).orElseThrow();
    }

    public ClientResponse findClient(final String email) {
        return clientRepository.getClientByEmail(email)
            .map(clientMapper::toClientResponse)
            .orElseThrow(() -> new NaughtyHarmonicsException("Cannot find client with email " + email));
    }

    public Client getClient(GoogleIdToken.Payload payload) {
        return clientRepository.getClientByEmail(payload.getEmail()).orElseGet(() -> register(payload));
    }


    public Client register(final GoogleIdToken.Payload payload) {
        final Client client = new Client();
        client.setName((String) payload.get("name"));
        client.setEmail((String) payload.get("email"));
        client.setFirstName((String) payload.get("given_name"));
        client.setLastName((String) payload.get("family_name"));
        client.setPhotoUrl((String) payload.get("picture"));
        clientRepository.save(client);
        return client;
    }
}
