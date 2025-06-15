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
            <td><pre>
            { "hotelName": string, 
            "city": string,
             "location": { 
                "latitude": number, 
                "longitude": number },
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
                <td>Search hotels by query</td>
                <td><pre>
        {   
            <span>title:</span> "Success",
            <span>message:</span> "Hotels retrieved successfully.",
            OR
             <span>title:</span> "Fallback Results",
            <span>message:</span>  "No results found for query.
             Showing default recommendations.",
            <span> data:</span> [<a href="#hotel-object">Hotel</a>]
        }</pre>
                </td>
                <td>
                    400, 404, 500
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
                <td>Filtered hotel feed</td>
                <td>
                    <pre>
    {
        <span>title:</span> "Success",
        <span>message:</span> "Hotels retrieved successfully.",
        <span>data:</span> [<a href="#hotel-object">Hotel</a>]
    }</pre>
                </td>
                <td>
                    400, 404, 500
                </td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/hotel/sorted-by-distance</td>
                <td>userLat: number, userLon: number,
                    limit?: number, page?: number</td>
                <td>-</td>
                <td>-</td>
                <td>Hotels sorted by distance</td>
                <td>
                    <pre>
    {
        <span>title:</span> "Success",
        <span>message:</span> "Hotels retrieved successfully.",
        <span>data:</span> [<a href="#hotel-object">Hotel</a>]
    }</pre>
                <td>
                    400, 404, 500
                </td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/hotel/navigateToHotel</td>
                <td>userLat: number, userLon: number</td>
                <td>-</td>
                <td>-</td>
                <td>Get closest hotel</td>
                <td><pre>
        <span>title:</span>"Hotel Found",
        <span>message:</span> "Hotel found successfully.",
        <span>data:</span> <a href="#hotel-object">Hotel</a>
                        </pre></td>
                <td>
                    400, 404, 500
                </td>
            </tr>
    </tbody>
</table>

---

## 🧾 Objects

### User Object

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

### Hotel Object

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