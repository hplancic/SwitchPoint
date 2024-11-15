package G16.SwitchPoint.config;

import G16.SwitchPoint.users.User;
import G16.SwitchPoint.users.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.gson.JsonObject;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final String CLIENT_ID = "817895363129-joisrep5bkd9fcomrekms9hbagm3u05d.apps.googleusercontent.com";
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @PostMapping("/google")
    public ResponseEntity<String> verifyGoogleToken(@RequestBody String data) {
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(data, JsonObject.class);
        String body = jsonObject.get("body").toString();
        JsonObject bodyJsonObject = gson.fromJson(body, JsonObject.class);
        String tokenA = bodyJsonObject.get("token").toString();
        String token = tokenA.substring(1, tokenA.length()-1);
        System.out.println(token);
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                // Use UserService to verify and register OAuth2 user
                User user = userService.verifyAndRegisterOAuthUser(payload);

                return ResponseEntity.ok("User verified and logged in successfully");
            } else {
                return ResponseEntity.status(401).body("Invalid ID token");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Server error");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        try {
            // Kreiranje tokena za autentikaciju
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);

            // Autentikacija korisnika
            Authentication authentication = authenticationManager.authenticate(authToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return ResponseEntity.ok("Login successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: " + e.getMessage());
        }
    }
}
