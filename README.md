# 🛒 Dubey Creation — MERN E-Commerce Platform

A full-stack e-commerce website for selling premium electronic gadgets. Orders are placed directly via **WhatsApp** — no payment gateway required.

---

## 📁 Folder Structure

```
dubey-creation/
├── backend/                    # Node.js + Express + MongoDB
│   ├── data/
│   │   └── seed.js            # Sample product seeder
│   ├── models/
│   │   ├── Product.js         # Product schema
│   │   └── Order.js           # Order schema
│   ├── routes/
│   │   ├── products.js        # Product CRUD APIs
│   │   ├── categories.js      # Categories API
│   │   └── orders.js          # Order APIs
│   ├── .env.example
│   ├── package.json
│   └── server.js              # Express entry point
│
├── frontend/                   # React.js + Tailwind CSS
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── ProductCard.js
│   │   │   │   └── Skeleton.js
│   │   │   └── layout/
│   │   │       ├── Navbar.js
│   │   │       └── Footer.js
│   │   ├── context/
│   │   │   └── CartContext.js # Global cart state
│   │   ├── hooks/
│   │   │   └── useProducts.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── ProductsPage.js
│   │   │   ├── ProductDetailPage.js
│   │   │   ├── CartPage.js
│   │   │   ├── CheckoutPage.js
│   │   │   └── AdminPage.js
│   │   ├── utils/
│   │   │   └── api.js         # Axios API calls + WhatsApp builder
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css          # Tailwind + global styles
│   ├── .env.example
│   ├── package.json
│   └── tailwind.config.js
│
├── .gitignore
├── package.json               # Root scripts
└── README.md
```

---

## ⚡ Quick Setup (Step-by-Step)

### Prerequisites
- **Node.js** v18+ → https://nodejs.org
- **MongoDB** (local) → https://www.mongodb.com/try/download/community  
  OR **MongoDB Atlas** (free cloud) → https://cloud.mongodb.com

---

### Step 1 — Clone / Download the project

```bash
# If using git:
git clone <your-repo-url>
cd dubey-creation

# Or just navigate to the project folder:
cd dubey-creation
```

---

### Step 2 — Set up Backend

```bash
cd backend
npm install
```

**Create your `.env` file:**
```bash
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dubey-creation
# For Atlas: MONGODB_URI=mongodb+srv://user:pass@cluster0.xxx.mongodb.net/dubey-creation
NODE_ENV=development
WHATSAPP_NUMBER=919999999999    # ← Replace with your WhatsApp number (with country code, no +)
```

**Seed sample products:**
```bash
npm run seed
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
✅ Inserted 12 products
✅ Database seeded successfully!
```

**Start the backend server:**
```bash
npm run dev
# Server running on http://localhost:5000
```

---

### Step 3 — Set up Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
```

**Create your `.env` file:**
```bash
cp .env.example .env
```

Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WHATSAPP_NUMBER=919999999999    # ← Same number as backend
```

**Start the frontend:**
```bash
npm start
# Opens http://localhost:3000
```

---

### Step 4 — Open in Browser

Visit: **http://localhost:3000**

---

## 🔑 Key Features

| Feature | Details |
|---|---|
| 🏠 Homepage | Hero banner, featured products, categories grid |
| 🛍️ Product Listing | Filter by category, sort, search, pagination |
| 📦 Product Detail | Image gallery, specs table, related products |
| 🛒 Cart | Add/remove/update quantity, persistent (localStorage) |
| 📋 Checkout | Customer form → WhatsApp order message |
| 💬 WhatsApp Order | Pre-filled message with full order details |
| ⚙️ Admin Panel | Add products, delete products, filter view |
| 🔍 Search | Real-time search across name, description, brand |
| 📱 Responsive | Mobile-first, works on all screen sizes |
| ⚡ Loading States | Skeleton screens on all data fetches |
| 🔔 Toast Notifications | Add to cart, errors, success messages |

---

## 💬 WhatsApp Order Flow

1. Customer browses and adds products to cart
2. Clicks **"Proceed to Checkout"**
3. Fills in: Name, Phone, Address
4. Clicks **"Place Order via WhatsApp"**
5. WhatsApp opens with this pre-filled message:

```
🛒 New Order from Dubey Creation

👤 Customer Details
Name: Rahul Dubey
Phone: 9876543210
Address: Flat 12, MG Road, Thane, Maharashtra - 400601

📦 Order Items
1. DubeyBuds Pro Elite ANC x2 — ₹6,998
2. DubeyWatch Ultra X x1 — ₹7,499

💰 Total Amount: ₹14,497

Please confirm my order. Thank you! 🙏
```

6. Order is also saved to MongoDB

---

## 🌐 API Endpoints

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products (supports `?category=`, `?search=`, `?sort=`, `?page=`, `?limit=`) |
| GET | `/api/products/featured` | Get featured products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

### Categories
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | Get all categories with counts |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders` | Get all orders (Admin) |
| GET | `/api/orders/:id` | Get single order |
| PATCH | `/api/orders/:id/status` | Update order status |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6 |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| State | React Context + useReducer |
| Notifications | react-hot-toast |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Dev Tool | nodemon, concurrently |

---

## 🚀 Run Both Together (from root)

```bash
# From the project root
npm install          # installs concurrently
npm run dev          # starts both frontend & backend concurrently
```

---

## ☁️ Deploy to Production

### Backend (Railway / Render / Heroku):
1. Push backend folder
2. Set environment variables: `MONGODB_URI`, `PORT`, `WHATSAPP_NUMBER`

### Frontend (Vercel / Netlify):
1. Push frontend folder
2. Set build command: `npm run build`
3. Set env variable: `REACT_APP_API_URL=https://your-backend-url.com/api`
4. Set env variable: `REACT_APP_WHATSAPP_NUMBER=919999999999`

---

## 📋 Sample Product Categories & Count

After seeding:
- **TVs** — 2 products
- **Earbuds** — 2 products
- **Batteries** — 2 products
- **Laptops** — 2 products
- **Smartwatches** — 2 products
- **Accessories** — 2 products

Total: **12 sample products** with realistic specs, prices, and images.

---

## 🔧 Customization

### Change WhatsApp Number:
Update in both:
- `backend/.env` → `WHATSAPP_NUMBER=91XXXXXXXXXX`
- `frontend/.env` → `REACT_APP_WHATSAPP_NUMBER=91XXXXXXXXXX`

### Change Brand Name:
Search and replace `Dubey Creation` across all files.

### Add More Categories:
Update the `enum` array in `backend/models/Product.js` and the `CATEGORIES` array in frontend pages.

---

## 📞 Support

For help, reach out via WhatsApp or raise an issue on GitHub.

**Built with ❤️ for Dubey Creation**
