package G16.SwitchPoint.config;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final String CLIENT_ID = "817895363129-joisrep5bkd9fcomrekms9hbagm3u05d.apps.googleusercontent.com";

    @PostMapping("/google")
    public ResponseEntity<String> verifyGoogleToken(@RequestBody String token) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                // Retrieve user information from the token
                String userId = payload.getSubject();
                String email = payload.getEmail();
                String name = (String) payload.get("name");

                // Perform any necessary actions (e.g., register the user in your database)
                return ResponseEntity.ok("User verified and registered successfully");
            } else {
                return ResponseEntity.status(401).body("Invalid ID token");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Server error");
        }
    }
}