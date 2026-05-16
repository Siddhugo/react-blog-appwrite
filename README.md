# 📝 React Blog with Appwrite

A full-featured blog platform built with **React**, **Appwrite**, and **Tailwind CSS**. Includes authentication, post management, rich text editing, and image uploads.

🔗 **Live Demo**: [https://your-demo-link.vercel.app](https://your-demo-link.vercel.app)

---

## ✨ Features

- 🔐 **Authentication** – Signup, login, logout (Appwrite Auth)
- 📝 **Create / Edit / Delete Posts** – Only the author can modify their own posts
- 🖼️ **Image Upload** – Featured images stored in Appwrite Storage
- 📝 **Rich Text Editor** – Self‑hosted TinyMCE (no API key required)
- 🎨 **Responsive UI** – Tailwind CSS, mobile-first design
- ⚡ **State Management** – Redux Toolkit
- 🔒 **Protected Routes** – Based on authentication status
- 🌐 **SEO Friendly URLs** – Slugs generated from post titles

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 18 + Vite |
| Routing | React Router DOM v6 |
| State | Redux Toolkit |
| Styling | Tailwind CSS |
| Backend (BaaS) | Appwrite (Auth, Database, Storage) |
| Forms | React Hook Form |
| Editor | TinyMCE (self-hosted) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- An [Appwrite](https://cloud.appwrite.io) account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-blog-appwrite.git
   cd react-blog-appwrite