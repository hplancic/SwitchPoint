package G16.SwitchPoint.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
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
                    auth.anyRequest().authenticated();                 // Require authentication for all other requests
                })
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for the H2 console
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)) // Allow frames for H2 console
                .formLogin(withDefaults())
                .build();
    }
}
