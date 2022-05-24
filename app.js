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

const port = 3000;

// 생성 시작
app.post("/todos/:id", async (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;

  const [rows] = await pool.query(
    `
  SELECT * 
  FROM todo 
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

  const { reg_date, is_completed, perform_date, content } = req.body;
  if (!reg_date) {
    res.status(400).json({
      msg: "reg_date required",
    });
    return;
  }
  if (!perform_date) {
    res.status(400).json({
      msg: "perfom_date required",
    });
    return;
  }
  if (!content) {
    res.status(400).json({
      msg: "content required",
    });
    return;
  }

  const [rs] = await pool.query(
    `
  INSERT INTO todo
  SET reg_date = ?,
  perform_date = ?,
  is_completed = ?,
  content = ?
  `,
    [reg_date, perform_date, is_completed, content]
  );

  res.status(201).json({
    id: rs.insertId,
  });
});
// 생성 끝

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
  const [rows] = await pool.query(
    "SELECT * FROM wiseSaying ORDER BY RAND() LIMIT 1"
  );

  res.json(rows);
});

app.listen(port);
