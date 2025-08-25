# StudyNotion – Full‑Stack Learning Platform

A modern e‑learning platform where instructors create and publish courses, and students browse, enroll, learn via videos, track progress, leave reviews, and manage profiles. Built with React, Tailwind CSS, Redux Toolkit, Node.js/Express, MongoDB, and integrations like Cloudinary, Razorpay, and Nodemailer.

## ✨ Features

- Student
  - Auth: Signup, Login, Email verification, Password reset/update
  - Browse catalog/categories and course details
  - Secure payments and instant enrollment
  - In‑player video learning with progress tracking
  - Ratings and reviews
  - Manage profile and settings
- Instructor
  - Create courses with sections and subsections (videos)
  - Upload thumbnails/videos (Cloudinary)
  - Publish/Draft workflows
  - See enrolled students and analytics (charts)
- Platform
  - Responsive UI (mobile-friendly)
  - Email notifications (signup, enrollment, password updates)
  - Contact form and admin inbox

## 🧱 Tech Stack

- Frontend: React 18, React Router, Redux Toolkit, Tailwind CSS, Axios, Swiper, Chart.js
- Backend: Node.js, Express, Mongoose (MongoDB)
- Auth/Security: JWT, bcrypt
- Media/Infra: Cloudinary, express-fileupload
- Payments: Razorpay
- Mail: Nodemailer
- Tooling: react-scripts, concurrently, nodemon

## 📦 Monorepo Structure

```
StudyNotion/
  ├─ src/                  # React app (components, pages, slices, services)
  ├─ SERVER/               # Express server (routes, controllers, models)
  ├─ public/               # Static assets
  ├─ package.json          # Client + dev scripts
  └─ SERVER/package.json   # Server scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16 and npm
- MongoDB connection string
- Cloudinary account (cloud name, API key/secret)
- Razorpay keys (for payments; optional if you skip payments locally)
- Mail transport (e.g., SMTP creds for Nodemailer)

### 1) Clone
```bash
git clone <your-repo-url>
cd StudyNotion
```

### 2) Install dependencies
- Root (client):
```bash
npm install
```
- Server:
```bash
cd SERVER
npm install
cd ..
```

### 3) Environment variables
Create a `.env` file in `SERVER/` with values like:
```
PORT=4000
MONGODB_URL=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>

CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>

RAZORPAY_KEY_ID=<key_id>
RAZORPAY_KEY_SECRET=<key_secret>

MAIL_HOST=<smtp_host>
MAIL_PORT=<smtp_port>
MAIL_USER=<smtp_user>
MAIL_PASS=<smtp_pass>
CLIENT_URL=http://localhost:3000
```
Optionally, create a `.env` in the client root if you externalize API base URLs:
```
VITE_SERVER_URL=http://localhost:4000
```

### 4) Run locally
- Run client + server concurrently from the root:
```bash
npm run dev
```
- Or run individually:
```bash
# client (root)
npm start
# server
cd SERVER
npm run dev
```
App: http://localhost:3000 • API: http://localhost:4000

## 🧭 Useful Scripts
Root `package.json`:
- `npm start` – start React dev server
- `npm run build` – production build of client
- `npm run dev` – run client and server concurrently

SERVER `package.json`:
- `npm run dev` – start Express with nodemon
- `npm start` – start Express with Node

## 🗂️ Notable Directories

- Frontend (`src/`)
  - `components/common` – Navbar, Footer, Buttons, Modals, etc.
  - `components/core` – Auth, Dashboard, Catalog, Course, HomePage, ViewCourse
  - `pages` – Route pages (Home, Catalog, CourseDetails, Dashboard, etc.)
  - `services` – API client (`apiconnector.js`), operations (auth, profile, courses, payments)
  - `slices` – Redux slices (auth, profile, cart, courses, viewCourse)
  - `utils` – helpers (avg rating, constants, formatters)
- Backend (`SERVER/`)
  - `routes` – Express routes (Auth, Profile, Course, Payments, Contact)
  - `controllers` – Request handlers
  - `models` – Mongoose models (User, Course, Section, SubSection, Rating, etc.)
  - `config` – DB, Cloudinary, Razorpay config
  - `utils` – Mail sender, image uploader, helpers
  - `mail/templates` – Email templates

## 🔐 Authentication Flow (high level)
- JWT-based auth stored in cookies, protected routes via middleware
- Email verification and password reset handled via tokenized emails

## 💳 Payments (Razorpay)
- Order creation on backend -> client checkout -> webhook/verification -> enrollment + email

## 📨 Email
- Nodemailer sends transactional emails: verification, password updates, enrollment confirmations

## 🧪 QA Notes
- Ensure `.env` is configured before running the server
- If you see CORS issues, verify `CLIENT_URL` and the allowed origins in `SERVER/index.js`
- For video playback in `ViewCourse`, confirm Cloudinary URLs are valid

## 🤝 Contributing
1. Fork the repo and create a feature branch
2. Commit with conventional messages
3. Open a Pull Request with a clear description and screenshots if UI

## 📄 License
This project is open‑source under the MIT License.

---

Built with care for learners and instructors. If you like it, consider starring the repo and sharing feedback!