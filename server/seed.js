//add the SQL queries to create the table and dummy data

import { db } from "./server.js";

db.query(`CREATE TABLE IF NOT EXISTS form (
    id SERIAL PRIMARY KEY,
    full_name TEXT,
    nights_of_stay DATE,
    room_type TEXT,
    satisfaction VARCHAR(100),
    improvement VARCHAR(150)
);`);

//to create the table on supabase fill out the above with the correct details^^ and then push 'node seed.js' itll auto create table for you
