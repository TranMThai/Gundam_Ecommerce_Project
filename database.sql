CREATE DATABASE DATABASE_GUNDAM_ECOMMERCE;
USE DATABASE_GUNDAM_ECOMMERCE;

CREATE TABLE Role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL
);

CREATE TABLE Category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE Brand (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE Product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name NVARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    quantity INT NOT NULL,
    id_category INT,
    id_brand INT,
    status BIT,
    FOREIGN KEY (id_category) REFERENCES Category(id),
    FOREIGN KEY (id_brand) REFERENCES Brand(id)
);

CREATE TABLE Image (
    id INT PRIMARY KEY AUTO_INCREMENT,
    url TEXT NOT NULL,
    id_product INT,
    FOREIGN KEY (id_product) REFERENCES Product(id)
);

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    first_name NVARCHAR(20),
    last_name NVARCHAR(20),
    url_image TEXT,
    gender BIT,
    email VARCHAR(50),
    birth DATE,
    id_role INT,
    FOREIGN KEY (id_role) REFERENCES Role(id)
);

CREATE TABLE Bill (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    order_date DATE,
    total INT NOT NULL,
    status BIT,
    FOREIGN KEY (id_user) REFERENCES User(id)
);

CREATE TABLE BillDetail (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_product INT,
    id_bill INT,
    quantity INT NOT NULL,
    FOREIGN KEY (id_product) REFERENCES Product(id),
    FOREIGN KEY (id_bill) REFERENCES Bill(id)
);

CREATE TABLE Cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_product INT,
    quantity INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES User(id),
    FOREIGN KEY (id_product) REFERENCES Product(id)
);

INSERT INTO Role
VALUES
(NULL,'ADMIN'),
(NULL,'CLIENT');

INSERT INTO Category
VALUES 
(NULL, 'SD', 'Super Deformed'), 
(NULL, 'HG', 'High Grade'), 
(NULL, 'RG', 'Real Grade'), 
(NULL, 'MG', 'Master Grade'), 
(NULL, 'PG', 'Perfect Grade');

INSERT INTO Brand
VALUES 
(NULL, 'Bandai'), 
(NULL, 'Kotobukiya'), 
(NULL, 'Good Smile Company'), 
(NULL, 'Max Factory');

INSERT INTO Product
VALUES 
(NULL, 'RX-78-2 Gundam', 29.99, 100, 2, 1, 1), 
(NULL, 'Gundam Exia', 34.99, 50, 3, 1, 1), 
(NULL, 'Gundam Wing Zero', 39.99, 75, 4, 1, 1), 
(NULL, 'Gundam Barbatos', 24.99, 120, 5, 1, 1);

INSERT INTO Image (id, url, id_product) 
VALUES 
(NULL, 'http://example.com/rx-78-2.jpg', 1), 
(NULL, 'http://example.com/exia.jpg', 2), 
(NULL, 'http://example.com/wing-zero.jpg', 3), 
(NULL, 'http://example.com/barbatos.jpg', 4);
