package by.kamen.naughtyharmonicsbackend.controller;

import by.kamen.naughtyharmonicsbackend.config.ClientDetails;
import by.kamen.naughtyharmonicsbackend.repository.ClientRepository;
import by.kamen.naughtyharmonicsbackend.response.ClientResponse;
import by.kamen.naughtyharmonicsbackend.service.impl.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
