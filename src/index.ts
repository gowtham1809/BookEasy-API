import dotenv from "dotenv";
import app from "./app";
import db from "./db";
// import { initDb } from "./iniDB";

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Test DB connection
    await db.query("SELECT NOW()");
      console.log("Connected to PostgreSQL");
      
    // await initDb();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
})();
