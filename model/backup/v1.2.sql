CREATE DATABASE MielDB;
USE MielDB;

CREATE TABLE User(
	id INT PRIMARY KEY AUTO_INCREMENT,
	fullName VARCHAR(100) NOT NULL,
    numberPhone VARCHAR(20) NOT NULL,
    adresse VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    role ENUM("user", "admin") NOT NULL,
    modified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT (NOW())
);

CREATE TABLE `Order`(
	id INT PRIMARY KEY AUTO_INCREMENT,
    adresseOrder VARCHAR(200) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Brand(
	id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(250) NOT NULL
);

CREATE TABLE Category(
	id INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(250) NOT NULL,
    image LONGBLOB
);

CREATE TABLE Product(
	id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(250) NOT NULL,
    image LONGBLOB,
    price DECIMAL(6,2) NOT NULL,
    priceBarre DECIMAL(6,2) NOT NULL,
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

CREATE TABLE Coupon(
	id INT PRIMARY KEY AUTO_INCREMENT,
    couponCode VARCHAR(50) UNIQUE,
    `type` ENUM("product", "order") NOT NULL,
    percentage TINYINT NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    id_order INT,
    id_product INT,
    FOREIGN KEY (id_order) REFERENCES `Order`(id),
    FOREIGN KEY (id_product) REFERENCES Product(id)
);

-- User
INSERT INTO User VALUES (DEFAULT, "Test", "56652614", "New Mexico, ABQ", "test1234", "user", NULL, DEFAULT);

-- Order
INSERT INTO `Order` VALUES (DEFAULT, "my_address", 1);

-- Category
INSERT INTO Category VALUES (DEFAULT, "Category 1", "No Description", NULL);

-- Brand
INSERT INTO Brand VALUES (DEFAULT, "Brand A", "No Description");

-- Product
INSERT INTO Product VALUES (DEFAULT, "Milch A1", "No Description", NULL, 150.20, 160.00, 1, 1);

-- (*) Coupon (Product)
INSERT INTO Coupon VALUES (DEFAULT, "COUPON1", "product", 50, DATE(NOW()), CURDATE(), NULL, 1);

-- (*) Coupon (Order)
INSERT INTO Coupon VALUES (DEFAULT, "COUPON2", "order", 10, DATE(NOW()), DATE(NOW()), 1, NULL);