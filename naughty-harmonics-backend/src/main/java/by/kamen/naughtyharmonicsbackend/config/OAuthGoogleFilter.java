package by.kamen.naughtyharmonicsbackend.config;

import by.kamen.naughtyharmonicsbackend.dto.TokenDto;
import by.kamen.naughtyharmonicsbackend.service.security.SecurityService;
import jakarta.servlet.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuthGoogleFilter extends OncePerRequestFilter {

    private final SecurityService securityService;

    @Override
    public void doFilterInternal(
        final HttpServletRequest request,
        @NonNull final HttpServletResponse response,
        @NonNull FilterChain chain
    ) throws ServletException, IOException {
        if (request.getServletPath().equals("/login")) {
            chain.doFilter(request, response);
            return;
        }
        if (request.getServletPath().equals("/logout")) {
            final Cookie cookie = new Cookie("idToken", null);
            cookie.setHttpOnly(true);
            cookie.setMaxAge(0);
            response.addCookie(cookie);
            response.setStatus(200);
            return;
        }
        final Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            chain.doFilter(request, response);
            return;
        }
        Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals("idToken"))
                .findFirst()
                .ifPresent(cookie -> {
                    System.out.println(cookie.getValue());
                    securityService.validate(new TokenDto(cookie.getValue()));
                });
        chain.doFilter(request, response);
    }
}
