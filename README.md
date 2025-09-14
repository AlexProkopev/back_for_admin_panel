# 🍽️ Restaurant Admin Panel — Backend API

[![Status](https://img.shields.io/badge/status-active-brightgreen?style=flat-square)](https://github.com/AlexProkopev)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat-square)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=flat-square)](https://mongodb.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)



---

## 🔧 About the Project

This is the **backend API** for a restaurant admin panel.  
It allows administrators and staff (admins, chefs, waiters) to manage orders, menus, reservations, and users — all with secure role-based access.

The backend is built with **Node.js**, **Express**, and **MongoDB**, and follows REST principles with clear structure and scalable architecture.

---

## 🚀 Key Features

- 🔐 **JWT Authentication** with role-based access (admin, chef, waiter)
- 📦 **Order Management** with CRUD and status tracking
- 📅 **Table Reservations** (create, view, manage bookings)
- 🍽️ **Menu Control** (add/remove/edit dishes & categories)
- 👥 **User & Role Management** for staff operations
- ✅ **Validation & Error Handling** with express-validator
- 📡 **RESTful JSON API** with status codes and auth headers

---

## 🛠 Tech Stack

<div align="center">
  <img src="https://cdn.simpleicons.org/node.js/339933" width="30" height="30" alt="Node.js" />
  <img src="https://cdn.simpleicons.org/express/000000" width="30" height="30" alt="Express.js" />
  <img src="https://cdn.simpleicons.org/mongodb/47A248" width="30" height="30" alt="MongoDB" />
  <img src="https://cdn.simpleicons.org/javascript/F7DF1E" width="30" height="30" alt="JavaScript" />
  <img src="https://cdn.simpleicons.org/json/000000" width="30" height="30" alt="JSON" />
  <img src="https://cdn.simpleicons.org/git/F05032" width="30" height="30" alt="Git" />
</div>

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Security:** JWT, bcrypt, helmet, cors  
- **Tools:** dotenv, express-validator, morgan

---

# Project Overview: Restaurant Admin Panel Backend

## 1. Project Purpose

This project is the backend API for a restaurant administration panel. It provides RESTful endpoints to manage all core restaurant operations, including dishes, ingredients, table bookings, staff, guests, and internal statistics. The system is designed to be used by different staff roles (admin, chef) with specific permissions for each role.

## 2. Technology Stack

- **Backend Framework:** Node.js / Express.js
- **Database:** MongoDB with Mongoose for data modeling (ODM).
- **Authentication:** JSON Web Tokens (JWT) for securing API endpoints. Passwords are encrypted using `bcryptjs`.
- **File Uploads:** `multer` is used for handling multipart/form-data, and `cloudinary` is used for cloud-based image storage.
- **Middleware:** `cors` for enabling cross-origin requests and `express-validator` (inferred from `README.md`) for input validation.
- **Environment:** `dotenv` is used for managing environment variables.

## 3. Architecture

The application employs a layered architecture that promotes separation of concerns and modularity.

- **`routes/`**: Defines all API endpoints. Each route file maps HTTP methods to controller functions and applies necessary middleware for authentication and authorization.
- **`controllers/`**: Handles the request and response cycle. It receives requests from the routes, calls the relevant service to execute business logic, and formats the final HTTP response. Controllers are kept lean and do not contain business or database logic.
- **`services/`**: Contains the core business logic of the application. Services are responsible for data processing, interacting with the database via models, and handling external API calls (e.g., Cloudinary).
- **`models/`**: Defines the Mongoose schemas for all database collections (e.g., `Dish`, `Booking`, `Staff`). This layer is responsible for the data structure and validation at the database level.
- **`middleware/`**: Contains functions that intercept incoming requests to perform tasks like JWT verification (`auth.js`), role checking (`checkRole.js`), and file upload processing (`multer.js`).

The overall data flow for a typical request is:
`Route -> Middleware (Auth/Role Check) -> Controller -> Service -> Model -> Database`

## 4. Key Logical Modules

The project is organized into the following key functional modules, based on the file structure:

- **Authentication (`authController.js`, `authRoutes.js`)**
  - **Responsibility:** Handles user registration and login. Generates JWT tokens upon successful authentication.

- **Dish Management (`dishController.js`, `dishService.js`, `dish.js`)**
  - **Responsibility:** Manages the restaurant's menu. Provides CRUD (Create, Read, Update, Delete) operations for dishes, including image uploads.

- **Ingredient Management (`ingredientController.js`, `ingredientService.js`, `ingredient.js`)**
  - **Responsibility:** Manages the ingredients used in dishes. Likely used for stock tracking and recipe composition.

- **Booking & Reservation Management (`bookingController.js`, `bookingService.js`, `booking.js`)**
  - **Responsibility:** Handles table reservations and bookings made by guests.

- **Staff Management (`staffController.js`, `staffService.js`, `staff.js`)**
  - **Responsibility:** Manages staff members, their roles, and permissions.

- **Guest Management (`guestController.js`, `guestService.js`, `guest.js`)**
  - **Responsibility:** Manages guest information, possibly linked to bookings or visits.

- **Stock Management (`stockController.js`, `stockService.js`, `stock.js`)**
  - **Responsibility:** Manages inventory and stock levels of ingredients or other supplies.

- **Visit Management (`visitController.js`, `visitService.js`, `visits.js`)**
  - **Responsibility:** Tracks customer visits, potentially linking guests to specific bookings.

- **Statistics (`statisticsController.js`, `statisticsService.js`)**
  - **Responsibility:** Aggregates data and provides analytical insights for the admin panel (e.g., popular dishes, booking frequency).



