# 📝 React Blog with Appwrite

A full‑featured blog platform built with **React**, **Appwrite**, and **Tailwind CSS**.  
Includes authentication, blog management, rich text editing, image uploads, dark mode, protected routes, and document‑level permissions – all working on **Appwrite free tier**.

---

## ✨ Features

- 🔐 User Authentication (Signup / Login / Logout)
- 📝 Create, Edit, and Delete Blog Posts (only author can edit/delete)
- 🖼️ Featured Image Upload (Appwrite Storage)
- ✍️ Rich Text Editor (TinyMCE with free GPL license)
- 🌓 Dark / Light Mode (persists in localStorage)
- 🔒 Protected Routes – guests are redirected to login
- 📅 Automatic post creation & update dates
- ⚡ Redux Toolkit for auth state
- 🌐 SEO‑friendly slug generation
- 📱 Fully responsive (mobile‑first design)
- ✅ Form validation with React Hook Form
- 🚨 Error handling & loading skeletons

---

## 🛠️ Tech Stack

| Category       | Technology                         |
|----------------|------------------------------------|
| Frontend       | React 18 + Vite                    |
| Routing        | React Router DOM v6                |
| State          | Redux Toolkit                      |
| Styling        | Tailwind CSS v4 + `@tailwindcss/vite` |
| Backend (BaaS) | Appwrite (free tier)               |
| Forms          | React Hook Form                    |
| Editor         | TinyMCE (self‑hosted / GPL)        |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Appwrite account (free tier works)

Create a free Appwrite project at [cloud.appwrite.io](https://cloud.appwrite.io).

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Siddhugo/react-blog-appwrite.git
cd react-blog-appwrite
2️⃣ Install Dependencies
bash
npm install
3️⃣ Environment Variables
Create a .env file in the root directory:

env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
Never commit .env – add it to .gitignore.

4️⃣ Run Development Server
bash
npm run dev
Open: http://localhost:5173

🗄️ Appwrite Backend Setup
Database Collection: posts
Attribute	Type	Required
title	string	Yes
slug	string	Yes
content	string	Yes
featuredImage	string	No
status	string	Yes
userId	string	Yes
Storage Bucket
Create a bucket for blog images.
Recommended collection‑level permissions:

Read: users (only logged‑in users) – document permissions override

Write: users

Update: (leave empty)

Delete: (leave empty)

Document‑level permissions are set in the code so that only the author can update/delete their own posts.

Authentication Settings
Add your frontend URL (e.g., http://localhost:5173) to:

text
Auth → Settings → Allowed Hosts
🧪 Testing the App
After setup, test these flows:

Sign up / Login

Create a post (with image)

Edit the post (only author can)

Delete the post

Log out – you’ll be redirected to login

Toggle dark mode – the UI adapts

Creation / update dates appear on post cards and single post view

📌 Key Improvements Over Base Tutorial
The original tutorial code was extended and fixed to be fully production‑ready:

Issue	Fix
Any logged‑in user could edit/delete any post	Document‑level permissions using Permission.read("users"), Permission.update("user:ID"), Permission.delete("user:ID")
Guests could see posts	Redirect to login in Home.jsx with Navigate
Update post failed (401 Unauthorized)	Re‑apply permissions in updatePost with valid strings
Dark mode missing	ThemeProvider context, Tailwind v4 @custom-variant dark
No creation/update dates	Display $createdAt and $updatedAt with formatDate helper
TinyMCE “paid” warning	Added license_key: "gpl" and promotion: false
Image preview memory leak	Cleanup URL.revokeObjectURL in useEffect
🚢 Deployment
Vercel (recommended)
Push code to GitHub.

Import repo to vercel.com.

Set Framework Preset to Vite.

Add environment variables (same as .env).

Deploy.

Netlify
Push to GitHub.

Import to netlify.com.

Build command: npm run build, Publish directory: dist.

Add environment variables.

Deploy.

Important: The app relies on dark class on <html> – the ThemeProvider handles it, no extra config needed.

🤝 Contributing
Issues and pull requests are welcome.
Please follow the existing code style.

👨‍💻 Author
Siddhartha Das Goswami

GitHub: @Siddhugo

LinkedIn: linkedin.com/in/siddhartha-dasgoswami-218875320

🙏 Acknowledgements
Inspired by the React + Appwrite course by
Hitesh Choudhary (Chai aur Code).

Additional fixes and features were implemented to make the app production‑ready and fully compatible with Appwrite’s free tier.

⭐ Support
If this project helped you, give it a star on GitHub ⭐

Happy coding! 🚀
