CREATE TABLE datalog (id SERIAL PRIMARY KEY,eventdate TIMESTAMP NOT NULL,room VARCHAR(50),light VARCHAR(50),outside VARCHAR(50),feelslike VARCHAR(50),wind VARCHAR(50),pressure VARCHAR(50),rain VARCHAR(50),humidity VARCHAR(50));