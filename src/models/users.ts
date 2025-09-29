import db from "../db";
import { User } from "../types/user";
import bcrypt from "bcrypt";

export const createUser = async (
  user: Omit<User, "id" | "createdAt">
): Promise<User> => {
  const { name, email, password } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

export const resetPassword = async (
  user: Partial<Omit<User, "id" | "createdAt">>
): Promise<User | null> => {
  const result = await db.query(
    `UPDATE users SET password = $1 WHERE email = $2 RETURNING *`,
    [user.password, user.email]
  );
  return result.rows[0] || null;
};

export const findAllUsers = async (): Promise<User[]> => {
  const result = await db.query(`SELECT * FROM users`);
  return result.rows;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0] || null;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const result = await db.query(
    `SELECT id,name,email FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

export const deleteUser = async (id: string): Promise<void> => {
  await db.query(`DELETE FROM users WHERE id = $1`, [id]);
};
