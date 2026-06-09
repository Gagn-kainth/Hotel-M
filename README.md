# 🏨 Hotel M — REST API

A backend REST API for hotel management built with **Node.js**, **Express**, and **MongoDB Atlas**. Manage hotel staff and menu items through a clean, organized API with **JWT-based authentication**.

---

## 🚀 Live Demo

**Base URL:** `https://hotel-m-ospf.onrender.com`

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) + bcrypt password hashing
- **Deployment:** Render.com
- **Environment:** dotenv

---

## 📁 Project Structure

```
Hotel M/
├── controllers/
│   ├── menu.js         # Menu business logic
│   └── person.js       # Person business logic
├── middleware/
│   ├── auth.js         # Passport.js local strategy
│   └── jwt.js          # JWT generation & auth middleware
├── models/
│   ├── Menu.js         # Menu Mongoose schema
│   └── person.js       # Person Mongoose schema (with bcrypt)
├── routes/
│   ├── menu.js         # Menu route definitions
│   └── person.js       # Person route definitions
├── db.js               # MongoDB connection
├── server.js           # Entry point
├── .env                # Environment variables (not committed)
├── .env.example        # Environment variable template
├── .gitignore
└── package.json
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hotel-m.git
cd hotel-m
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
mongoURL=mongodb+srv://<username>:<password>@cluster.mongodb.net/Hotel_M?retryWrites=true&w=majority
port=3000
JWT_SECRET=your_super_secret_key
```

### 4. Run the server

```bash
node server.js
```

Or with auto-restart using nodemon:

```bash
npx nodemon server.js
```

Server will start at `http://localhost:3000`

---

## 🔐 Authentication

This API uses **JWT (JSON Web Token)** authentication.

### How it works

1. Register via `POST /person/signup` or login via `POST /person/login`
2. Both return a `token` in the response
3. For protected routes, include the token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

### Passwords

Passwords are automatically **hashed with bcrypt** before saving — plain text passwords are never stored in the database.

---

## 📌 API Endpoints

### 👤 Person Routes — `/person`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| `POST` | `/person/signup` | ❌ | Register a new staff member |
| `POST` | `/person/login` | ❌ | Login and receive a JWT token |
| `GET` | `/person/profile` | ✅ | Get logged-in user's profile |
| `GET` | `/person/all` | ✅ | Get all staff members |
| `GET` | `/person/:workType` | ✅ | Get staff by work type |
| `PUT` | `/person/:id` | ❌ | Update staff member by ID |
| `DELETE` | `/person/:id` | ❌ | Delete staff member by ID |

#### Valid Work Types

`chef`, `waiter`, `manager`, `receptionist`

---

#### Example — Signup

```json
POST /person/signup
{
  "name": "John Doe",
  "age": 30,
  "work": "chef",
  "mobile": "9876543210",
  "email": "john@example.com",
  "address": "123 Main St",
  "salary": 50000,
  "username": "johndoe",
  "password": "secret123"
}
```

Response:
```json
{
  "token": "<jwt_token>",
  "message": "Person added successfully",
  "person": { ... }
}
```

---

#### Example — Login

```json
POST /person/login
{
  "username": "johndoe",
  "password": "secret123"
}
```

Response:
```json
{
  "token": "<jwt_token>"
}
```

---

#### Example — Get Profile (Protected)

```
GET /person/profile
Authorization: Bearer <jwt_token>
```

Response:
```json
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "username": "johndoe",
    "work": "chef",
    ...
  }
}
```

---

### 🍽️ Menu Routes — `/menu`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/menu/` | Get all menu items |
| `GET` | `/menu/:tasteType` | Get menu items by taste |
| `POST` | `/menu/` | Add a new menu item |
| `PUT` | `/menu/:id` | Update menu item by ID |
| `DELETE` | `/menu/:id` | Delete menu item by ID |

#### Valid Taste Types

`sweet`, `salty`, `spicy`, `bitter`, `sour`

#### Example — Add Menu Item

```json
POST /menu/
{
  "name": "Paneer Tikka",
  "price": 250,
  "taste": "spicy",
  "isdrink": false,
  "ingredients": ["paneer", "spices", "capsicum"],
  "num_orders": 0
}
```

---

## 🌐 Deployment (Render)

1. Push your code to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set the build command: `npm install`
4. Set the start command: `node server.js`
5. Add environment variables in Render Dashboard → Environment:
   - `mongoURL`
   - `JWT_SECRET`
6. In MongoDB Atlas → **Network Access** → allow `0.0.0.0/0`