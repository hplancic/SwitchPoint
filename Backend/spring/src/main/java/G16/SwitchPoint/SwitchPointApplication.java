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
	public CommandLineRunner demo(VinylRepository vinylRepository) {
		return (args) -> {
			vinylRepository.saveAll(Arrays.asList(
					new Vinyl("The Dark Side of the Moon", "Pink Floyd", VinylGenre.ROCK, 1973),
					new Vinyl("Thriller", "Michael Jackson", VinylGenre.POP, 1982),
					new Vinyl("Back in Black", "AC/DC", VinylGenre.ROCK, 1980)
/*			private Long id; netreba
			private String title;
			private String artist;
			private VinylGenre genre;
			private int releaseYear;  */
			));

		};
	}



}
