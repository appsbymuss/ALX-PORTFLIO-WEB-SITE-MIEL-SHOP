CREATE TABLE Coupon(
	id INT PRIMARY KEY AUTO_INCREMENT,
    couponCode VARCHAR(50) UNIQUE,
    `type` ENUM("product", "order"),
    percentage TINYINT,
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