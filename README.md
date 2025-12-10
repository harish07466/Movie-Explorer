# 🎬 **Movie Explorer — React Movie Search & Media Hub**

An elegant and interactive movie discovery web app built with **React + OMDB API + YouTube API**, featuring secure login, real-time movie search, trailers, songs, and a cinematic animated UI.

<p align="center">
  <img src="https://github.com/harish07466/Movie-Explorer/blob/main/src/assets/ProjectScreenShoots/MoviesPage.png" width="850" />
</p>

---

## 🚀 **Live Demo**

🔗 **https://movie-explorer-56q.pages.dev/**

⚠️ Chrome Warning Notice (Safe to Ignore)

When previewing this project, Google Chrome may display a “Dangerous Site” or “Deceptive Site Ahead” warning.
This does NOT mean the site is unsafe — it is a false precaution flag caused by the following reasons:

🔍 Why Chrome Shows This Warning

The project is hosted on a new Cloudflare Pages subdomain, which has no established trust yet.

The app includes a login UI, even though it is a frontend-only demo without real authentication.

Chrome automatically flags new domains with password fields, even if they are completely harmless.

The SSL certificate is valid, but the domain reputation is still building, which is normal for newly deployed apps.

🛡️ Safety Assurance

✔️ No personal data is collected
✔️ No backend or database is connected
✔️ The login page is UI-only (for demonstration)
✔️ All code runs entirely in the browser
✔️ SSL certificate is valid and secure

This project is 100% safe to open, and the warning will automatically disappear as the domain gains trust over time.

🚀 If Chrome Shows the Warning

You can proceed safely by clicking:

Advanced → Proceed to site

This is only required during the early verification period of the domain.

---

# 🏆 **Why Movie Explorer?**

Movie Explorer gives users a **premium OTT-style experience**, delivering:

* ✨ Animated UI
* ✨ Rich movie search
* ✨ Auto language-based trailer & songs
* ✨ Secure session-based login
* ✨ Fully responsive UI

---

# 🌟 **Key Features**

---

## 🔐 **1. Login & Authentication**

* Encrypted Base64 session storage
* Auto session expiry (24 hours)
* Complete protected routing

### **🔐 Login Page**

<p align="center">
  <img src="https://github.com/harish07466/Movie-Explorer/blob/main/src/assets/ProjectScreenShoots/Login_Page.png" width="850" />
</p>

---

## 🎞 **2. Movie Search System**

* Search movies instantly via OMDB API
* Styled search UI with hover/zoom effects
* Friendly fallback messages

### **🎞 Movie List**

<p align="center">
  <img src="https://github.com/harish07466/Movie-Explorer/blob/main/src/assets/ProjectScreenShoots/Movies_List.png" width="850" />
</p>

---

## 🎬 **3. Detailed Movie Information**

* Full Plot
* Poster Preview
* Genre, Actors, Release Date
* IMDb Ratings
* Cleanly structured detail layout

### **📘 Movie Detail Card**

<p align="center">
  <img src="https://github.com/harish07466/Movie-Explorer/blob/main/src/assets/ProjectScreenShoots/Movie_Detail.png" width="850" />
</p>

---

## ▶ **4. Auto-Language Trailer Finder (YouTube API)**

* Searches trailers prioritizing **original movie language**
* Auto-play embedded YouTube player
* Neon glowing player border effect

### **▶ Trailer Player**

<p align="center">
  <img src="https://github.com/harish07466/Movie-Explorer/blob/main/src/assets/ProjectScreenShoots/Trailer_Play.png" width="850" />
</p>

---

## 🎵 **5. Smart Songs Finder (YouTube API)**

* Detects original language
* Ranks songs accordingly
* Auto-plays first result
* Clean song list UI

### **🎵 Songs Panel**

<p align="center">
  <img src="https://github.com/harish07466/Movie-Explorer/blob/main/src/assets/ProjectScreenShoots/Movie_Songs.png" width="850" />
</p>

---

## 💎 **6. Premium UI & Animations**

* Cinematic background zoom animation
* Glass-morphism login card
* Gold animated title text
* Neon-pulse media player
* Fully mobile-responsive layout

---

# 🧰 **Tech Stack**

| Category           | Tools                         |
| ------------------ | ----------------------------- |
| **Frontend**       | React.js, JSX, CSS3           |
| **Routing**        | React Router v6               |
| **APIs**           | OMDB API, YouTube Data API v3 |
| **Authentication** | Encrypted Base64 Sessions     |
| **Bundler**        | Vite                          |
| **Hosting**        | Netlify                       |

---

# 📁 **Project Structure**
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
└── vite.config.js
```

---

# 🔧 **Environment Setup**

Create a `.env` file:

```
VITE_OMDB_API_KEY=YOUR_OMDB_KEY
VITE_YOUTUBE_API_KEY=YOUR_YOUTUBE_KEY
```

---

# 🚀 **Running the Project**

### 1️⃣ Install dependencies

```sh
npm install
```

### 2️⃣ Start dev server

```sh
npm run dev
```

### 3️⃣ Build for production

```sh
npm run build
```

---

# 🧪 **Test User (from user.json)**

```
[
  {
    "email": "movieuser@gmail.com",
    "password": "usermovie@123"
  }
]
```

---

# 🛠 **Future Enhancements**

* ✔ Light / Dark mode
* ✔ User favorites list
* ✔ Trending movies section
* ✔ Multi-language UI
* ✔ Smarter recommendation engine

---

# 🤝 **Contributing**

Issues and PRs are welcome.
Feel free to improve UI, code logic, or add features!

---

# 📜 **License**

MIT License — free to use and modify.

---

# ❤️ **Author**

**Harish Kumbar**
<p>Built with passion for cinema & modern UI development.</p>

---
