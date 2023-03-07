SET foreign_key_checks = 0;  -- Turn off FK (foreign key) checks
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS income;
DROP TABLE IF EXISTS cost_actual;
DROP TABLE IF EXISTS cost_estimate;
SET foreign_key_checks = 1;  -- Turn on FK checks again

-- the order of the tables makes a difference so we need to put the users table on top so all the tables below can use it
-- i linked cost_estimate to the users table with a foreign key and the income table but NOT the cost_actual table cause the cost_actual table is linked to the income table which as a result lets the income table be connected to the users table
-- so cost_actual linked to income and income to users... so cost_actual is linked to users

-- user1 has password pass1 (etc)
CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL
);

INSERT INTO users (username, password, email)
VALUES 
    ('user1','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W','user1@acme.com'),
    ('user2','$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6','user2@acme.com'),
    ('user3','$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy','user3@acme.com');

CREATE TABLE income ( 
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    text VARCHAR(100), 
    amount DECIMAL(8,2),
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
); 
 
INSERT INTO income (text, amount, userId)  
    VALUES ("Bride's family", 4000, 1), ("Groom's family", 3000, 1), ("The couple", 1000, 1);
 
CREATE TABLE cost_estimate ( 
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    text VARCHAR(100), 
    amount DECIMAL(8,2),
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)

); 
 
INSERT INTO cost_estimate (text, amount, userId)  
    VALUES ("Venue", 10000, 1), ("Food", 5000, 1), ("Music", 2000, 1);
  
CREATE TABLE cost_actual ( 
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    text VARCHAR(100), 
    amount DECIMAL(8,2),
    notes VARCHAR(500),
    income_id INT NOT NULL,

    FOREIGN KEY (income_id) REFERENCES income(id)
    
); 
INSERT INTO cost_actual (text, amount, notes, income_id)  
    VALUES ("Venue", 10000, "Our point person is Dana", 1), ("Food", 5000, "Olive Wood Pizza", 2), ("Music", 2000, "James Harper Band", 3);
