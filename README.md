# 🏥 Patient Registration App

A frontend-only patient registration system built with **React**, **TypeScript**, **Vite**, and **PgLite** (PostgreSQL running entirely in the browser via WebAssembly).  
This app stores patient data persistently in the browser using IndexedDB and allows users to run custom SQL queries, all without a backend.

🔗 **Live Demo**: [https://patients-registration.netlify.app/](https://patients-registration.netlify.app/)

---

## ✨ Features

- 📋 Register patients with name, age, gender, and more.
- 💾 Persistent data storage using **PgLite** + **IndexedDB** (no backend).
- 🔍 SQL query panel for advanced data querying (e.g. `SELECT * FROM patients`).
- 🔄 Real-time sync across multiple tabs via `BroadcastChannel`.
- ⚠️ Handles page reload and database readiness.
- ⚙️ Built with Vite for lightning-fast development.

---

## 📦 Tech Stack

| Technology     | Description                         |
|----------------|-------------------------------------|
| React          | Frontend library                    |
| TypeScript     | Type safety for JavaScript          |
| Vite           | Development and build tool          |
| PgLite         | PostgreSQL in the browser (WASM)    |
| IndexedDB      | Persistent browser storage          |
| BroadcastChannel | Sync across tabs                 |

---

## 🚀 Setup Instructions

### 1. Clone the Repository

bash
git clone https://github.com/Kalaisharma/Medblocks.git
cd Medblocks/patient-registration-app

### 2.Install Dependencies
npm install

### 3.Run the Development Server
npm run dev

### 4.Build for Production
npm run build

### 5.Build for Preview
npm run preview
