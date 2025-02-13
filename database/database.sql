-- schema.sql
CREATE DATABASE whatsapp_bot;

USE whatsapp_bot;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(15) NOT NULL,
    paid INT DEFAULT 0, -- 1 if user paid for VIP tips, 0 if not
    UNIQUE(phone)
);
