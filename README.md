# 🎬 **Movie Explorer — React Movie Search & Media Hub**

An Elegant and Interactive Movie Discovery Web App built with **React + OMDB API + YouTube API**, featuring secure login, real-time movie search, trailers, songs, and a fully cinematic UI with animations.

<p align="center">
  <img src="https://github.com/harish07466/Movie-Explorer/blob/main/src/assets/ProjectScreenShoots/MoviesPage.png" width="850" />
</p>

---

## 🚀 **Live Demo**

🔗 `https://movie-explorer-hk.netlify.app/`

---

## 🏆 **Why Movie Explorer?**

Movie Explorer is designed to give users a **premium OTT-style experience** with:

✨ Animated UI
✨ Rich search experience
✨ Multi-language trailer + song detection
✨ Secure session-based login
✨ Responsive layout for all devices

---

## 🌟 **Key Features**

### 🔐 **1. Login & Auth**

- User authentication with encrypted **Base64 session storage**
- Auto-expiry after **24 hours**
- Protected movie routes

### **🔐 Login Page**

<p align="center">
  <img src="https://github.com/harish07466/Movie-Explorer/blob/main/src/assets/ProjectScreenShoots/Login_Page.png" width="850" />
</p>

### 🎞 **2. Movie Search**

- Search movies using the OMDB API
- Instant results with fallback messages
- Smooth UI animations

### **🎞 Movie List**

<p align="center">
  <img src="https://github.com/harish07466/Movie-Explorer/blob/main/src/assets/ProjectScreenShoots/Movies_List.png" width="850" />
</p>

### 🎬 **3. Movie Details Page**

- Full plot
- Poster
- Genre, Actors, Ratings
- Dynamic color UI

### **📘 Movie Detail Card**

<p align="center">
  <img src="https://github.com/harish07466/Movie-Explorer/blob/main/src/assets/ProjectScreenShoots/Movie_Detail.png" width="850" />
</p>

### ▶ **4. Auto-Language Trailer Finder (YouTube API)**

- Smart trailer search prioritizing **original language**
- Auto-play embedded YouTube player
- Neon 4K player highlight effect

### **▶ Trailer Player**

<p align="center">
  <img src="https://github.com/harish07466/Movie-Explorer/blob/main/src/assets/ProjectScreenShoots/Trailer_Play.png" width="850" />
</p>

### 🎵 **5. Intelligent Songs Finder**

- Detects original movie language
- Ranks and filters songs accordingly
- Auto-play first song
- Clean vertical song list

### **🎵 Songs Panel**

<p align="center">
  <img src="https://github.com/harish07466/Movie-Explorer/blob/main/src/assets/ProjectScreenShoots/Movie_Songs.png" width="850" />
</p>

### 💎 **6. Premium UI & Animations**

- Cinematic background with **zoom animation**
- Crystal-clear glassmorphism login card
- Neon borders for media player
- Responsive for desktop & mobile

---

## 🧰 **Tech Stack**

| Category          | Tools                                   |
| ----------------- | --------------------------------------- |
| **Frontend**      | React.js, JSX, CSS3                     |
| **Routing**       | React Router v6                         |
| **APIs**          | OMDB API, YouTube Data API v3           |
| **Auth Handling** | LocalStorage (Encrypted Base64 Session) |
| **Bundler**       | Vite                                    |
| **Deployment**    | Netlify                                 |

---

## 📁 **Project Structure**

```
movie-explorer/
│
├── public/
│   ├── Movie_Explorer-Logo.png
│   └── user.json
│
├── src/
│   ├── assets/
│   ├── Pages/
│   │   ├── LoginPage.jsx
│   │   ├── LoginPageStyle.css
│   │   ├── MoviesPage.jsx
│   │   └── MoviesPageStyle.css
│   ├── App.jsx
│   ├── main.jsx
│   └── ProtectedRoute.jsx
│
├── .env
├── package.json
└── vite.config.js
```

---

## 🔧 **Environment Setup**

Create a `.env` file:

```
VITE_OMDB_API_KEY=YOUR_OMDB_KEY
VITE_YOUTUBE_API_KEY=YOUR_YOUTUBE_KEY
```

---

## 🚀 **Running the Project**

### 1️⃣ Install dependencies

```sh
npm install
```

### 2️⃣ Start development server

```sh
npm run dev
```

### 3️⃣ Build for production

```sh
npm run build
```

---

## 🧪 **Test Users (user.json)**

```
[
  {
    "email": "movieuser@gmail.com",
    "password": "usermovie@123"
  }
]
```

---

## 🛠 **Future Enhancements**

✔ Dark/Light mode
✔ User profile & favorites list
✔ Trending movies section
✔ Multi-language UI
✔ Better recommendation engine

---

## 🤝 **Contributing**

Feel free to submit issues or pull requests.
Contributions are always welcome!

---

## 📜 **License**

MIT License — free to use and modify.

---

## ❤️ **Author**

**Harish Kumbar**
Built with passion for movies & React development.

---
