import db from "../db";
import { Booking } from "../types/booking";

export const createBooking = async (booking: {
  user_id: number;
  slot_id: number;
  booking_date: string;
}): Promise<Booking> => {
  const result = await db.query(
    `INSERT INTO bookings (user_id, slot_id, booking_date)
     VALUES ($1, $2, $3) RETURNING *`,
    [booking.user_id, booking.slot_id, booking.booking_date]
  );

  return result.rows[0];
};

export const findBookingsByUserId = async (
  userId: number
): Promise<
  (Booking & { slot: { id: number; start_time: string; end_time: string } })[]
> => {
  const slotsResult = await db.query(`SELECT * FROM slots`);
  const slotsMap = new Map<
    number,
    { id: number; start_time: string; end_time: string }
  >();

  slotsResult.rows.forEach((slot) => {
    slotsMap.set(slot.id, slot);
  });

  const bookingsResult = await db.query(
    `SELECT * FROM bookings WHERE user_id = $1`,
    [userId]
  );

  const formattedData = bookingsResult.rows.map((b) => ({
    ...b,
    slot: slotsMap.get(b.slot_id),
  }));

  return formattedData;
};

export const findAllBookings = async (): Promise<Booking[]> => {
  const result = await db.query(`SELECT * FROM bookings`);
  return result.rows;
};

export const deleteBooking = async (id: number): Promise<void> => {
  await db.query(`DELETE FROM bookings WHERE id = $1`, [id]);
};
