import db from "./db";

export const initDb = async () => {
  const client = await db.connect(); // ✅ PoolClient
  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS slots (
        id SERIAL PRIMARY KEY,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        seats INT NOT NULL
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        slot_id INT REFERENCES slots(id) ON DELETE CASCADE,
        booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (slot_id, booking_date)
      )
    `);

    await client.query("COMMIT");
    console.log("✅ Database initialized successfully");
  } catch (err: any) {
    await client.query("ROLLBACK");
    console.error("❌ Database initialization failed:", err.message);
  } finally {
    client.release(); // ✅ PoolClient has release()
  }
};
