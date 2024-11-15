--
-- H2 SQL database script
--

-- Table: databasechangelog
CREATE TABLE databasechangelog (
    id VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    dateexecuted TIMESTAMP NOT NULL,
    orderexecuted INTEGER NOT NULL,
    exectype VARCHAR(10) NOT NULL,
    md5sum VARCHAR(35),
    description VARCHAR(255),
    comments VARCHAR(255),
    tag VARCHAR(255),
    liquibase VARCHAR(20),
    contexts VARCHAR(255),
    labels VARCHAR(255),
    deployment_id VARCHAR(10)
);

-- Table: databasechangeloglock
CREATE TABLE databasechangeloglock (
    id INTEGER NOT NULL,
    locked BOOLEAN NOT NULL,
    lockgranted TIMESTAMP,
    lockedby VARCHAR(255),
    PRIMARY KEY (id)
);

-- Table: example_table
CREATE TABLE example_table (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Table: korisnici
CREATE TABLE korisnici (
    user_id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    date_created TIMESTAMP,
    email VARCHAR(255),
    hash_password VARCHAR(255),
    location VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    sub VARCHAR(255) UNIQUE,
    PRIMARY KEY (user_id)
);

-- Table: user_vinyls
CREATE TABLE user_vinyls (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    sleeve_condition VARCHAR(255),
    vinyl_condition VARCHAR(255),
    user_id BIGINT NOT NULL,
    vinyl_id BIGINT NOT NULL,
    package_id BIGINT,
    CONSTRAINT user_vinyls_sleeve_condition_check CHECK (sleeve_condition IN ('MINT', 'NEAR_MINT', 'VERY_GOOD_PLUS', 'VERY_GOOD', 'GOOD_PLUS', 'GOOD', 'FAIR', 'POOR')),
    CONSTRAINT user_vinyls_vinyl_condition_check CHECK (vinyl_condition IN ('MINT', 'NEAR_MINT', 'VERY_GOOD_PLUS', 'VERY_GOOD', 'GOOD_PLUS', 'GOOD', 'FAIR', 'POOR')),
    PRIMARY KEY (id)
);

-- Table: user_wishlist
CREATE TABLE user_wishlist (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    notes VARCHAR(255),
    user_id BIGINT NOT NULL,
    vinyl_id BIGINT NOT NULL,
    PRIMARY KEY (id)
);

-- Table: vinyl_package
CREATE TABLE vinyl_package (
    package_id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    description VARCHAR(255),
    package_name VARCHAR(255),
    PRIMARY KEY (package_id)
);

-- Table: vinyls
CREATE TABLE vinyls (
    vinyl_id BIGINT GENERATED BY DEFAULT AS IDENTITY,
    artist VARCHAR(255),
    genre VARCHAR(255),
    release_year INTEGER NOT NULL,
    vinyl_image VARCHAR(255),
    vinyl_title VARCHAR(255),
    CONSTRAINT vinyls_genre_check CHECK (genre IN ('ROCK', 'JAZZ', 'HIP_HOP', 'CLASSICAL', 'POP', 'ELECTRONIC', 'COUNTRY', 'REGGAE', 'BLUES', 'METAL', 'FOLK', 'PUNK', 'FUNK', 'SOUL', 'RNB', 'LATIN', 'DISCO', 'INDIE', 'WORLD', 'SOUNDTRACK', 'OTHER')),
    PRIMARY KEY (vinyl_id)
);

-- Foreign Key Constraints
ALTER TABLE user_vinyls ADD CONSTRAINT fk_user_vinyls_user FOREIGN KEY (user_id) REFERENCES korisnici(user_id);
ALTER TABLE user_vinyls ADD CONSTRAINT fk_user_vinyls_vinyl FOREIGN KEY (vinyl_id) REFERENCES vinyls(vinyl_id);
ALTER TABLE user_vinyls ADD CONSTRAINT fk_user_vinyls_package FOREIGN KEY (package_id) REFERENCES vinyl_package(package_id);

ALTER TABLE user_wishlist ADD CONSTRAINT fk_user_wishlist_user FOREIGN KEY (user_id) REFERENCES korisnici(user_id);
ALTER TABLE user_wishlist ADD CONSTRAINT fk_user_wishlist_vinyl FOREIGN KEY (vinyl_id) REFERENCES vinyls(vinyl_id);

-- Insert Data into vinyls
INSERT INTO vinyls (artist, genre, release_year, vinyl_image, vinyl_title) VALUES 
    ('The Beatles', 'ROCK', 1969, 'https://example.com/images/abbey_road.jpg', 'Abbey Road'),
    ('Adele', 'POP', 2011, 'https://example.com/images/21_adele_vinyl.jpg', '21'),
    ('AC/DC', 'ROCK', 1980, 'https://example.com/images/back_in_black_acdc_vinyl.jpg', 'Back in Black'),
    ('Pink Floyd', 'ROCK', 1973, 'https://example.com/images/dark_side_of_the_moon_pinkfloyd_vinyl.jpg', 'The Dark Side of the Moon'),
    ('The Beatles', 'ROCK', 1969, 'https://example.com/images/abbey_road_beatles_vinyl.jpg', 'Abbey Road'),
    ('Pink Floyd', 'ROCK', 1979, 'https://example.com/images/the_wall_pinkfloyd_vinyl.jpg', 'The Wall'),
    ('Michael Jackson', 'POP', 1982, 'https://example.com/images/thriller_michaeljackson_vinyl.jpg', 'Thriller'),
    ('Bruce Springsteen', 'ROCK', 1975, 'https://example.com/images/born_to_run_brucespringsteen_vinyl.jpg', 'Born to Run'),
    ('Eagles', 'ROCK', 1976, 'https://example.com/images/hotel_california_eagles_vinyl.jpg', 'Hotel California'),
    ('Prince', 'POP', 1984, 'https://example.com/images/purple_rain_prince_vinyl.jpg', 'Purple Rain'),
    ('Taylor Swift', 'POP', 2019, 'https://example.com/images/lover_taylorswift_vinyl.jpg', 'Lover');

INSERT INTO korisnici (user_id, date_created, email, hash_password, location, username, sub) VALUES 
    (13, '2024-11-09 11:53:50.769', 'john.doe@example.com', '$2a$10$cy1QPGjCG4nJU6h/uPnMBOGZipI7EbDFx9bLWUB0v9smRC8he6bou', 'New York, NY', 'john_doe', NULL),
    (17, '2024-11-09 13:45:38.741', 'email', '$2a$10$ZBPUkxj92QOGzVZIx1yw8uEdtBUP5aCzaP2mK5FYBGVTtaK/cp62e', NULL, 'ime', NULL),
    (18, '2024-11-10 20:42:28.702', 'marko.subasic0@gmail.com', '$2a$10$xhJ4okGNn9fx2J0h/h5xculsCSGVMSopj6jlJLXTdF36UglYUpXze', NULL, 'marksuba', NULL),
    (19, '2024-11-12 12:27:23.02', 'asdf@asdf.c', '$2a$10$nC2XWySV9wVcpPszxXMe7uzY7OnQRfFKcgovGlde46vpSlPM.jRZi', NULL, 'rokasdf', NULL),
    (20, '2024-11-12 21:17:38.288', 'test@test.com', '$2a$10$zFv7dFJuNtqv7awoy1JP7OeHZS84QPwOHrvnZSQgHePTtVuowLziy', NULL, 'test', NULL),
    (21, '2024-11-13 18:25:11.912', 'email@email.com', '$2a$10$t7A/ZQDbSJoGDPOfEph9Tut6ogqZPsoJMezGkBnfDHcbGe.3GD38C', NULL, 'roko', NULL),
    (27, '2024-11-13 18:42:22.607', 'drugi@test.com', '$2a$10$/i32RSaFAJ62LgsEnsg9neFBFSRMi4cGmIf9VLDMAh7BM7aQ1ZYZu', NULL, 'rokos', NULL),
    (30, '2024-11-14 20:57:56.16', 'rookca123@hotmail.com', '$2a$10$CGw3EWUTTWTTD46LZzwPWuM8p5RcJZSC8M3s6vBqVwZqGoDggqu2O', NULL, 'roko123', NULL),
    (31, '2024-11-14 22:21:45.586', 'test@test.test', '$2a$10$LWBW3Sg2At6d7y43YZ0AxOZ.esom8Xdpi/FJ7BnC6.zje4VgbyK9e', NULL, 'Tester', NULL),
    (32, '2024-11-14 22:21:47.942', 'marko.subasic0@gmail.com', '$2a$10$otAs73JGjYZAIy4CNXi4rex9yiesu2keep43ksj1aVnRFKe4hslw2', NULL, 'marko', NULL),
    (33, '2024-11-14 22:21:49.938', 'roko.peran@fer.hr', '$2a$10$/BJb.t27wdG9vw6OM3jxDe6Uywb6EDBq2ngziDluFLWnwmQ4/8maC', NULL, 'rokopppp', NULL),
    (34, '2024-11-14 23:11:46.579', 'marko.subasic0@gmail.com', '$2a$10$hWo3T.b.BFDz8tJC4n5r3.vzuPUgjxtPqBbBrQAlVMffw5E5nYjOu', NULL, 'Marko2', NULL),
    (35, '2024-11-15 11:06:26.728', 'testni@email.com', '$2a$10$ie3OEkKQNCe6IrTNkx/95.IPClT5xf4oed8fJr6hN6rm3maZJs51q', NULL, 'testni', NULL),
    (36, '2024-11-15 13:39:58.882', 'q@q.com', '$2a$10$5ZHRxJThbYjyOSAt88eNee5t9bcNI15TzTN/gsaVERt94ZnSgmiG.', NULL, 'qwertz', NULL),
    (37, '2024-11-15 15:29:58.635', 'filipcrnoja79@gmail.com', '$2a$10$CHSzPgr3xTII3vbBF8yvvOEyx5hO2liYfiGIkarKwXvhp0s4C9G8a', NULL, 'Filip Crnoja', '107922874837910979764'),
    (38, '2024-11-15 18:12:19.321', 'rookca123@hotmail.com', '$2a$10$XPtE9mAh2TSFLE0PE4EJiuL7gEl4mGRZ/pqehC1MasFa2zudpKrm6', NULL, 'someone1', NULL),
    (39, '2024-11-15 17:49:58.413', 'marko.subasic0@gmail.com', '$2a$10$xiRKLqnLo3Ae4RnCc49pGudpNbdIIfI/kJHwaWKZDZQ18ho1YmJhm', NULL, 'Marko Subašić', '116407087990924779407'),
    (40, '2024-11-15 17:52:19.566', 'rookca1234@gmail.com', '$2a$10$RnMu67KlgCBrGgKM7uzkj.xUbxlTonMoxxZbzRS/I9/GS1L.t5EuK', NULL, 'Yaas Main', '105191347556154345906'),
    (41, '2024-11-15 18:08:10.159', 'marijan.tadijal@gmail.com', '$2a$10$90Fbl3gJCj1M1aoTqeHyxexdn2MOSGBjkSrNckz28SfoPwdXK0Zh6', NULL, 'Marijan Tadijal', '104853560297678120005'),
    (42, '2024-11-15 19:11:26.561', 'testiranje@gmail.com', '$2a$10$u1EpJRB/78klMMa3fDWJ6.TPEyLC0QdMIsBTYswil5DC3NA.8sjwy', NULL, 'testiranje', NULL);

INSERT INTO user_vinyls (id, sleeve_condition, vinyl_condition, user_id, vinyl_id, package_id) VALUES 
    (10, 'MINT', 'MINT', 13, 1, NULL),
    (11, 'MINT', 'MINT', 13, 1, NULL),
    (12, 'MINT', 'MINT', 27, 1, NULL),
    (13, 'POOR', 'POOR', 27, 1, NULL),
    (14, 'GOOD_PLUS', 'VERY_GOOD', 27, 4, NULL),
    (15, 'FAIR', 'NEAR_MINT', 27, 11, NULL),
    (16, 'VERY_GOOD', 'GOOD', 27, 3, NULL),
    (17, 'NEAR_MINT', 'VERY_GOOD_PLUS', 27, 10, NULL),
    (18, 'POOR', 'MINT', 27, 2, NULL),
    (19, 'FAIR', 'GOOD', 27, 8, NULL),
    (20, 'POOR', 'MINT', 27, 10, NULL),
    (21, 'GOOD_PLUS', 'MINT', 27, 6, NULL),
    (22, 'GOOD_PLUS', 'VERY_GOOD_PLUS', 27, 2, NULL),
    (23, 'MINT', 'POOR', 27, 3, NULL),
    (24, 'GOOD', 'VERY_GOOD_PLUS', 27, 4, NULL),
    (25, 'POOR', 'VERY_GOOD_PLUS', 27, 10, NULL),
    (26, 'MINT', 'MINT', 27, 2, NULL),
    (27, 'POOR', 'POOR', 27, 9, NULL),
    (28, 'VERY_GOOD', 'MINT', 27, 9, NULL),
    (29, 'VERY_GOOD', 'NEAR_MINT', 35, 3, NULL),
    (30, 'VERY_GOOD_PLUS', 'NEAR_MINT', 35, 8, NULL),
    (31, 'VERY_GOOD', 'NEAR_MINT', 37, 3, NULL),
    (32, 'VERY_GOOD', 'VERY_GOOD_PLUS', 37, 5, NULL),
    (33, 'VERY_GOOD', 'NEAR_MINT', 38, 2, NULL),
    (34, 'POOR', 'MINT', 37, 2, NULL),
    (35, 'POOR', 'NEAR_MINT', 37, 11, NULL),
    (36, 'VERY_GOOD_PLUS', 'VERY_GOOD_PLUS', 37, 4, NULL),
    (37, 'POOR', 'POOR', 37, 11, NULL),
    (38, 'MINT', 'MINT', 37, 2, NULL),
    (39, 'MINT', 'MINT', 27, 2, NULL),
    (40, 'MINT', 'MINT', 41, 4, NULL),
    (41, 'NEAR_MINT', 'NEAR_MINT', 37, 5, NULL),
    (42, 'MINT', 'MINT', 42, 3, NULL),
    (43, 'MINT', 'MINT', 27, 9, NULL),
    (44, 'MINT', 'VERY_GOOD_PLUS', 37, 10, NULL);

