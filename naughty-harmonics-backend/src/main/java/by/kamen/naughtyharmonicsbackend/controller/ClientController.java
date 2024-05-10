package by.kamen.naughtyharmonicsbackend.controller;

import by.kamen.naughtyharmonicsbackend.config.ClientDetails;
import by.kamen.naughtyharmonicsbackend.response.ClientResponse;
import by.kamen.naughtyharmonicsbackend.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    public ClientResponse getCurrentUser(
        @AuthenticationPrincipal ClientDetails clientDetails
    ) {
        return clientService.findClient(clientDetails.getUsername());
    }

    @PostMapping("/friend-invitation")
    public void inviteOrAcceptFriend(
        @AuthenticationPrincipal final ClientDetails clientDetails,
        @RequestParam final Long targetUserId
    ) {
        clientService.inviteOrAcceptFriend(clientDetails, targetUserId);
    }

    @DeleteMapping("/decline-friend-invitation")
    public void declineFriendInvitation(
        @AuthenticationPrincipal ClientDetails clientDetails,
        @RequestParam Long userId
    ) {
        clientService.declineFriendInvitation(clientDetails, userId);
    }

    @GetMapping("/login")
    public ResponseEntity<?> login() {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
