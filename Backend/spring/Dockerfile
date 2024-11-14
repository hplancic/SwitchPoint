# Koristimo Maven sliku za buildanje aplikacije s JDK 17
FROM maven:3.8.7-openjdk-17 AS build

# Postavimo radni direktorij za build
WORKDIR /app

# Kopiramo sav sadržaj aplikacije u kontejner
COPY . .

# Pokrećemo Maven build koji će generirati .jar datoteku
RUN mvn clean package -DskipTests

# Koristimo samo JDK za finalnu sliku
FROM openjdk:17-jdk-alpine

# Postavimo radni direktorij za aplikaciju
WORKDIR /app

# Kopiramo buildanu .jar datoteku iz build faze u finalnu sliku
COPY --from=build /app/target/SwitchPoint-0.0.1-SNAPSHOT.jar app.jar

# Expose port koji aplikacija koristi
EXPOSE 8080

# Pokrećemo aplikaciju
ENTRYPOINT ["java", "-jar", "app.jar"]
