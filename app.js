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
app.post("/wiseSayings/:id", async (req, res) => {
  // const id = req.params.id;
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

  const { reg_date, content, author } = req.body;
  if (!reg_date) {
    res.status(400).json({
      msg: "reg_date required",
    });
    return;
  }
  if (!content) {
    res.status(400).json({
      msg: "content required",
    });
    return;
  }
  if (!author) {
    res.status(400).json({
      msg: "author required",
    });
    return;
  }
  const [rs] = await pool.query(
    `
  INSERT INTO wiseSaying
  SET reg_date = ?,
  content = ?,
  author = ?
  `,
    [reg_date, content, author]
  );

  res.status(201).json({
    id: rs.insertId,
  });
});
// 생성 끝

// 삭제 시작
app.delete("/wiseSayings/:id", async (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;

  const [rows] = await pool.query(
    `
  SELECT * 
  FROM wiseSaying 
  WHERE id =?
  `,
    [id]
  );

  if (rows.length == 0) {
    res.status(404).json({
      msg: "not found",
    });
    return;
  }

  const [rs] = await pool.query(
    `
  DELETE FROM wiseSaying
  WHERE id = ?
  `,
    [id]
  );

  res.json({
    msg: `${id}번 할일이 삭제되었습니다.`,
  });
});
// 삭제 끝

//  수정 시작
app.patch("/wiseSayings/:id", async (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;

  const [rows] = await pool.query(
    `
  SELECT * 
  FROM wiseSaying 
  WHERE id =?
  `,
    [id]
  );

  if (rows.length == 0) {
    res.status(404).json({
      msg: "not found",
    });
    return;
  }

  const { reg_date, content, author } = req.body;

  if (!reg_date) {
    res.status(400).json({
      msg: "reg_date required",
    });
    return;
  }
  if (!content) {
    res.status(400).json({
      msg: "content required",
    });
    return;
  }
  if (!author) {
    res.status(400).json({
      msg: "author required",
    });
    return;
  }
  const [rs] = await pool.query(
    `
  UPDATE wiseSaying 
  SET reg_date = ?,
  content = ?, 
  author = ?,  
  WHERE id =?
  `,
    [reg_date, content, author, id]
  );

  res.json({
    msg: `${id}번 할일이 수정되었습니다.`,
  });
});
// 수정 끝

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

app.get("/wiseSayingsd", async (req, res) => {
  const [[row]] = await pool.query(
    "SELECT * FROM wiseSaying ORDER BY RAND() LIMIT 1"
  );

  await pool.query(
    `UPDATE wise_saying
    SET hit = hit + 1
    WHERE id = ?`,
    [row.id]
  );

  row.hit++;

  res.json(row);
});

app.listen(port);
