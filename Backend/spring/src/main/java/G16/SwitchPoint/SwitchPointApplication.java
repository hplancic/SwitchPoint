package G16.SwitchPoint;

import G16.SwitchPoint.vinyl.Vinyl;
import G16.SwitchPoint.vinyl.VinylGenre;
import G16.SwitchPoint.vinyl.VinylRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class SwitchPointApplication {

	public static void main(String[] args) {

		var context = SpringApplication.run(SwitchPointApplication.class, args);

	}
}
