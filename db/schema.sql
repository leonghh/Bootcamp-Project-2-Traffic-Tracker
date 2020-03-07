CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	user varchar(255) NOT NULL,
    businessType varchar(255) NOT NULL,
	lat DOUBLE NOT NULL,
    lon DOUBLE NOT NULL,
    createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE foottraffics
(
	id int NOT NULL AUTO_INCREMENT,
	road_name varchar(255) NOT NULL,
    count INT(11) NOT NULL,
	wgs84_latitude DOUBLE NOT NULL,
    wgs84_longitude DOUBLE NOT NULL,
    createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE vehicletraffics
(
	id int NOT NULL AUTO_INCREMENT,
    suburb varchar(255) NOT NULL,
	road_name varchar(255) NOT NULL,
    period varchar(255) NOT NULL,
    traffic_count INT(11) NOT NULL,
	wgs84_latitude DOUBLE NOT NULL,
    wgs84_longitude DOUBLE NOT NULL,
    createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);
