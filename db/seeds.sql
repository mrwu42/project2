-- use the specified database
use virtualpet_db;

-- create defaults for the sequelized createdAt and updatedAt to be able to insert a row
alter table characters modify column createdAt 
timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
alter table characters modify column updatedAt 
timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Insert the default character into the characters table
INSERT INTO characters (hunger, play, sleep, love, dirty, health)
VALUES (25, 10, 20, 0, 0, 100);
