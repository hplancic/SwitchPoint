package G16.SwitchPoint;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping({"/mypage", "/ponude", "/popis-zelja", "/postavke", "/korisnici", "/login", "/signup"})
    public String serveMyPage() {
        return "forward:/index.html";
    }
}