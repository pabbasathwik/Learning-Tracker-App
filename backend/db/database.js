import mssql from "mssql";

const config = {
  user: "sa",
  password: "jtindia@123",
  server: "172.16.28.23", 
  database: "LearningTrackerDB",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

let pool;

async function connectDB() {
  try {
    pool = await mssql.connect(config);
    console.log("✅ SQL Server connected");

    // Create tables if not exist
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
      CREATE TABLE users (
        id INT IDENTITY PRIMARY KEY,
        name NVARCHAR(100),
        email NVARCHAR(100) UNIQUE,
        password NVARCHAR(255)
      )
    `);

    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='learning' AND xtype='U')
      CREATE TABLE learning (
        id INT IDENTITY PRIMARY KEY,
        userId INT,
        date NVARCHAR(20),
        session NVARCHAR(20),
        topic NVARCHAR(100),
        description NVARCHAR(MAX),
        timeSpent FLOAT,
        createdAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);

  } catch (err) {
    console.error("❌ SQL Server connection failed:", err);
    process.exit(1);
  }
}

await connectDB();

export default mssql;
export { pool };


