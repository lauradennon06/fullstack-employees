DROP TABLE IF EXISTS employees;


CREATE TABLE empoyees (
    id serial PRIMARY KEY,
    name text NOT NULL, 
    birthday date NOT NULL,
    salary integer NOT NULL
)