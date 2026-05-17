# 📝 React Blog with Appwrite

A full-featured blog platform built using **React**, **Appwrite**, and **Tailwind CSS**.  
This project includes authentication, blog management, rich text editing, image uploads, protected routes, and a fully responsive UI.

---

# ✨ Features

- 🔐 User Authentication (Signup / Login / Logout)
- 📝 Create, Edit, and Delete Blog Posts
- 🖼️ Featured Image Upload using Appwrite Storage
- ✍️ Rich Text Editor Integration (Self-hosted TinyMCE)
- 🔒 Protected Routes based on authentication status
- ⚡ Redux Toolkit State Management
- 🌐 SEO-Friendly Slug Generation
- 📱 Fully Responsive Mobile-First Design
- ✅ Form Validation using React Hook Form
- 🚨 Error Handling and Loading Skeletons

---

# 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Routing | React Router DOM v6 |
| State Management | Redux Toolkit |
| Styling | Tailwind CSS |
| Backend (BaaS) | Appwrite |
| Forms | React Hook Form |
| Editor | TinyMCE (Self-hosted) |

---

# 🚀 Getting Started

## Prerequisites

- Node.js 18+
- npm
- Appwrite Account

Create a free Appwrite account:

[Appwrite Cloud](https://cloud.appwrite.io)

---

# 📦 Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Siddhugo/react-blog-appwrite.git
cd react-blog-appwrite
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

## 4️⃣ Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 🗄️ Appwrite Backend Setup

## Database Collection: `posts`

| Attribute | Type | Required |
|---|---|---|
| title | string | Yes |
| slug | string | Yes |
| content | string | Yes |
| featuredImage | string | No |
| status | string | Yes |
| userId | string | Yes |

---

## Storage Bucket

Create a storage bucket for blog images.

Recommended Permissions:

- Read → Users & Guests
- Write → Authenticated Users

---

## Authentication Settings

Add your frontend URL to:

```text
Auth → Settings → Allowed Hosts
```

---

# 📌 Additional Enhancements

Compared to the base tutorial implementation, the following improvements were added:

- Self-hosted TinyMCE integration
- Improved slug generation
- Better error handling
- Responsive UI improvements
- Loading skeletons

---

# 🙏 Acknowledgements

This project was inspired by the React + Appwrite course by  
[Hitesh Choudhary (Chai aur Code)](https://www.youtube.com/watch?v=IdlF1zsUN3M).

Additional features and improvements were implemented independently for enhanced usability and production readiness.

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

# 👨‍💻 Author

## Siddhartha Das Goswami

- GitHub: [github.com/Siddhugo](https://github.com/Siddhugo)
- LinkedIn: [linkedin.com/in/siddhartha-dasgoswami-218875320](https://www.linkedin.com/in/siddhartha-dasgoswami-218875320/)

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

Happy Coding 🚀