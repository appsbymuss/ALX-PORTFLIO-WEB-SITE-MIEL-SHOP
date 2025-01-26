CREATE DATABASE MielDB;
USE MielDB;

CREATE TABLE User(
	id INT PRIMARY KEY AUTO_INCREMENT,
	fullName VARCHAR(100) NOT NULL,
    numberPhone VARCHAR(20),
    adresse VARCHAR(200),
    password VARCHAR(200) NOT NULL,
    role ENUM("user", "admin"),
    modified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT (NOW())
);

CREATE TABLE `Order`(
	id INT PRIMARY KEY AUTO_INCREMENT,
    adresseOrder VARCHAR(200) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Brand(
	id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100),
    `description` VARCHAR(250)
);

CREATE TABLE Category(
	id INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(100),
    `description` VARCHAR(250),
    image LONGBLOB
);

CREATE TABLE Product(
	id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100),
    `description` VARCHAR(250),
    image LONGBLOB,
    price DECIMAL(6,2),
    priceBarre DECIMAL(6,2),
    category_id INT NOT NULL,
    brand_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(id),
    FOREIGN KEY (brand_id) REFERENCES Brand(id)
);

CREATE TABLE Order_Item(
	id_order INT,
    id_product INT,
    FOREIGN KEY (id_order) REFERENCES `Order`(id),
    FOREIGN KEY (id_product) REFERENCES `Product`(id),
    PRIMARY KEY (id_order, id_product)
);