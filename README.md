# SwitchPoint

### Link za deployanu web-aplikaciju: 
- https://switchpoint1-c39a98ff47c7.herokuapp.com/
***
## Opis projekta

Ovaj projekt rezultat je timskog rada razvijenog u sklopu projektnog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu.
Cilj ovog projekta je izraditi platformu pod nazivom **VinylSwap** koja omogućava ljubiteljima gramofonskih ploča jednostavnu razmjenu ploča.
Platforma će korisnicima omogućiti objavljivanje ploča koje žele zamijeniti, pregledavanje dostupnih ploča i zamjenu s drugim registriranim korisnicima.
Registrirani korisnici mogu unositi detalje o pločama(izvođač, album, godina izdavanja, lokacije korištenjem OpenStreetMap usluge)
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

## Nefunkcijski zahtjevi

1. Aplikacija mora biti prilagođena mobilnim uređajima (responsivna web aplikacija).
2. Registracija i autentifikacija korisnika provodi se putem OAuth 2.0 protokola.
3. Sustav treba podržavati rad više korisnika istovremeno (rad u stvarnom vremenu).
4. Sustav mora biti pouzdan i dostupan, osiguravajući neprekidan rad aplikacije.
5. Za prikaz geografskih informacija i interaktivnih mapa, sustav će koristiti OpenStreetMap kao osnovu za kartografske podatke.

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

## 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
Kao studenti sigurno ste upoznati s minimumom prihvatljivog ponašanja definiran u [KODEKS PONAŠANJA STUDENATA FAKULTETA ELEKTROTEHNIKE I RAČUNARSTVA SVEUČILIŠTA U ZAGREBU](https://www.fer.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016%5B1%5D.pdf), te dodatnim naputcima za timski rad na predmetu [Programsko inženjerstvo](https://wwww.fer.hr).
Očekujemo da ćete poštovati [etički kodeks IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html) koji ima važnu obrazovnu funkciju sa svrhom postavljanja najviših standarda integriteta, odgovornog ponašanja i etičkog ponašanja u profesionalnim aktivnosti. Time profesionalna zajednica programskih inženjera definira opća načela koja definiranju  moralni karakter, donošenje važnih poslovnih odluka i uspostavljanje jasnih moralnih očekivanja za sve pripadnike zajenice.

Kodeks ponašanja skup je provedivih pravila koja služe za jasnu komunikaciju očekivanja i zahtjeva za rad zajednice/tima. Njime se jasno definiraju obaveze, prava, neprihvatljiva ponašanja te  odgovarajuće posljedice (za razliku od etičkog kodeksa). U ovom repozitoriju dan je jedan od široko prihvačenih kodeks ponašanja za rad u zajednici otvorenog koda.
>### Poboljšajte funkcioniranje tima:
>* definirajte načina na koji će rad biti podijeljen među članovima grupe
>* dogovorite kako će grupa međusobno komunicirati.
>* ne gubite vrijeme na dogovore na koji će grupa rješavati sporove primjenite standarde!
>* implicitno podrazmijevamo da će svi članovi grupe slijediti kodeks ponašanja.
 
>###  Prijava problema
>Najgore što se može dogoditi je da netko šuti kad postoje problemi. Postoji nekoliko stvari koje možete učiniti kako biste najbolje riješili sukobe i probleme:
>* Obratite mi se izravno [e-pošta](mailto:vlado.sruk@fer.hr) i  učinit ćemo sve što je u našoj moći da u punom povjerenju saznamo koje korake trebamo poduzeti kako bismo riješili problem.
>* Razgovarajte s vašim asistentom jer ima najbolji uvid u dinamiku tima. Zajedno ćete saznati kako riješiti sukob i kako izbjeći daljnje utjecanje u vašem radu.
>* Ako se osjećate ugodno neposredno razgovarajte o problemu. Manje incidente trebalo bi rješavati izravno. Odvojite vrijeme i privatno razgovarajte s pogođenim članom tima te vjerujte u iskrenost.

## 📝 Licenca
Važeča (1)
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

Ovaj repozitorij sadrži otvoreni obrazovni sadržaji (eng. Open Educational Resources)  i licenciran je prema pravilima Creative Commons licencije koja omogućava da preuzmete djelo, podijelite ga s drugima uz 
uvjet da navođenja autora, ne upotrebljavate ga u komercijalne svrhe te dijelite pod istim uvjetima [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License HR][cc-by-nc-sa].
>
> ### Napomena:
>
> Svi paketi distribuiraju se pod vlastitim licencama.
> Svi upotrijebleni materijali  (slike, modeli, animacije, ...) distribuiraju se pod vlastitim licencama.

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: https://creativecommons.org/licenses/by-nc/4.0/deed.hr 
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

Orginal [![cc0-1.0][cc0-1.0-shield]][cc0-1.0]
>
>COPYING: All the content within this repository is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
>
[![CC0-1.0][cc0-1.0-image]][cc0-1.0]

[cc0-1.0]: https://creativecommons.org/licenses/by/1.0/deed.en
[cc0-1.0-image]: https://licensebuttons.net/l/by/1.0/88x31.png
[cc0-1.0-shield]: https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg
