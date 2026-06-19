# **Personal Blogging Platform - API Documentation**

## **🎯 Overview**
**Personal Blogging Platform** is a backend system built with **Node.js**, **Express**, and **MongoDB**, designed to power a personal blogging platform. It provides a complete authentication system (register, login, role-based access) along with full post management (create, update, delete, view), controlled by a role-based authorization system.

### **🔗 Basics**
- **Base URL:** `http://localhost:5000/api/v1`
- **Schema:** RESTful API
- **Authentication:** Bearer Token (JWT)
- **Database:** MongoDB (Mongoose)
- **Response Format:** JSON
- **Postman Docs:** [View full API documentation](https://documenter.getpostman.com/view/42740215/2sBXwvHoCt)

---

## **🛠️ Tech Stack**
| Technology | Purpose |
|------------|---------|
| Express 5 | Server and routing |
| Mongoose / MongoDB | Database and schema modeling |
| jsonwebtoken | Creating and verifying JWTs |
| express-validator | Input validation |
| express-async-handler | Error handling in async functions |
| helmet | Securing HTTP headers |
| cors | Cross-origin resource sharing | Generating slugs for posts |
| nodemon | Auto-restarting the server during development |

---

## **📊 API Endpoints**

### **🔐 Authentication (Auth)**
| Method | Endpoint | Description | Access |
|--------|----------|--------------|--------|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Log in | Public |

### **📝 Posts Management**
| Method | Endpoint | Description | Access |
|--------|----------|--------------|--------|
| GET | `/posts/` | Get all posts | User, Admin |
| POST | `/posts/add` | Create a new post | User |
| PUT | `/posts/{post_id}` | Update a post | User |
| DELETE | `/posts/{post_id}` | Delete a post | User |

---

## **🔑 Authorization System**

### **👥 User Roles**
1. **Regular User (User)**
   - Register and log in
   - Create new posts
   - Update and delete their own posts
   - View posts

2. **Admin**
   - View all posts
   - Manage the system (for future extensions)

> **Note:** Permissions are enforced via `authMiddleware` (validates the token) and `authorizeRoles` (checks if the user's role is allowed to perform the action).

---

---

## **🔒 Security Notes**

### **🔑 Token Handling**
- The token must be sent in the header as: `Authorization: Bearer <token>`
- A valid token is required for all post operations except `register` and `login`

### **👮 Access Control**
- `authMiddleware` verifies that the token exists and is valid
- `authorizeRoles` checks whether the user's role is allowed to perform the requested action
- Users cannot update or delete posts that don't belong to them (enforced in the controller logic)

### **🔐 Data Protection**
- `helmet` is used to secure HTTP headers
- Input is validated using `express-validator` before reaching the controller
- Passwords must be hashed before being stored in the database

---

## **🚀 Getting Started**

### **1. Install dependencies**
```bash
npm install
```

### **2. Set up environment variables**
Create a `.env` file in the project root:
```
PORT=5000

MONGO_URI=mongodb://asamy0879_db_user:ahmed2016@ac-91ppiv3-shard-00-00.kk2mmul.mongodb.net:27017,ac-91ppiv3-shard-00-01.kk2mmul.mongodb.net:27017,ac-91ppiv3-shard-00-02.kk2mmul.mongodb.net:27017/?ssl=true&replicaSet=atlas-137ztp-shard-0&authSource=admin&appName=Cluster0

JWT_SECRET=your_jwt_secret_here
```

### **3. Run in development mode**
```bash
npm run dev
```

---

## **🚀 Best Practices**

### **✅ During Development**
1. Use environment variables (`.env`) for any sensitive data
2. Never hardcode the `JWT_SECRET` in the codebase
3. Always validate responses when building new features

### **📊 During Testing**
1. Start by testing `/auth/register` and `/auth/login`
2. Save the token returned from login and use it for subsequent requests
3. Test User and Admin permissions separately

---

## **📞 Support & Troubleshooting**

### **🛠️ Common Errors**
1. **401**: Invalid or missing token
2. **403**: Current role is not allowed to perform this action
3. **404**: Endpoint not found
4. **422**: Invalid input data (validation error)

---

## **📈 Future Roadmap**

### **🔄 Upcoming Improvements**
1. **Comments system** on posts
2. **Image uploads** for posts using `multer`
3. **Search and filtering** by tags and date
4. **Pagination** for post listing
5. **More granular admin permissions**

---

**✨ Personal Blogging Platform is a simple and secure backend platform for managing personal blog posts, built with Node.js, Express, and MongoDB.**