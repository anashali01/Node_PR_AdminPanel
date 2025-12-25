# Node PR Admin Panel

A lightweight Admin Panel for managing products, categories, subcategories, extra categories and users. Built with Node.js, Express, EJS templates and MongoDB — suitable as a backend admin interface for small e-commerce or inventory projects.

## Quick Overview

- **Purpose:** Administer products and categories, manage users, and provide authentication (login, signup, reset password).
- **Stack:** Node.js, Express, EJS, MongoDB (Mongoose), session-based auth
- **Views:** Server-rendered EJS pages located in the `views/` folder

## Key Features

- Admin authentication (login, signup, change/reset password)
- Create / Read / Update / Delete for products, categories, subcategories and extra categories
- File uploads for product images
- Flash messages and middleware for access control (`isAdmin`) and image handling
- Simple, responsive UI assets included under `public/`

## Repo Structure (important files)

- `index.js` — application entry point
- `package.json` — project dependencies and scripts
- `config/` — `db.js`, `dotenv.js` configuration helpers
- `controllers/` — route handlers for admin, auth, product, category, etc.
- `routers/` — route definitions, grouped by feature
- `models/` — Mongoose schemas for Product, Category, Subcategory, User, ExtraCategory
- `middleware/` — custom middleware such as `isAdmin`, `userAuth`, `image` and `flashMsg`
- `public/` — static assets (CSS, JS, images)
- `views/` — EJS templates and partials used by server-rendered pages

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

## Installation

1. Clone the repository

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the project root with values like:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/adminpanel
SESSION_SECRET=your_session_secret
EMAIL_HOST=smtp.example.com
EMAIL_USER=you@example.com
EMAIL_PASS=your_email_password
```

Adjust variable names to match what your `config/dotenv.js` expects.

## Database

- The app uses MongoDB via Mongoose. Point `MONGO_URI` at your database (local or Atlas).
- If you need seed data, add a small script or insert records manually via MongoDB Compass.

## Running the App

Start in development:
https://node-pr-admin-panel.vercel.app/login

```bash
npm start
```

Open http://localhost:3000 (or the port you set) to view the app.

## Common Tasks

- Add a product: Admin > Products > Add Product
- Manage categories: Admin > Categories > Add / Edit / Delete
- Reset password flow: available from the Login page

## Environment & Configuration Notes

- File uploads are saved to `uploads/` — ensure this folder exists and is writable.
- Static assets are served from `public/`.
- Sessions and authentication are configured in `index.js` and middleware files — review these for session store or security adjustments when deploying.

## Contributing

- Fork the repo, create a feature branch, and open a pull request with a clear description of changes.
- Keep changes focused and add tests or instructions if you modify behavior.

## Troubleshooting

- If pages render blank or throw errors, check the server logs in the terminal for stack traces.
- Confirm `MONGO_URI` is correct and MongoDB is reachable.

## License

This project does not include a license file by default. Add a license (e.g., MIT) to make reuse explicit.

---

If you want, I can also:

- add a sample `.env.example` file
- create a short CONTRIBUTING.md
- add npm scripts for development (like `dev` using nodemon)

Would you like any of those added now?
## Admin Side
![alt text](public/assets/images/admin-side.png)
## Client Side
![alt text](public/assets/images/client-side.png)
## Login Page
![alt text](public/assets/images/login-page.png)
## New Password
![alt text](public/assets/images/newpassword.png)
## Otp Authentication
![alt text](public/assets/images/otp.png)