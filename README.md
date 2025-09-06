# <h1 align="center">📚 BookWorm – Book Recommendation App 🚀</h1>

---

## 🎯 About BookWorm  

**BookWorm** is a cross-platform **book recommendation app** built with React Native and Node.js.  
It helps readers **discover, share, and recommend books** to fellow book lovers.  

✅ Personalized book recommendations  
✅ Works on **Android, iOS, and Web**  
✅ 100% JavaScript/TypeScript — no native code  

---

## 🧑‍🍳 Features  

- 🔐 **Authentication** — signup & login with JWT  
- 🏠 **Home Feed** — curated list of recommended books  
- 🎯 **Personalized Recommendations** — suggestions based on ratings & preferences  
- ➕ **Add Book** — share book details (title, author, rating, cover, and review)  
- 👤 **Profile Screen** — user info + their recommended books  
- 🗑️ **Delete Book/Post** — with confirmation  
- 🎨 **Themes** — quick theme switching for a custom look  
- 🌐 **Web Support** — run directly in the browser  
- 🚪 **Logout & Session Handling**  

---

## 🧠 Tech Stack  

- ⚙️ **Backend:** Node.js + Express + MongoDB  
- 🔑 **Auth:** JWT authentication  
- 🤖 **Recommendations:** Rating-based & user-driven suggestions  
- 🖼️ **Image Handling:** Base64 → Cloudinary  
- 🛫 **Deployment:** Free hosting (Render / Railway)  
- 🌍 **Frontend:** React Native + Expo Router  
- 🧭 **Navigation:** Animated transitions for smooth UX  

---

## 📁 Environment Setup  

### ⚙️ Backend (`/backend`)  

```bash
PORT=3000
MONGO_URI=<YOUR_MONGO_DB_URI>
JWT_SECRET=<YOUR_SECRET_KEY>

CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>

API_URL=<YOUR_DEPLOYED_API_URL>
```

## ⚙️ Run the Backend
```bash
cd backend
npm install
npm run dev

```

## 📱 Run the mobile

```bash
cd mobile
npm install
npx expo
```

🔥 With BookWorm, you can:
```bash

Discover trending and recommended books 📖
Share your reviews with the community ✍️
Get personalized suggestions based on your reading habits 🎯
