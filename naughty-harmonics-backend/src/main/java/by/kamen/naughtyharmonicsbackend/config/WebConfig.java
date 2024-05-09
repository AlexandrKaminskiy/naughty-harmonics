package by.kamen.naughtyharmonicsbackend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final OAuthGoogleFilter oAuthGoogleFilter;
    private static final String AUTH_HEADER_NAME = "Authorization";

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:4200")
                    .allowedMethods("*")
                    .allowCredentials(true);
            }
        };
    }

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().info(new Info().title("API naughty-harmonics server"))
            .addSecurityItem(new SecurityRequirement()
                .addList(AUTH_HEADER_NAME)
            )
            .components(new Components()
                .addSecuritySchemes(AUTH_HEADER_NAME, createAuthorizationTokenScheme()));
    }


    private SecurityScheme createAuthorizationTokenScheme() {
        return new SecurityScheme()
            .type(SecurityScheme.Type.APIKEY)
            .name(AUTH_HEADER_NAME)
            .in(SecurityScheme.In.HEADER);
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .cors().and()
            .csrf().disable()
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.NEVER))
            .authorizeHttpRequests(authorize -> authorize
                    .requestMatchers("/login").permitAll()
                    .requestMatchers("/swagger-ui/**").permitAll()
                    .requestMatchers("/v3/**").permitAll()
                    .anyRequest().authenticated()
            )
            .addFilterAfter(oAuthGoogleFilter, UsernamePasswordAuthenticationFilter.class)
            .userDetailsService(customUserDetailsService)
            .exceptionHandling(httpSecurityExceptionHandlingConfigurer ->
                httpSecurityExceptionHandlingConfigurer.accessDeniedHandler(
                    (request, response, accessDeniedException) -> response.setStatus(HttpStatus.FORBIDDEN.value())
                    //todo fix
                )
            )
            .formLogin().disable()
            .logout().disable()
            .httpBasic(withDefaults());

        http.headers().cacheControl();
        return http.build();
    }
}


