package by.kamen.naughtyharmonicsbackend.service;

import by.kamen.naughtyharmonicsbackend.config.ClientDetails;
import by.kamen.naughtyharmonicsbackend.model.Client;
import by.kamen.naughtyharmonicsbackend.response.ClientResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

import java.util.List;

public interface ClientService {
    Client getProfile(final Long id);
    ClientResponse findClient(final String email);
    ClientResponse findClient(final Long id);
    Client getClient(final GoogleIdToken.Payload payload);

    void inviteOrAcceptFriend(
        final ClientDetails clientDetails,
        final Long targetUserId
    );

    List<ClientResponse> findFriendList(final ClientDetails clientDetails);

    List<ClientResponse> findInvitationList(final ClientDetails clientDetails);

    List<ClientResponse> findInvitationsFromClient(final ClientDetails clientDetails);

    void declineFriendInvitation(
        final ClientDetails clientDetails,
        final Long targetUserId
    );
}
