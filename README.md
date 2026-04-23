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

```

## Card Structure

**Each flashcard contains:**

    text → The word or phrase

    level → CEFR level (A1, A2, B1, B2, C1, C2)

    imageUrl → Optional image

    meanings[] → Array of meanings:

    partOfSpeech → noun | verb | adjective | adverb | phrase

    definition

    example

    category → Optional predefined category

    timestamps → Automatically generated


## **Start the MongoDB & Backend**

From the project root, run:
    `docker-compose up --build`

**This will start:**

    MongoDB → port 27017

    Mongo Express → port 8081

    Backend (Node.js/Express) → port 3000

To check if the container is up and running please use command:
    `docker ps`    

To stop the docker process please use command:
    `docker-compose down`    


## **Access the MongoDB:**

1. You can access the DB via Monga Express UI: 

    **Open in browser:**
    http://localhost:8081

        Login:
            user: admin
            password: admin

2. Or connecting to the mongo container, commands:

    ```text
    "docker exec -it mongo mongosh"

    "use flashcards"

    "db.cards.find().pretty()"

    ```

## **Access the backend container:**

Backend already runs in Docker via `docker-compose`.

To connect to the backend container please use:

    docker exec -it backend sh

Hot reload enabled via volume mapping.
`Local changes in backend/src/ will automatically reload backend (nodemon).
`

**Run the seeds**    

If you want to have a some minimal data into mongo db and displayed in frontend, please run the following command that will inject into mongo an **admin user (user: admin, pass: admin123)** and some cards for testing purposes.

    docker exec -it backend node seed/seed.js   


### 3. Start the Frontend

```bash
cd frontend-react
pnpm install
pnpm dev
