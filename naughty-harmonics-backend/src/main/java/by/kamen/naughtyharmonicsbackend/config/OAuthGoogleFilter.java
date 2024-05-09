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
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuthGoogleFilter extends OncePerRequestFilter {

    public static final String TOKEN_TYPE = "Bearer ";
    private final SecurityService securityService;
    @Override
    public void doFilterInternal(
        final HttpServletRequest request,
        @NonNull final HttpServletResponse response,
        @NonNull FilterChain chain
    ) throws ServletException, IOException {
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authorization == null) {
            chain.doFilter(request, response);
            return;
        }
        final String token = StringUtils.substringAfter(authorization, TOKEN_TYPE);

        securityService.validate(new TokenDto(token));
        chain.doFilter(request, response);
    }
}
