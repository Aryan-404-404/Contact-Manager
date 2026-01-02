# 📒 Contact Management App

A lightweight, full-stack web application to manage contacts effectively. Built as a demonstration of MERN stack fundamentals, focusing on clean architecture and responsive design.

## 🚀 Live preview Link
https://contact-manager-client-x7kd.onrender.com

## 🚀 Features

* **Add Contacts:** Securely store names, emails, phone numbers, and messages.
* **View List:** Real-time fetching of contact data sorted by newest first.
* **Delete Contacts:** Remove unwanted contacts instantly.
* **Validation:** Robust client-side validation for required fields and email formats.
* **Responsive UI:** Mobile-friendly interface styled with **Tailwind CSS**.

## 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)

## ⚙️ Getting Started

### Prerequisites
* Node.js installed
* MongoDB URI (Local or Atlas)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/contact-manager.git](https://github.com/yourusername/contact-manager.git)
    cd contact-manager
    ```

2.  **Setup Backend**
    ```bash
    # Install dependencies
    npm install

    # Create .env file in root
    echo "MONGO_URI=your_mongodb_connection_string" > .env
    echo "PORT=5000" >> .env

    # Start Server
    npm run dev
    ```

3.  **Setup Frontend**
    ```bash
    cd client
    npm install

    # Start React App
    npm run dev
    ```

## 📂 Project Structure

```text
├── config/         # Database connection
├── models/         # Mongoose schemas
├── routes/         # Express API routes
├── server.js       # Entry point
└── client/         # React Frontend
    ├── src/
    │   ├── api.js  # Axios configuration
    │   └── App.jsx # Main UI Logic
