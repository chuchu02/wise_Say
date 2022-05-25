// app.js
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const pool = mysql.createPool({
  host: "localhost",
  user: "kims",
  password: "kim123414",
  database: "a10",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "https://cdpn.io",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const port = 3001;

//단건조회 시작
app.get("/wiseSayings/:id", async (req, res) => {
  //const id = req.params.id;
  const { id } = req.params;

  const [rows] = await pool.query(
    `
    SELECT *
    FROM wiseSaying
    WHERE id = ?
    `,
    [id]
  );

  if (rows.length == 0) {
    res.status(404).json({
      msg: "not found",
    });
    return;
  }

  res.json(rows[0]);
});

app.get("/wiseSayings", async (req, res) => {
  const [[rows]] = await pool.query(
    "SELECT * FROM wiseSaying ORDER BY RAND() LIMIT 1"
  );

  await pool.query(
    `UPDATE wiseSaying
    SET hit = hit + 1
    WHERE id = ?`,
    [rows.id]
  );

  rows.hit++;

  res.json([rows]);
});

app.listen(port);
