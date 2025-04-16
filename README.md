# 🕵️ IMF Gadget API — Backend Assignment

This is a backend assignment project built for Upraised, simulating an API used by the **IMF (Impossible Mission Force)** to manage secret agent gadgets. It provides RESTful endpoints to create, update, and manage spy gadgets, including features like self-destruct with a confirmation code.

---

## 🚀 Features

- 🔒 Create gadgets with **unique, randomly generated codenames**
- ✅ Filter gadgets by status (`Available`, `Deployed`, `Destroyed`, `Decommissioned`)
- ✏️ Update gadget details dynamically
- ❌ Soft delete gadgets by marking them as **Decommissioned**
- 💣 Two-step **Self-Destruct mechanism** with confirmation code
- 📈 Randomly generated **Mission Success Probability** added to each gadget

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ODM
- **Jest** + **Supertest** – Testing framework
- **Render** – Deployment platform
- **Git** + **GitHub** – Version control

---

## 📁 Project Structure

```
.
├── controllers/
│   └── gadgetsController.js
├── models/
│   └── Gadget.js
├── routes/
│   └── gadgets.js
├── tests/
│   └── gadget.test.js
├── app.js
├── server.js
├── .env
└── README.md
```

---

## 📦 Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Raunakkkkk/upraised-assignment.git
   cd upraised-assignment
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Setup environment variables**  
   Create a `.env` file in the root with:
   ```
   MONGO_URI=your_mongodb_uri
   PORT=3000
   ```

4. **Start the development server**  
   ```bash
   npm run dev
   ```

---

## 🧪 Run Tests

Run all unit and integration tests:

```bash
npm run test
```

> Tests cover creation, update, self-destruct, and decommission logic using **Jest** and **Supertest**.

---

## 🔗 API Endpoints

### ✅ `GET /gadgets`
- Returns a list of all gadgets
- Optional query: `status=Available`

**Response:**
```json
[
  {
    "_id": "gadget_id",
    "name": "The Phantom",
    "status": "Available",
    "missionSuccess": "75%"
  }
]
```

---

### ➕ `POST /gadgets`
- Add a new gadget
- Only provide the `status`
- A unique codename is auto-generated

**Request:**
```json
{
  "status": "Deployed"
}
```

**Response:**
```json
{
  "_id": "gadget_id",
  "name": "The Kraken",
  "status": "Deployed"
}
```

---

### ✏️ `PATCH /gadgets/:id`
- Update gadget properties (like name or status)

**Request:**
```json
{
  "name": "The Viper"
}
```

**Response:**
```json
{
  "_id": "gadget_id",
  "name": "The Viper",
  "status": "Available"
}
```

---

### ❌ `DELETE /gadgets/:id`
- Soft delete a gadget (marks as `Decommissioned`)
- Adds a `decommissionedAt` timestamp

**Response:**
```json
{
  "status": "Decommissioned",
  "decommissionedAt": "2025-04-16T12:34:56Z"
}
```

---

### 💣 `POST /gadgets/:id/self-destruct`

#### Step 1 – Generate confirmation code
**Request:**  
```json
POST /gadgets/:id/self-destruct
```

**Response:**
```json
{
  "message": "Confirmation code generated (simulate delivery)",
  "confirmationCode": "123456"
}
```

#### Step 2 – Confirm destruction
**Request:**
```json
POST /gadgets/:id/self-destruct
{
  "confirmationCode": "123456"
}
```

**Response:**
```json
{
  "message": "Gadget self destructed",
  "gadget": {
    "status": "Destroyed"
  }
}
```

---

## 🌍 Deployment (Render)

1. Push your code to GitHub.
2. Go to [https://render.com](https://render.com) → New Web Service.
3. Connect your repo and set:
   - **Build command**: `npm install`
   - **Start command**: `npm start`
4. Add environment variable:
   - `MONGO_URI=your_mongodb_connection_string`

---

## 👨‍💻 Author

**Raunak Agarwal**  
📧 agarwalraunak2000@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/raunak-agarwal-397467257)  
💻 [GitHub](https://github.com/Raunakkkkk)  
🌐 [Portfolio](https://raunakkkkk.github.io/Portfolio-Website/)

---

## 📜 License

This project is developed as part of a backend assignment and is not intended for commercial use.

---
