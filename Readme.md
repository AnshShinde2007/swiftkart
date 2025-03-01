# E-Commerce App with User Authentication & Cart

## 🛠️ Tech Stack
- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React.js, Context API
- **Authentication:** JWT
- **Database:** MongoDB (Mongoose ODM)
- **API Testing:** Postman

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/AnshShinde2007/Pregrad_project.git
cd Pregrad_project/swiftkart
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the Server
```sh
nodemon server.js
```
_Server runs at `http://localhost:5000/`_

---

## 📌 API Endpoints

### 🔹 User Authentication
| Method | Endpoint       | Description          |
|--------|--------------|----------------------|
| POST   | /api/users/register | Register a new user |
| POST   | /api/users/login | Login and get a token |
| GET    | /api/users/profile | Get user profile (Auth Required) |

### 🔹 Products
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| GET    | /api/products  | Get all products |
| GET    | /api/products/:id | Get product by ID |

### 🔹 Cart
| Method | Endpoint         | Description |
|--------|-----------------|-------------|
| POST   | /api/cart        | Add item to cart |
| GET    | /api/cart/:userId | Get user cart |
| DELETE | /api/cart/:userId/:productId | Remove item from cart |

### 🔹 Orders (Upcoming Feature)
| Method | Endpoint         | Description |
|--------|-----------------|-------------|
| POST   | /api/orders      | Create an order |
| GET    | /api/orders/:userId | Get user orders |

---

## 🖥️ Frontend Setup

### 1️⃣ Install Frontend Dependencies
```sh
cd client
npm install
```

### 2️⃣ Start the Frontend
```sh
npm run dev
```
_Frontend runs at `http://localhost:5173/`_

---

## 📌 Features
- 🔑 User Authentication (JWT-based Login & Registration)
- 🛒 Shopping Cart (Add/Remove Items, Persist in Database)
- 🏪 Product Listing & Details
- 📦 Order Management (Coming Soon)
- 🔧 Admin Panel for Managing Products (Coming Soon)

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 🎯 Future Improvements
- ✅ Implement **Checkout & Payment Integration**
- ✅ Add **Admin Panel** for Product Management
- ✅ Improve **UI/UX with TailwindCSS**

---

## 📞 Contact
For any issues, feel free to create an **Issue** or **Pull Request**. 🚀

