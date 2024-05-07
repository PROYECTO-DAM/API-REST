const mysql = require("mysql2/promise");

async function createQuery(sql, params) {
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "dam",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  let connection;

  try {
    connection = await pool.getConnection();
    const [results] = await connection.query(sql, params);
    return results;
  } catch (err) {
    console.error("Error executing query:", err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {
  createQuery,
};
