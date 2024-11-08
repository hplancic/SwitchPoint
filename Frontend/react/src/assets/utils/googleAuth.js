
export function initializeGoogleSignIn() {
    // Function to handle the response from Google's sign-in
    const handleCallbackResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);

        fetch("http://localhost:8080/api/auth/google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: response.credential }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Server response:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    function initializeGoogle() {
        if (window.google && window.google.accounts && window.google.accounts.id) {
            window.google.accounts.id.initialize({
                client_id: "817895363129-joisrep5bkd9fcomrekms9hbagm3u05d.apps.googleusercontent.com",
                callback: handleCallbackResponse,
            });

            window.google.accounts.id.renderButton(
                document.getElementById("google-login"),
                {
                    theme: "outline",
                    size: "large",
                }
            );
        } else {
            console.error("Google API client library not loaded.");
        }
    }


    function loadGoogleScript() {
        return new Promise((resolve, reject) => {
            if (document.getElementById("google-js")) {
                resolve();
                return;
            }

            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.id = "google-js";
            script.async = true;
            script.defer = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    loadGoogleScript()
        .then(() => {
            initializeGoogle();
        })
        .catch(() => {
            console.error("Failed to load the Google Identity Services script.");
        });
}
