import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(cors());

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`server is running in PORT ${PORT}`);
});

//need to set uo database pool using the connection string from the .env file

const dbConnectionString = process.env.DATABASE_URL;

export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

//need to set up a root route
app.get("/", (request, response) => {
  response.json({ message: "my root route" });
});

app.post("/add-data", function (request, response) {
  const bodyData = request.body;
  console.log(bodyData);
  response.json({
    message: "Body data received",
  });
  db.query(
    `INSERT INTO form (full_name, nights_of_stay, room_type, satisfaction_of_stay,  improvement) VALUES($1, $2, $3, $4, $5)`,
    [
      `${bodyData.formValues.fullName}`,
      `${bodyData.formValues.nightsOfStay}`,
      `${bodyData.formValues.roomType}`,
      `${bodyData.formValues.satisfaction}`,
      `${bodyData.formValues.improvement}`,
    ]
  );
});

//need 2 routes minimum
//need a route to READ the database data

app.get("/readData", async (request, response) => {
  const query = await db.query(`SELECT * FROM form`);
  response.json(query.rows);
  console.log(query);
});
