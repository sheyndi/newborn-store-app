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
            <td>/api/searchHistory/addSearch</td>
            <td>-</td>
            <td>userId</td>
            <td><pre>{ "query": string }</pre></td>
            <td>Adds a new search for the user (if it doesn't already exist)</td>
            <td><pre>{ "title": "Success", "message": "Search saved successfully." }</pre></td>
            <td>
                <ul>
                    <li>400 - Missing required fields</li>
                    <li>409 - Search already exists</li>
                    <li>500 - Server error</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/searchHistory/getUserSearches</td>
            <td>-</td>
            <td>userId</td>
            <td>-</td>
            <td>Returns all user searches in descending time order</td>
            <td><pre>{ "title": "Success", "message": "User searches fetched successfully.", "data": [query:string, ...] }</pre></td>
            <td>
                <ul>
                    <li>400 - Missing user ID</li>
                    <li>404 - No searches found</li>
                    <li>500 - Server error</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/searchHistory/getSearchSuggestions</td>
            <td><pre>{ "query": string }</pre></td>
            <td>-</td>
            <td>-</td>
            <td>Returns search suggestions based on partial text</td>
            <td><pre>{ "title": "Success", "message": "User searches fetched successfully.", "data": [query:string, ...] }</pre></td>
            <td>
                <ul>
                    <li>400 - Missing 'query' field</li>
                    <li>404 - No suggestions found</li>
                    <li>500 - Server error</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

---

<h2>Review</h2>
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
            <td>/api/review/addReview</td>
            <td>-</td>
            <td>userId</td>
            <td><pre>{ "hotelId": string, "rating": number (1-5), "text": string, "pictures": string[] }</pre></td>
            <td>Adds a new review to a hotel and updates its rating</td>
            <td><pre>{ "title": "Review added successfully", "message": "Your review has been added!", "reviewId": string }</pre></td>
            <td>
                <ul>
                    <li>400 - Missing fields</li>
                    <li>400 - Invalid rating</li>
                    <li>500 - Failed to update hotel rating</li>
                    <li>500 - Server error</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>PUT</td>
            <td>/api/review/updateReviewPictures</td>
            <td>-</td>
            <td>-</td>
            <td><pre>{ "reviewId": string, "picturesToAdd": string[], "picturesToRemove": string[] }</pre></td>
            <td>Adds or removes pictures from an existing review</td>
            <td><pre>{ "title": "Pictures updated", "message": "Pictures have been updated successfully." }</pre></td>
            <td>
                <ul>
                    <li>400 - Missing or invalid fields</li>
                    <li>400 - Update failed</li>
                    <li>500 - Server error</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/review/getReviewsByReviewIds</td>
            <td><pre>{ "reviewIds": string[] }</pre></td>
            <td>-</td>
            <td>-</td>
            <td>Returns reviews by their IDs</td>
            <td><pre>{ "title": "Reviews fetched successfully", "data": [ { id, hotelId, userId, rating, text, pictures, timestamp }, ... ] }</pre></td>
            <td>
                <ul>
                    <li>400 - Missing or invalid fields</li>
                    <li>400 - Update failed</li>
                    <li>500 - Server error</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>/api/review/:reviewId</td>
            <td>reviewId</td>
            <td>userId</td>
            <td>-</td>
            <td>Deletes a review by its ID</td>
            <td><pre>{ "title": "Success", "message": "Review deleted successfully." }</pre></td>
            <td>
                <ul>
                    <li>400 - Missing review ID</li>
                    <li>404 - Review not found</li>
                    <li>403 - User not authorized</li>
                    <li>500 - Server error</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/review/getReviewsByRating</td>
            <td>
                <ul>
                    <li>hotelId: string (required)</li>
                    <li>rating?: number (1-5, optional)</li>
                    <li>limit?: number (optional)</li>
                    <li>page?: number (optional)</li>
                </ul>
            </td>
            <td>-</td>
            <td>-</td>
            <td>Returns reviews for a hotel by rating if provided, otherwise returns last 3 reviews</td>
            <td><pre>{ "title": "Reviews Fetched", "message": "...", "data": [ { id, hotelId, userId, rating, text, pictures, timestamp }, ... ] }</pre></td>
            <td>
                <ul>
                    <li>400 - Missing or invalid fields</li>
                    <li>404 - No reviews found</li>
                    <li>500 - Server error</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/review/by-hotel/:hotelId</td>
            <td>limit?: number, page?: number</td>
            <td>-</td>
            <td>-</td>
            <td>Returns all reviews for a specific hotel</td>
            <td><pre>{ "title": "Reviews fetched successfully", "message": "Reviews for the hotel have been retrieved.", "reviews": [ { id, hotelId, userId, rating, text, pictures, timestamp }, ... ] }</pre></td>
            <td>
                <ul>
                    <li>Missing hotelId</li>
                    <li>500 - DB or review error</li>
                </ul>
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