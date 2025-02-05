package G16.SwitchPoint.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    @Order(3)
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth  -> {
                    auth.requestMatchers("/").permitAll();             // Allow access to the root URL
                    auth.requestMatchers("/error").permitAll();        // Allow access to the error page
                    auth.requestMatchers("/h2-console/**").permitAll(); // Allow access to H2 console
                    auth.requestMatchers("/api/auth/google").permitAll(); // Allow access to Google OAuth2 login endpoint
                    auth.anyRequest().permitAll();  
                    //auth.anyRequest().authenticated();                // Require authentication for all other requests
                })
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for the H2 console
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)) // Allow frames for H2 console
                .formLogin(withDefaults())
                .build();
    }

    // Bean za kodiranje lozinki koristeći BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Bean za AuthenticationManager kako bi se omogućila autentikacija korisnika
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}