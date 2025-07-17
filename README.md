# 📚 SnapShelf - Smart Bookmark Manager

SnapShelf is a full-stack application for managing and organizing your favorite content — including YouTube videos, Tweets, and Reddit posts — with a sleek UI, authentication, and categorized storage.

Live Demo:
- **Frontend**: [View on Vercel](https://your-vercel-url.vercel.app)
- **Backend**: [View on Render](https://your-backend-url.onrender.com)

---

## 🔧 Tech Stack

| Frontend     | Backend     | Other           |
|--------------|-------------|------------------|
| React + Vite | Node.js + Express | MongoDB Atlas |
| TypeScript   | JWT Auth    | Zod Validation |
| TailwindCSS  | Mongoose    | Axios, React Hook Form |

---

## ✨ Features

- 🔐 **User Authentication**
  - Signup, Signin, JWT-protected routes
- 📥 **Bookmark Management**
  - Add content from **YouTube**, **Twitter**, and **Reddit**
  - Auto-categorize by content type
- 🧠 **Zod + React Hook Form Validation**
  - Instant feedback on input fields
- 🎨 **Clean Responsive UI**
  - Styled with TailwindCSS and designed for mobile/desktop
- 💾 **MongoDB Integration**
  - Persistent storage for user bookmarks
- 🔁 **Deployment**
  - Frontend on Vercel, Backend on Render

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB URI
- Vercel + Render accounts for deployment

---

### 🔧 Backend Setup

```bash
git clone https://github.com/KingParth904/Bookmark-shelf
cd Bookmark-shelf
npm install
```

Create a `.env` file in the root with:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Build & run the server:

```bash
npm run build
npm start
```

---

### 🌐 Frontend Setup

```bash
git clone https://github.com/KingParth904/SnapShelf
cd SnapShelf
npm install
```

Create a `.env` or update `config.ts`:

```ts
export const BACKNEND_URL = "https://your-backend-url.onrender.com";
```

Run locally:

```bash
npm run dev
```

---

## 📁 Project Structure

```
SnapShelf/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── schemas/
  │   ├── config.ts
  │   └── App.tsx
  ├── public/
  ├── index.html
  └── vercel.json
```

---

## 🔐 Authentication Flow

1. On signup/signin, user gets JWT token.
2. Token is stored in localStorage.
3. Protected routes (like `/dashboard`) check token and redirect if absent.
4. All backend API routes are protected via middleware.

---

## 🧪 Future Improvements

- 🌈 Tag-based filtering & search
- 🗑️ Trash bin and recovery system
- 📱 PWA support for mobile
- 🔗 Metadata scraping for better previews

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss the idea.

---

## 📄 License

[MIT](LICENSE)

---

> Made with ❤️ by Parth Sharma