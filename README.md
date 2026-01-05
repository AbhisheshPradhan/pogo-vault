# 🎮 Pogo Vault

A full-stack Pokémon GO collection tracker with shared TypeScript types. Built with PostgreSQL, Express, Prisma, React, and Vite—fully orchestrated with Docker.

---

## 📁 Project Structure

```
pogo-vault/
├── backend/          # Express API + Prisma ORM
├── frontend/         # React + Vite + Tailwind CSS
├── shared/           # Shared TypeScript types
├── docker-compose.yml
└── README.md
```

---

## 🚀 Quick Start (Docker)

### Prerequisites

-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)
-   [Git](https://git-scm.com/)

### 1. Clone & Start

```bash
git clone https://github.com/AbhisheshPradhan/pogo-vault.git
cd pogo-vault
docker compose up --build
```

### 2. Access Services

| Service         | URL                   |
| --------------- | --------------------- |
| **Frontend**    | http://localhost:3000 |
| **Backend API** | http://localhost:4000 |
| **Database**    | localhost:5432        |

### 3. Prisma Studio (Optional)

```bash
docker compose exec backend npx prisma studio
```

Opens at http://localhost:5555

---

## 🛠️ Development Workflow

### Rebuild After Installing Packages

```bash
# Frontend only
docker compose up --build frontend

# Backend only
docker compose up --build backend

# Clean rebuild (if things break)
docker compose build --no-cache
docker compose up
```

### Database Management

**Apply schema changes:**

```bash
docker compose exec backend npx prisma db push
```

**Reset database & re-seed:**

```bash
docker compose exec backend npx prisma migrate reset
```

**Generate Prisma client after schema changes:**

```bash
docker compose exec backend npx prisma generate
```

---

## 🐙 Git Workflow

### Pushing Changes

```bash
# 1. Check status
git status

# 2. Stage all changes
git add .

# 3. Commit with descriptive message
git commit -m "feat: add collection drag-and-drop ordering"

# 4. Push to main branch
git push origin main
```

### Pulling Updates

```bash
git pull origin main
docker compose up --build
```

---

## 🔧 Environment Variables

### Backend `.env` (Docker auto-configured)

```env
DATABASE_URL="postgresql://user:password@db:5432/mydb?schema=public"
PORT=4000
```

### Frontend `.env`

```env
VITE_API_URL="http://localhost:4000"
```

> **Note:** The repository includes `.env` files pre-configured for Docker. For local development outside Docker, update hostnames accordingly.

---

## 📦 Manual Installation (Without Docker)

If you prefer running services locally:

### 1. Install Dependencies

```bash
# Root
npm install

# Backend
cd backend
npm install
npx prisma generate

# Frontend
cd ../frontend
npm install
```

### 2. Start PostgreSQL

Ensure PostgreSQL is running on `localhost:5432` with:

-   **User:** `user`
-   **Password:** `password`
-   **Database:** `mydb`

### 3. Run Services

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm run dev
```

---

## 🗂️ Key Features

-   ✅ **Shared TypeScript types** between frontend and backend
-   ✅ **900+ Pokémon** auto-seeded with variants (shiny, shadow, mega, etc.)
-   ✅ **Collection management** with drag-and-drop ordering
-   ✅ **Admin panel** for toggling Pokémon availability
-   ✅ **Dark mode** support
-   ✅ **Responsive design** with Tailwind CSS

---

## 🧪 Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, @dnd-kit |
| **Backend**  | Node.js, Express, TypeScript, Prisma            |
| **Database** | PostgreSQL 16                                   |
| **DevOps**   | Docker, Docker Compose                          |

---

## 📝 Common Commands

```bash
# View logs
docker compose logs -f

# Stop all services
docker compose down

# Remove volumes (clears database)
docker compose down -v

# Access backend shell
docker compose exec backend sh

# Access frontend shell
docker compose exec frontend sh
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 🐛 Troubleshooting

**Port already in use:**

```bash
docker compose down
# Change ports in docker-compose.yml if needed
```

**Database connection failed:**

```bash
docker compose down
docker compose up --build
```

**Frontend can't reach backend:**

-   Ensure `VITE_API_URL` in frontend `.env` is `http://localhost:4000`
-   Check backend is running: `docker compose logs backend`

---

## 👤 Author

**Abhishesh Pradhan**

-   GitHub: [@AbhisheshPradhan](https://github.com/AbhisheshPradhan)

---

⭐ **Star this repo** if you find it useful!
