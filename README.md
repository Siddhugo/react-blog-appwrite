# 📝 React Blog with Appwrite

A full-featured blog platform built with **React**, **Appwrite**, and **Tailwind CSS**.  
Includes authentication, post management, rich text editing (self‑hosted TinyMCE), image uploads, and responsive design.

🔗 **Live Demo**: _[Add your Vercel/Netlify URL here after deployment]_

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
- 🧹 **Improved beyond the original course** – Better error handling, loading skeletons, slug generation, and deployment automation

---

## 🛠️ Tech Stack

| Category       | Technology                         |
| -------------- | ---------------------------------- |
| Frontend       | React 18 + Vite                    |
| Routing        | React Router DOM v6                |
| State          | Redux Toolkit                      |
| Styling        | Tailwind CSS                       |
| Backend (BaaS) | Appwrite (Auth, Database, Storage) |
| Forms          | React Hook Form                    |
| Editor         | TinyMCE (self-hosted)              |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- An [Appwrite](https://cloud.appwrite.io) account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Siddhugo/react-blog-appwrite.git
   cd react-blog-appwrite
   Install dependencies
   ```

bash
npm install
Set up environment variables
Create a .env file in the root and add:

env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
Run development server

bash
npm run dev
Open http://localhost:5173

🗄️ Appwrite Setup (Backend)
You need to configure these resources in your Appwrite Console:

1. Database Collection – posts
   Attribute Type Required
   title string yes
   slug string yes
   content string yes
   featuredImage string no
   status string (active/inactive) yes
   userId string yes
   Permissions:

Read: role: "user", role: "guest"

Write: role: "user"

2. Storage Bucket – blog-images
   Read: role: "user", role: "guest"

Write: role: "user"

File size limit: 5MB (adjust as needed)

3. Auth Settings
   Add your production URL (e.g., https://react-blog-appwrite.vercel.app) to Allowed Hosts (under Auth → Settings).

📦 Deployment
Recommended platform: Vercel (free tier)

Push your code to GitHub.

Import the repository on Vercel.

Add the same environment variables (.env) in Vercel dashboard.

Deploy – it will auto‑build and give you a live URL.

Make sure to add your production domain to Appwrite's Allowed Hosts after deployment.

🙏 Acknowledgements
Hitesh Choudhary (Chai aur Code) – This project was built while following his excellent React + Appwrite course. The core architecture and features (authentication, posts, image uploads) were learned from his tutorials.
👉 Watch the course on YouTube

Additional work beyond the course (to improve functionality and avoid limitations):

Self‑hosted TinyMCE to remove API key requirement

Fixed slug generation logic (handles all titles correctly)

Added comprehensive error handling and loading skeletons

Enhanced form validation with React Hook Form

Improved responsiveness and accessibility

Automated deployment with GitHub + Vercel CI/CD

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a pull request.

📄 License
MIT © [Siddharth]

⭐ Show your support
If you found this project helpful, please give it a ⭐ on GitHub and share it with others!

Happy coding! 🚀

text

---

Just copy this entire block and paste it into your `README.md` file, then commit and push to GitHub. After deployment, replace the **Live Demo** placeholder with your actual Vercel/Netlify URL.
