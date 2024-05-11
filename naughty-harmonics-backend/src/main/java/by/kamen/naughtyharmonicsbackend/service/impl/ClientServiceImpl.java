package by.kamen.naughtyharmonicsbackend.service.impl;

import by.kamen.naughtyharmonicsbackend.config.ClientDetails;
import by.kamen.naughtyharmonicsbackend.exception.NaughtyHarmonicsException;
import by.kamen.naughtyharmonicsbackend.mapper.ClientMapper;
import by.kamen.naughtyharmonicsbackend.model.Authority;
import by.kamen.naughtyharmonicsbackend.model.Client;
import by.kamen.naughtyharmonicsbackend.model.Invitation;
import by.kamen.naughtyharmonicsbackend.repository.ClientRepository;
import by.kamen.naughtyharmonicsbackend.repository.InvitationRepository;
import by.kamen.naughtyharmonicsbackend.response.ClientResponse;
import by.kamen.naughtyharmonicsbackend.service.ClientService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;
    private final InvitationRepository invitationRepository;

    @Override
    public Client getProfile(Long id) {
        return clientRepository.findById(id).orElseThrow();
    }

    @Override
    public ClientResponse findClient(final String email) {
        return clientRepository.getClientByEmail(email)
            .map(clientMapper::toClientResponse)
            .orElseThrow(() -> new NaughtyHarmonicsException("Cannot find client with email " + email));
    }

    @Override
    public Client getClient(GoogleIdToken.Payload payload) {
        return clientRepository.getClientByEmail(payload.getEmail()).orElseGet(() -> register(payload));
    }

    @Override
    public void inviteOrAcceptFriend(final ClientDetails clientDetails, final Long targetUserId) {
        final Long sourceUserId = clientDetails.getId();
        invitationRepository.findBySourceAndTarget(sourceUserId, targetUserId)
            .ifPresentOrElse(it -> {
                    it.setAccepted(true);
                    invitationRepository.save(it);
                }, () -> invitationRepository.save(
                    new Invitation(getProfile(sourceUserId), getProfile(targetUserId), false))
            );
    }

    @Override
    public List<ClientResponse> findFriendList(final ClientDetails clientDetails) {
        return clientRepository.findClientFriends(clientDetails.getId())
            .stream()
            .map(clientMapper::toClientResponse)
            .toList();
    }

    @Override
    public List<ClientResponse> findInvitationList(final ClientDetails clientDetails) {
        return clientRepository.findClientInvitations(clientDetails.getId())
            .stream()
            .map(clientMapper::toClientResponse)
            .toList();
    }

    @Override
    public List<ClientResponse> findInvitationsFromClient(ClientDetails clientDetails) {
        return clientRepository.findInvitationsFromClient(clientDetails.getId())
            .stream()
            .map(clientMapper::toClientResponse)
            .toList();
    }

    @Override
    public void declineFriendInvitation(
        final ClientDetails clientDetails,
        final Long targetUserId
    ) {
        final Long sourceUserId = clientDetails.getId();
        invitationRepository.findBySourceAndTarget(sourceUserId, targetUserId)
            .ifPresent(invitationRepository::delete);
    }

    private Client register(final GoogleIdToken.Payload payload) {
        final Client client = new Client();
        client.setName((String) payload.get("name"));
        client.setEmail((String) payload.get("email"));
        client.setFirstName((String) payload.get("given_name"));
        client.setLastName((String) payload.get("family_name"));
        client.setPhotoUrl((String) payload.get("picture"));
        client.setAuthority(Authority.ROLE_USER);
        clientRepository.save(client);
        return client;
    }
}