/* Deletes the database. */
DROP DATABASE IF EXISTS fit_nest_db;

/* Creates the database. */
CREATE USER IF NOT EXISTS fit_nest_admin_user;
CREATE DATABASE fit_nest_db;
GRANT ALL ON DATABASE fit_nest_db TO fit_nest_admin_user;

/* Creates the tables. */
CREATE TABLE users (name VARCHAR NOT NULL,
                    email VARCHAR UNIQUE NOT NULL,
                    user_group VARCHAR NOT NULL);

CREATE TABLE challenge (id SERIAL NOT NULL,
                        name VARCHAR NOT NULL,
                        date_start INT NOT NULL,
                        date_end INT NOT NULL,
                        activities STRING[] NOT NULL);
