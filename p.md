# 🌍 Focus - Backend Server

**Focus** is a backend server for a tourism information and recommendation platform, helping travelers find trustworthy accommodation deals. Built with **Node.js**, **Express**, **TypeScript**, and **MySQL**.

---

## 🚀 Technologies Used

- Node.js  
- Express  
- TypeScript  
- MySQL  
- dotenv  
- JWT  
- REST API  

---

## ⚙️ Installation & Running

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### `.env` Example:

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
# Run development server
npm run dev
```

---

## 📁 Folder Structure

```
src/
├── routes/         # Routes
├── controllers/    # Request logic
├── models/         # Database queries
├── middleware/     # Authorization, error handling
├── config/         # DB connection
├── types/          # TypeScript types
└── index.ts        # Entry point
```

---

## 🔒 Authorization

- Some endpoints require a JWT token.
- Add this header:  
  `Authorization: Bearer <your_token>`

---

## 🧪 Testing

- Recommended tools:
  - Postman
  - Thunder Client
  - curl

---

## 📡 REST API Documentation

### 👤 Users

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
            <td>Get user details by ID</td>
            <td>
<pre>
{ 
  title: "Success",
  message: "User details fetched successfully.",
  data: <a href="#user-object">user</a>
}
</pre>
            </td>
            <td>
                400, 404, 500
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
            <td>Add or update user by ID</td>
            <td>
<pre>
1. { message: "User added successfully", userId: string }
OR
2. { message: "User updated successfully" }
</pre>
            </td>
            <td>
                    400, 400, 500
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
<td>Update favorite hotels list</td>
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
                    400, 404, 500
            </td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>/api/user/:userId</td>
            <td>userId: string</td>
            <td>userId: string</td>
            <td>-</td>
            <td>Delete user by ID</td>
            <td>
<pre>
{
  title: "Success",
  message: "User deleted successfully."
}
</pre>
            </td>
            <td>
                400, 404, 430, 500
            </td>
        </tr>
    </tbody>
</table>

| Method | Endpoint                   | Params | Headers        | Body | Description                             | Response | Errors |
|--------|----------------------------|--------|----------------|------|-----------------------------------------|----------|--------|
| GET    | `/api/user/getUserDetails` | –      | `userId`       | –    | Get user details by ID                  | `{ message, data: user }` | 400, 404, 500 |
| POST   | `/api/user/addOrUpdateUser`| –      | `userId`       | `{ first_name, last_name, ... }` | Add or update user by ID | `{ message, userId? }` | 400, 500 |
| PATCH  | `/api/user/favorites`      | –      | `userId`       | `{ hotelId, action: "add" | "remove" }` | Update favorite hotels list | `{ message, updatedList }` | 400, 404, 500 |
| DELETE | `/api/user/:userId`        | URL ID | `userId`       | –    | Delete user by ID                       | `{ message }` | 400, 404, 430, 500 |

---

## 🔐 Authentication

| Method | Endpoint                 | Params         | Body                          | Description                 | Response | Errors |
|--------|--------------------------|----------------|-------------------------------|-----------------------------|----------|--------|
| GET    | `/api/auth/getOTP/:email`| `email`        | –                             | Send OTP to email           | `{ message }` | 400, 500 |
| POST   | `/api/auth/verifyOTP`    | –              | `{ email, otp }`              | Verify OTP                  | `{ message }` | 400, 404, 401, 410, 500 |

---

## 📖 Search History

| Method | Endpoint                              | Headers | Body                  | Description                             | Response | Errors |
|--------|---------------------------------------|---------|-----------------------|-----------------------------------------|----------|--------|
| POST   | `/api/searchHistory/addSearch`        | `userId`| `{ query }`           | Add user search                         | `{ message }` | 400, 409, 500 |
| GET    | `/api/searchHistory/getUserSearches`  | `userId`| –                     | Get user's previous searches            | `{ data: [query] }` | 400, 404, 500 |
| GET    | `/api/searchHistory/getSearchSuggestions` | –   | – or `{ query }`      | Suggest searches by query               | `{ data: [query] }` | 400, 404, 500 |

---

## 🏨 Hotels

| Method | Endpoint                        | Params / Query | Headers   | Body                         | Description                       | Response | Errors |
|--------|----------------------------------|----------------|-----------|------------------------------|-----------------------------------|----------|--------|
| POST   | `/api/hotel/add`                | –              | `adminId` | `{ hotelName, city, location, pictures? }` | Create new hotel                 | `{ hotelId }` | 400, 409, 500 |
| GET    | `/api/hotel/getHotelsBySearch`  | `{ query, limit?, page? }` | `userId?` | – | Search hotels by query         | `{ data: [Hotel], message }` | 400, 404, 500 |
| GET    | `/api/hotel/getFilteredHotelFeed`| `userLat, userLon, filtering, limit?, page?` | – | – | Filtered hotel feed            | `{ data: [Hotel] }` | 400, 404, 500 |
| GET    | `/api/hotel/sorted-by-distance` | `userLat, userLon, limit?, page?` | – | – | Hotels sorted by distance      | `{ data: [Hotel] }` | 400, 404, 500 |
| GET    | `/api/hotel/navigateToHotel`    | `userLat, userLon` | – | – | Get closest hotel             | `{ data: Hotel }` | 400, 404, 500 |

---

## 🧾 Objects

### 🧍‍♂️ User Object

```json
{
  "id": "string",
  "first_name": "string",
  "last_name": "string",
  "phone": "string?",
  "address": "string?",
  "profile_picture": "string?",
  "favorites": ["hotelId"]
}
```

### 🏨 Hotel Object

```json
{
  "id": "string",
  "name": "string",
  "city": "string",
  "country": "string",
  "location": {
    "latitude": "number",
    "longitude": "number"
  },
  "pictures": ["string"],
  "totalReviews": "number",
  "averageRating": "number"
}
```