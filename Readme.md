# 📸 Stuart Photography – Full Stack Booking Platform

## 🚀 Live Demo

* 🌐 Frontend: https://frontend-fsd-nu.vercel.app
* ⚙️ Backend: https://backendfsd.onrender.com

---

## 📌 Project Overview

Stuart Photography is a full-stack web application that allows users to book photography services, make payments, and manage bookings. It also includes an admin dashboard for managing bookings and services.

This project demonstrates end-to-end full stack development using the MERN stack.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

### Other Integrations

* Razorpay (Payment Gateway)
* React Toastify (Notifications)

---

## 🔑 Features

### 👤 User Features

* User Registration & Login (JWT Authentication)
* Browse photography services
* Book a shoot
* Make secure payments via Razorpay
* View and manage bookings
* Cancel bookings

---

### 🛠️ Admin Features

* Admin Login
* Dashboard overview
* Manage all bookings
* Approve / Reject bookings
* Manage services

---

## 💳 Payment Integration

* Integrated Razorpay payment gateway
* Secure order creation and payment handling
* Payment status updates stored in database

---

## ⚠️ Notes

* Email notification feature is implemented but may be limited due to SMTP restrictions on free hosting services.
* Some UI updates may require refresh due to deployment latency (Render cold start).

---

## 📂 Project Structure

```
frontend/
  ├── components/
  ├── pages/
  ├── App.jsx

backend/
  ├── controllers/
  ├── routes/
  ├── models/
  ├── server.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone <your-repo-link>
```

### 2️⃣ Install Dependencies

```
cd frontend
npm install

cd ../backend
npm install
```

### 3️⃣ Environment Variables

Create `.env` in backend:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
```

---

### 4️⃣ Run Application

Frontend:

```
npm run dev
```

Backend:

```
npm run server
```

---

## 📈 Future Improvements

* Real-time UI updates (WebSockets)
* Email service migration (Brevo / SendGrid)
* Image upload & gallery management
* Performance optimizations

---

## 🙌 Conclusion

This project showcases the implementation of a complete full-stack application with authentication, API integration, payment processing, and admin management.

---

## 👨‍💻 Author

**Ananth Raj**
Aspiring Full Stack Developer 🚀
