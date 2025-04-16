# 🕵️ IMF Gadget API — Backend Assignment

This is a backend assignment project built for Upraised.

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
- **Postman** - API Testing
- **Git** + **GitHub** – Version control

---

## 📁 Project Structure

```
src/ ├── controllers/ │ └── gadgetController.js # Handles gadget-related API logic ├── models/ │ └── Gadget.js # Gadget schema and model ├── routes/ │ └── gadgetRoutes.js # API routes for gadgets ├── middlewares/ │ └── errorHandler.js # Global error handling middleware ├── utils/ │ └── index.js # Utility functions └── app.js # Main application entry point


└── README.md
```

---


## 🔗 API Endpoints

### 1. **List Gadgets**
   - **Endpoint**: `GET /gadgets?status=...`
   - **Description**: Fetch a list of gadgets filtered by status. Each gadget includes a random mission success probability.
   - **Query Parameters**:
     - `status` (optional): Filter gadgets by status (e.g., `Available`, `Deployed`, etc.).
   - **Response**:
     ```json
     [
       {
         "_id": "12345",
         "name": "The Nightingale",
         "status": "Available",
         "missionSuccess": "78%"
       }
     ]
     ```

### 2. **Create Gadget**
   - **Endpoint**: `POST /gadgets`
   - **Description**: Create a new gadget with a unique codename and status.
   - **Request Body**:
     ```json
     {
       "status": "Available"
     }
     ```
   - **Response**:
     ```json
     {
       "_id": "12345",
       "name": "The Kraken",
       "status": "Available"
     }
     ```

### 3. **Update Gadget**
   - **Endpoint**: `PATCH /gadgets/:id`
   - **Description**: Update gadget details by ID.
   - **Request Body**:
     ```json
     {
       "status": "Deployed"
     }
     ```
   - **Response**:
     ```json
     {
       "_id": "12345",
       "name": "The Kraken",
       "status": "Deployed"
     }
     ```

### 4. **Decommission Gadget**
   - **Endpoint**: `DELETE /gadgets/:id`
   - **Description**: Mark a gadget as "Decommissioned" and record the decommission date.
   - **Response**:
     ```json
     {
       "_id": "12345",
       "name": "The Kraken",
       "status": "Decommissioned",
       "decommissionedAt": "2025-04-16T12:00:00.000Z"
     }
     ```

### 5. **Self-Destruct Gadget**
   - **Endpoint**: `POST /gadgets/:id/self-destruct`
   - **Description**: Initiate a two-step self-destruct sequence for a gadget.
   - **Step 1**: Generate and return a confirmation code.
     - **Request Body**:
       ```json
       {}
       ```
     - **Response**:
       ```json
       {
         "message": "Confirmation code generated",
         "confirmationCode": "123456"
       }
       ```
   - **Step 2**: Confirm the code to destroy the gadget.
     - **Request Body**:
       ```json
       {
         "confirmationCode": "123456"
       }
       ```
     - **Response**:
       ```json
       {
         "message": "Gadget self destructed",
         "gadget": {
           "_id": "12345",
           "name": "The Kraken",
           "status": "Destroyed"
         }
       }
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
