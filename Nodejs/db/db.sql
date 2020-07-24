CREATE DATABASE IF NOT EXISTS game;

USE game;

CREATE TABLE Jugador(
	id int(11) not null AUTO_INCREMENT,
    nickname VARCHAR(30) DEFAULT null,
    photo_url VARCHAR(2083),
    PRIMARY KEY(id)
);


CREATE TABLE Juego(
	id int(11) not null AUTO_INCREMENT,
    PRIMARY KEY(id)
);

CREATE TABLE Estadistica(
	idJuego INT(11) NOT NULL,
    idJugador INT(11) NOT NULL,
    puntos INT NOT NULL,
    fecha_creacion BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (idJugador) REFERENCES Jugador(id),
	FOREIGN KEY (idJuego) REFERENCES Juego(id)
);

DESCRIBE player;

INSERT INTO player VALUES (1,"Lacha");

