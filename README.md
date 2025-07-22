# 🏛️ LegalEase - Bridging the Legal Knowledge Gap

**LegalEase** is a full-stack web platform that aims to simplify access to Indian laws, including IPC sections and regulations related to property, education, labor, health, crime, and cyber law. Built with the **MERN stack**, the platform enables users to explore legal topics, authenticate securely, and interact with an AI-powered legal chatbot.

---

## 🚀 Features

### 🔐 Authentication
- User registration with email verification via **OTP** using **Nodemailer**
- Login with **JWT** token generation
- Protected routes for authenticated access

### ⚖️ Legal Explorer
- Categories: Property Law, Education Law, Labor Law, Health Law, Crime Law, Cyber Law
- Dynamic search bar with auto-suggestions
- Clickable suggestions that load details in the `LawDescriptionPage`
- Scrollable law descriptions without breaking layout

### 🧠 Tech Stack

| Layer         | Technology                        |
|---------------|------------------------------------|
| Frontend      | React.js, Tailwind CSS / CSS3      |
| Backend       | Node.js, Express.js                |
| Database      | MongoDB Atlas                      |
| Authentication| JWT, Nodemailer (OTP)              |
| Deployment    | (To be added: Vercel / Render) |
