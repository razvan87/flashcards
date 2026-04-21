# 📚 English Flashcards - React Edition

A modern, full-stack application for managing English vocabulary, rebuilt with **React**, **TypeScript**, and **Vite**.

---

## 🚀 Evolution: JS to React + TS
This project has been migrated from a vanilla JavaScript implementation to a modern tech stack to ensure:
- **Type Safety**: Using TypeScript for fewer runtime errors.
- **Component-Based UI**: Scalable and reusable interface with React.
- **Speed**: Lightning-fast development with Vite.

## 🧱 Tech Stack

### Frontend
- **React 18** (Functional Components, Hooks)
- **TypeScript** (Strict Typing)
- **Vite** (Build Tool)
- **CSS Modules / Vanilla CSS**

### Backend (Existing)
- **Node.js & Express**
- **MongoDB & Mongoose**
- **Docker** (MongoDB & Mongo Express)

---

## 📂 Project Structure (New)

```text
english-flashcards/
├── backend/                # Express API (see /backend/README for details)
├── frontend-react/         # New Vite + React + TS Project
│   ├src/
│   │   ├── api/
│   │   │   ├── axios.ts
│   │   │   ├── cardsApi.ts
│   │   │   └── authApi.ts
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   │
│   │   │   ├── cards/
│   │   │   │   ├── CardItem.tsx
│   │   │   │   ├── CardGrid.tsx
│   │   │   │   └── Pagination.tsx
│   │   │   │
│   │   │   └── forms/
│   │   │       ├── LoginForm.tsx
│   │   │       ├── RegisterForm.tsx
│   │   │       └── CreateCardForm.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── CreateCardPage.tsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useCards.ts
│   │   │
│   │   ├── types/
│   │   │   └── card.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── tsconfig.json
│   └── vite.config.ts
└── docker-compose.yml


## 🛠️ Getting Started

### 1. Prerequisites
* **Node.js** (v18+)
* **Docker** (pentru Baza de Date)
* **pnpm** (sau npm/yarn)

### 2. Start the Backend
Urmează instrucțiunile din folderul `backend/` sau rulează:

```bash
# Pornește containerele în fundal
docker-compose up -d

# Dacă este prima rulare, populează baza de date cu semințe (seeds)
docker exec -it backend node seed/seed.js

### 3. Start the Frontend

```bash
cd frontend-react
pnpm install
pnpm dev
