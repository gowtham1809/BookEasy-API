import dayjs from "dayjs";
import db from "../db";
import { Slot } from "../types/slot";

export const getAvailableSlots = async (date: string): Promise<Slot[]> => {
  const slotsResult = await db.query(`SELECT * FROM slots`);
  const slots = slotsResult.rows;

  const formattedDate = new Date(date).toISOString().split("T")[0]; // '2025-09-28'
  const bookingsResult = await db.query(
    `SELECT slot_id FROM bookings WHERE booking_date::date = $1`,
    [formattedDate]
  );
  const timeIsInFuture = (start_time: string): boolean => {
    const today = dayjs();
    const slotDateTime = dayjs(`${today.format("YYYY-MM-DD")}T${start_time}`);
    return slotDateTime.isAfter(today);
  };
  const isToday = dayjs(date).isSame(dayjs(), "day");
  const bookedSlotIds = new Set(bookingsResult.rows.map((row) => row.slot_id));

  const result: Slot[] = slots.map((slot) => ({
    id: slot.id.toString(),
    start_time: slot.start_time,
    end_time: slot.end_time,
    seats: slot.seats.toString(),
    available:
      !bookedSlotIds.has(slot.id) &&
      (isToday ? timeIsInFuture(slot.start_time) : true),
  }));

  return result;
};
