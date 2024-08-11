CREATE DATABASE DATABASE_GUNDAM_ECOMMERCE;
USE DATABASE_GUNDAM_ECOMMERCE;

CREATE TABLE Role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE Category (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE 
);

CREATE TABLE Brand (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE 
);

CREATE TABLE Product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code NVARCHAR(30) NOT NULL,
    name NVARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    quantity INT NOT NULL,
	description TEXT,
    code_category VARCHAR(10),
    code_brand VARCHAR(10),
    status BIT,
    FOREIGN KEY (code_category) REFERENCES Category(code),
    FOREIGN KEY (code_brand) REFERENCES Brand(code)
);

CREATE TABLE Image (
    id INT PRIMARY KEY AUTO_INCREMENT,
    url TEXT NOT NULL,
    id_product INT,
    FOREIGN KEY (id_product) REFERENCES Product(id)
);

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) ,
    password TEXT,
    first_name NVARCHAR(20),
    last_name NVARCHAR(20),
    id_google_account VARCHAR(255) NULL,
    url_avatar TEXT NULL,
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
    id_product INT NOT NULL,
    id_bill INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (id_product) REFERENCES Product(id),
    FOREIGN KEY (id_bill) REFERENCES Bill(id)
);

CREATE TABLE Cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES User(id),
    FOREIGN KEY (id_product) REFERENCES Product(id)
);

INSERT INTO Role
VALUES
(NULL,'ADMIN'),
(NULL,'USER');

INSERT INTO Category (code, name) VALUES 
('RG', 'Real Grade'),
('HG', 'High Grade'),
('PG', 'Perfect Grade');

-- Bảng Brand
INSERT INTO Brand (code,name) VALUES 
('BD','Bandai'),
('TS','Tamashii Nations'),
('FM','Fortune Meow');


INSERT INTO Product (code, name, price, quantity, description, code_category, code_brand, status) VALUES 
('HG-RX78-2', 'RX-78-2 Gundam HG', 100.00, 10, 'High Grade 1/144 scale model of RX-78-2 Gundam, featuring detailed articulation and easy assembly.', 'RG', 'BD', 1),
('PG-ZAKU2', 'Zaku II PG', 250.00, 5, 'Perfect Grade 1/60 scale model of Zaku II, known for its high detail and advanced articulation.', 'RG', 'BD', 1),
('RG-STRIKE', 'Strike Gundam RG', 120.00, 20, 'Real Grade 1/144 scale model of Strike Gundam, offering a balance of detail and mobility.', 'HG', 'TS', 1),
('PG-EXIA', 'Gundam Exia PG', 300.00, 7, 'Perfect Grade 1/60 scale model of Gundam Exia, featuring LED light-up units and advanced engineering.', 'HG', 'FM', 1),
('HG-UNICORN', 'Unicorn Gundam HG', 90.00, 15, 'High Grade 1/144 scale model of Unicorn Gundam, known for its unique transformation and color separation.', 'PG', 'BD', 1);

INSERT INTO Image (url, id_product) VALUES 
('cua_hang_do_choi_ban_rx-78-2_gundam_rg_grande.png', 1),
('7173ulQ+B9S._AC_SL1500_.jpg', 2),
('71PdGNJJUBL._AC_SL1500_.jpg', 2),
('4573102615909.png', 3),
('61n0WpnHb1L._AC_UF894,1000_QL80_.jpg', 3),
('71vioR5wsHL._AC_SX522_.jpg', 4),
('61TdbxRyJBS._AC_SX466_.jpg', 4),
('71XZPwHZRQL._AC_SL1500_.jpg', 5),
('71wVQyvx+cL._AC_SL1500_.jpg', 5),
('71vt7nOEAtL._AC_SL1500_.jpg', 5),
('71ESdW85jzL._AC_SL1500_.jpg', 5),
('71kE1Q3CeYL._AC_SL1500_.jpg', 5);
