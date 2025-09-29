# EasyBooking-API Documentation

## Overview

EasyBooking-API is a Node.js RESTful API for managing slot bookings. It is built with TypeScript and follows a modular architecture, making it easy to maintain and extend. The API handles user authentication, booking management, slot management, and user operations.

---

## Project Structure

```
EasyBooking-API/
├── src/
│   ├── app.ts
│   ├── db.ts
│   ├── index.ts
│   ├── iniDB.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── bookingController.ts
│   │   ├── slotsController.ts
│   │   └── userController.ts
│   ├── helper/
│   │   └── appError.ts
│   ├── middlewares/
│   │   └── authMiddleware.ts
│   ├── models/
│   │   ├── bookings.ts
│   │   ├── slots.ts
│   │   └── users.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── bookingsRoutes.ts
│   │   ├── index.ts
│   │   ├── slotsRoutes.ts
│   │   └── usersRoutes.ts
│   ├── types/
│   │   ├── booking.ts
│   │   ├── slot.ts
│   │   ├── TRequest.ts
│   │   └── user.ts
│   └── utils/
├── package.json
├── tsconfig.json
```

---

## Controllers

Controllers handle the main business logic for each feature. Each controller corresponds to a domain (auth, booking, slots, user).

### 1. `authController.ts`

Handles user authentication:

- **register**: Registers a new user.
- **login**: Authenticates a user and returns a token.
- **logout**: Logs out the user.
- **reset**: Reset the password to the user.
- **getProfile**: Returns the authenticated user's profile.

### 2. `bookingController.ts`

Manages bookings:

- **createBooking**: Allows a user to book a slot.
- **getBookings**: Retrieves all bookings for a user or admin.
- **getBookingById**: Fetches details of a specific booking.
- **cancelBooking**: Cancels a booking.

### 3. `slotsController.ts`

Handles slot management:

- **createSlot**: Admin creates a new slot for booking.
- **getSlots**: Lists all available slots.

### 4. `userController.ts`

Manages user operations:

- **getUsers**: Lists all users (admin only).

---

## Helper Classes

### `appError.ts`

A custom error class for handling application errors. It standardizes error responses and makes error handling consistent across the API.

---

## Middlewares

### `authMiddleware.ts`

Protects routes by verifying authentication tokens. Ensures only authorized users can access certain endpoints (e.g., booking, slot creation, user management).

---

## Models

Models define the data structure and interact with the database.

- **users.ts**: User schema and database operations.
- **bookings.ts**: Booking schema and database operations.
- **slots.ts**: Slot schema and database operations.

---

## Routes

Routes map HTTP requests to controller functions.

- **authRoutes.ts**: `/auth` endpoints (register, login, profile).
- **bookingsRoutes.ts**: `/bookings` endpoints (create, list, update, cancel).
- **slotsRoutes.ts**: `/slots` endpoints (create, list, update, delete).
- **usersRoutes.ts**: `/users` endpoints (list, update, delete).
- **index.ts**: Combines all route modules and exports them to the main app.

---

## Types

Defines TypeScript interfaces for strong typing.

- **user.ts**: User type definition.
- **booking.ts**: Booking type definition.
- **slot.ts**: Slot type definition.
- **TRequest.ts**: Custom request type for Express.

---

## How Requests Are Handled

1. **Request comes in** via a route (e.g., `/auth/login`).
2. **Middleware** (e.g., `authMiddleware`) checks authentication if required.
3. **Controller** processes the request, interacts with models, and returns a response.
4. **Helper classes** (e.g., `appError`) handle errors and format responses.

---

## Example Flow: Booking a Slot

1. User sends a POST request to `/bookings` with slot and user info.
2. `authMiddleware` verifies the user's token.
3. `bookingController.createBooking` validates the request and creates a booking in the database.
4. Response is sent back to the user.

---

## Getting Started

1. Install dependencies: `npm install`
2. Configure environment variables (DB connection, JWT secret, etc.)
3. Start the server: `npm start` or `ts-node src/index.ts`

---

## Summary

EasyBooking-API is designed for clarity and modularity. Each part of the codebase has a clear responsibility, making it easy for developers and non-developers to understand how bus booking operations are handled end-to-end.

For further details, refer to the code in each file and follow the flow described above.
