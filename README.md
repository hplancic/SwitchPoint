# SwitchPoint

## Opis projekta

Cilj ovog projekta je izraditi platformu pod nazivom **VinylSwap** koja omogućava ljubiteljima gramofonskih ploča jednostavnu razmjenu ploča.
Platforma će korisnicima omogućiti objavljivanje ploča koje žele zamijeniti, pregledavanje dostupnih ploča i zamjenu s drugim registriranim korisnicima.
Registriarani korisnici mogu unositi detalje o pločama(izvođač, album, godina izdavanja, lokacije korištenjem OpenStreetMap usluge)
Korisnici mogu pretraživati ploče pomoću kategorija i trake za pretraživanje, te nuditi svoje ploče za zamjenu. Sustav omogućuje kreiranje popisa želja i 
obavještavanje korisnika kada tražene ploče postanu dostupne.
Administratori imaju mogućnost upravljanja korisnicima i oglasima te uklanjanja neprikladnih sadržaja. Platforma je dizajnirana kao responzivna web aplikacija prilagođena mobilnim uređajima.


## Funkcijski zahtjevi

1. Uvid u listu svih objavljenih ploča omogućen i neregistriranim korisnicima.
2. Registracija i prijava korisnika (OAuth 2.0 protokol).
3. Objavljivanje ploča sa svim relevantnim informacijama (naziv albuma, izvođač, godina, žanr, stanje ploče i omota, itd.).
4. Pregled i uređivanje vlastitih ploča ("Moje ploče").
5. Pretraga i filtriranje ploča po kategorijama i putem trake za pretraživanje.
6. Ponuda za zamjenu ploča s mogućnošću odabira jedne ili više ploča.
7. Prikaz i obavijest o novim ponudama za zamjenu putem sustava i e-maila.
8. Stvaranje popisa želja ploča koje korisnik traži te obavijesti kada postanu dostupne.
9. Arhiviranje i pregled izvršenih zamjena u sekciji "Moje zamjene".
10. Upravljanje platformom od strane administratora (uređivanje oglasa, brisanje sadržaja, deaktivacija korisničkih računa).

## Nefunkcionalni zahtjevi

1. Aplikacija mora biti prilagođena mobilnim uređajima (responsivna web aplikacija).
2. Registracija i autentifikacija korisnika provodi se putem OAuth 2.0 protokola.
3. Sustav treba podržavati rad više korisnika istovremeno (rad u stvarnom vremenu).
4. Sustav mora biti pouzdan i dostupan, osiguravajući neprekidan rad aplikacije.

## Tehnologije

- Frontend - React, HTML, CSS
- Backend - Spring
- Baza podataka - PostgreSQL


## Članovi tima

- [Zvonko Čagalj](https://github.com/Zvonko-Cagalj)  
- [Sven Sonicki](https://github.com/SSonicki)  
- [Marijan Tadijal](https://github.com/FER-Marijan-Tadijal)  
- [Haris Plančić](https://github.com/hplancic)  
- [Roko Peran](https://github.com/Rokidza)  
- [Marko Subašić](https://github.com/)  
- [Filip Crnoja](https://github.com/FilipCrnoja)


## Kontribucije

Kontribucije su izdvojene u CONTRIBUTING.md
