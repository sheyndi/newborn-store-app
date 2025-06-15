
# 🌍 Focus - Backend Server

שרת Backend של מערכת **Focus** – מערכת לניהול מידע תיירותי והצגת המלצות אמינות בתחום האירוח. נבנה באמצעות Node.js, Express, TypeScript ו-MySQL.

---

## 🚀 טכנולוגיות בשימוש

- **Node.js**
- **Express**
- **TypeScript**
- **MySQL**
- **dotenv**
- **JWT**
- **REST API**

---

## ⚙️ התקנה והרצה

```bash
# התקנת תלויות
npm install

# יצירת קובץ סביבה
cp .env.example .env
```

### דוגמה לקובץ `.env`:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=focus_db

PORT=5000
JWT_SECRET=your_jwt_secret
```

```bash
# הרצת שרת בפיתוח
npm run dev
```

---

## 📁 מבנה תיקיות

```
src/
├── routes/         # ניתובים
├── controllers/    # לוגיקת הבקשות
├── models/         # שאילתות למסד הנתונים
├── middleware/     # הרשאות, טיפול שגיאות
├── config/         # חיבור למסד נתונים
├── types/          # טיפוסים ל-TypeScript
└── index.ts        # נקודת כניסה
```

---

## 📡 REST API

### 👤 משתמשים

| CRUD     | כתובת                  | מתודה | פרמטרים | Headers | Body | תיאור |
|----------|------------------------|--------|----------|---------|------|--------|
| יצירה    | `/api/users/register`  | POST   |          |         | `{ name, email, password }` | הרשמת משתמש |
| התחברות | `/api/users/login`     | POST   |          |         | `{ email, password }` | התחברות עם טוקן |
| שליפה   | `/api/users/profile`   | GET    |          | `Authorization: Bearer <token>` | - | פרטי משתמש מחובר |

---

### 🏨 מלונות

| CRUD     | כתובת              | מתודה | פרמטרים | Headers | Body | תיאור |
|----------|--------------------|--------|----------|---------|------|--------|
| שליפה    | `/api/hotels`      | GET    |          |         |      | כל המלונות |
| לפי ID   | `/api/hotels/:id`  | GET    | `id`     |         |      | מלון מסוים |
| חיפוש    | `/api/hotels/search` | GET  | Query Params | |      | חיפוש לפי פילטרים |

---

### 📝 ביקורות

| CRUD     | כתובת                      | מתודה | פרמטרים | Headers | Body | תיאור |
|----------|----------------------------|--------|----------|---------|------|--------|
| יצירה    | `/api/reviews/`            | POST   |          | `Authorization` | `{ hotelId, rating, comment }` | הוספת ביקורת |
| לפי מלון | `/api/reviews/hotel/:id`   | GET    | `id`     |         |      | כל הביקורות של מלון |

---

### ❤️ מלונות אהובים

| CRUD     | כתובת                          | מתודה | פרמטרים | Headers | Body | תיאור |
|----------|--------------------------------|--------|----------|---------|------|--------|
| עדכון    | `/api/users/updateLovedHotels` | PATCH  |          | `Authorization` | `{ hotelId }` | הוספה/הסרה של מלון אהוב |

---

### 📢 הודעות מערכת

| CRUD     | כתובת                      | מתודה | פרמטרים | Headers | Body | תיאור |
|----------|----------------------------|--------|----------|---------|------|--------|
| שליפה    | `/api/systemMessages`      | GET    |          |         |      | כל ההודעות הפעילות |
| יצירה    | `/api/systemMessages`      | POST   |          |         | `{ title, content, expires_at }` | יצירת הודעה חדשה |

---

## 🔒 הרשאות

- קריאות מסוימות דורשות JWT Token.
- יש להעביר Header מסוג:  
  `Authorization: Bearer <your_token>`

---

## 🧪 בדיקות

- ניתן לבדוק את המערכת בעזרת:
  - Postman
  - Thunder Client
  - curl
