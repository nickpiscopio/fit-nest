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

CREATE TABLE activities_performed (id SERIAL NOT NULL,
                                   date INT NOT NULL,
                                   user_name VARCHAR NOT NULL,
                                   activity VARCHAR NOT NULL,
                                   challenge_id VARCHAR NOT NULL,
                                   earned_points INT NOT NULL);

CREATE TABLE social (id SERIAL NOT NULL,
                     user_email VARCHAR NOT NULL,
                     partner_email VARCHAR NOT NULL,
                     challenge_id VARCHAR NOT NULL,
                     activities_performed_id VARCHAR NOT NULL);
