
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


### 📢 הודעות מערכת

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

---
## 📡 REST API

### 👤 משתמשים

<table>
    <thead>
        <tr>
            <th>CRUD</th>
            <th>כתובת</th>
            <th>פרמטרים</th>
            <th>Headers</th>
            <th>Body</th>
            <th>מה עושה</th>
            <th>מה מוחזר</th>
            <th>שגיאות אפשריות</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>GET</td>
            <td>/api/user/getUserDetails</td>
            <td>-</td>
            <td>userId: string</td>
            <td>-</td>
            <td>מחזירה את פרטי המשתמש לפי מזהה</td>
            <td>
<pre>
{ 
  title: "Success",
  message: "User details fetched successfully.",
  data: {
    id: string,
    first_name: string,
    last_name: string,
    phone: string,
    address: string,
    profilePicture: string,
    role: string,
    authMethod: string,
    location: {
      latitude: number, 
      longitude: number
    },
    loved_Hotels: [...],
    created_at: date
  }
}
</pre>
            </td>
            <td>
                <ul>
                    <li>400 - חסר מזהה משתמש</li>
                    <li>404 - משתמש לא נמצא</li>
                    <li>500 - שגיאת שרת</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/user/addOrUpdateUser</td>
            <td>-</td>
            <td>userId: string</td>
            <td>
<pre>
{ 
  first_name: string,
  last_name: string,
  phone?: string,
  address?: string,
  profile_picture?: string
}
</pre>
            </td>
            <td>יוצרת משתמש חדש או מעדכנת משתמש קיים לפי id</td>
            <td>
<pre>
1. { message: "User added successfully", userId: string }
OR
2. { message: "User updated successfully" }
</pre>
            </td>
            <td>
                <ul>
                    <li>400 - שדות חובה חסרים</li>
                    <li>400 - שגיאה בהוספת/עדכון המשתמש</li>
                    <li>500 - שגיאת שרת</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>PATCH</td>
            <td>/api/user/favorites/</td>
            <td>-</td>
            <td>userId: string</td>
            <td>
<pre>
{
  hotelId: string,
  action: "add" | "remove"
}
</pre>
            </td>
            <td>מעדכנת את רשימת המלונות האהובים של המשתמש</td>
            <td>
<pre>
{
  title: "Success",
  message: "Loved hotels updated successfully.",
  hotelId: string,
  action: "add" | "remove",
  updatedList: [string],
  userId: string
}
</pre>
            </td>
            <td>
                <ul>
                    <li>400 - חסר hotelId או action</li>
                    <li>400 - פעולה לא חוקית</li>
                    <li>404 - משתמש או מלון לא נמצא</li>
                    <li>400/500 - שגיאה כללית</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>/api/user/:userId</td>
            <td>userId: string</td>
            <td>userId: string</td>
            <td>-</td>
            <td>מוחק משתמש לפי מזהה</td>
            <td>
<pre>
{
  title: "Success",
  message: "User deleted successfully."
}
</pre>
            </td>
            <td>
                <ul>
                    <li>400 - חסר מזהה משתמש</li>
                    <li>404 - משתמש לא נמצא</li>
                    <li>430 - לא מורשה למחוק</li>
                    <li>500 - שגיאת שרת</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

## Auth

| CRUD | Endpoint                  | Params         | Headers | Body | Description | Response | Errors |
|------|---------------------------|----------------|---------|------|-------------|----------|--------|
| GET  | /api/auth/getOTP/:email   | email: string  | -       | -    | Sends a one-time password to the email | `{ "title": "OTP Sent", "message": "A one-time password has been sent to your email address." }` | 400 - Missing email<br>500 - OTP save failed<br>500 - Email send error<br>500 - Server error |
| POST | /api/auth/verifyOTP       | -              | -       | `{ "email": string, "otp": string }` | Verifies the OTP | `{ "title": "OTP Verified", "message": "Verification successful. You may continue." }` | 400 - Missing params<br>404 - Code not found<br>401 - Incorrect code<br>410 - Expired code<br>500 - Deletion failed<br>500 - Server error |

## Search History

| CRUD | Endpoint                              | Params | Headers | Body | Description | Response | Errors |
|------|---------------------------------------|--------|---------|------|-------------|----------|--------|
| POST | /api/searchHistory/addSearch          | -      | userId  | `{ "query": string }` | Adds a new search to the user (if not already exists) | `{ "title": "Success", "message": "Search saved successfully." }` | 400 - Missing fields<br>409 - Search already exists<br>500 - Server error |
| GET  | /api/searchHistory/getUserSearches    | -      | userId  | -    | Retrieves all user searches by descending time | `{ "title": "Success", "message": "User searches fetched successfully.", "data": [query, ...] }` | 400 - Missing userId<br>404 - No searches found<br>500 - Server error |
| GET  | /api/searchHistory/getSearchSuggestions | `{ "query": string }` | - | - | Suggests searches based on partial text | `{ "title": "Success", "message": "User searches fetched successfully.", "data": [query, ...] }` | 400 - Missing query<br>404 - No suggestions found<br>500 - Server error |



### 🏨 מלונות
<table>
    <thead>
        <tr>
            <th>CRUD</th>
            <th>Endpoint</th>
            <th>Parameters</th>
            <th>Headers</th>
            <th>Body</th>
            <th>Description</th>
            <th>Response</th>
            <th>Possible Errors</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>POST</td>
            <td>/api/hotel/add</td>
            <td>-</td>
            <td>adminId</td>
            <td><pre>{ "hotelName": string, "city": string,
             "location": { "latitude": number, "longitude": number },
              "pictures"?: string[] }</pre></td>
            <td>Creates a new hotel in the database</td>
            <td><pre>{ "message": "Hotel created successfully", "hotelId": string }</pre></td>
            <td>
                <ul>
                    <li>400 - Missing fields</li>
                    <li>409 - Hotel name already exists</li>
                    <li>500 - Database error</li>
                </ul>
            </td>
        </tr>
          <tr>
                <td>GET</td>
                <td>/api/hotel/getHotelsBySearch</td>
                <td>            
        {<br />
            limit?: number,
            page?: number,<br />
            "query": string
        }
                </td>
                <td>userId?</td>
                <td>
                    -
                </td>
                <td>מאפשר חיפוש מלונות לפי מחרוזת. אם אין תוצאות, מוחזרות המלצות קודמות או ברירת מחדל.</td>
                <td><pre>
        {   
            <span>title:</span> "Success",
            <span>message:</span> "Hotels retrieved successfully.",
            OR
             <span>title:</span> "Fallback Results",
            <span>message:</span>  "No results found for query. Showing default recommendations.",
            <span> data:</span> [#hotel-object]
        }</pre>
                </td>
                <td>
                    <ul>
                        <li>400 - שדה query חסר</li>
                        <li>404 - לא נמצאו תוצאות</li>
                        <li>500 - שגיאת שרת</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/hotel/getFilteredHotelFeed</td>
                <td>
                    userLat: number, userLon: number,
                    filtering: string ("Near_by" | "Popular" | "Best_Reviews"),
                    limit?: number, page?: number
                </td>
                <td>-</td>
                <td>-</td>
                <td>מחזיר מלונות לפי פילטר נבחר</td>
                <td>
                    <pre>
    {
        <span>title:</span> "Success",
        <span>message:</span> "Hotels retrieved successfully.",
        <span>data:</span> [#hotel-object]
    }</pre>
                </td>
                <td>
                    <ul>
                        <li>400 - פרמטרים חסרים או לא חוקיים</li>
                        <li>404 - לא נמצאו מלונות</li>
                        <li>500 - שגיאת שרת</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/hotel/sorted-by-distance</td>
                <td>userLat: number, userLon: number,
                    limit?: number, page?: number</td>
                <td>-</td>
                <td>-</td>
                <td>מחזיר את כל המלונות ממוינות לפי קרבה למיקום המשתמש</td>
                <td>
                    <pre>
    {
        <span>title:</span> "Success",
        <span>message:</span> "Hotels retrieved successfully.",
        <span>data:</span> [(#hotel-object)]
    }</pre>
                <td>
                    <ul>
                        <li>400 - פרמטרים חסרים או לא חוקיים</li>
                        <li>404 - לא נמצאו מלונות</li>
                        <li>500 - שגיאת שרת</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/hotel/navigateToHotel</td>
                <td>userLat: number, userLon: number</td>
                <td>-</td>
                <td>-</td>
                <td>מחזיר מלון אחד הכי קרוב למשתמש</td>
                <td><pre>
        <span>title:</span>"Hotel Found",
        <span>message:</span> "Hotel found successfully.",
        <span>data:</span> [יעחךיך](#hotel-object)
                        </pre></td>
                <td>
                    <ul>
                        <li>400 - קואורדינטות חסרות או לא חוקיות</li>
                        <li>404 - לא נמצא מלון</li>
                        <li>500 - שגיאת שרת</li>
                    </ul>
                </td>
            </tr>
    </tbody>
</table>

### Hotel Object

{
  "id": "string",
  "name": "string",
  "city": "string",
  "country": "string",
  "location": {
    "latitude": number,
    "longitude": number
  },
  "pictures": ["string"],
  "totalReviews": number,
  "averageRating": number
}
