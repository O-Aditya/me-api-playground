# Me-API Playground

A full-stack personal profile management system demonstrating modern web development with a **RESTful API backend** and **interactive Next.js frontend**.

## 🌟 Features

- **Complete Profile API** - Personal information, education, social links
- **Project Showcase** - Display projects with skill-based filtering
- **Skills Management** - Track technical skills with proficiency levels
- **Work Experience** - Employment history timeline
- **Advanced Search** - Full-text search across all content
- **Top Skills Analytics** - Most frequently used technologies
- **Modern UI** - Responsive design with Tailwind CSS
- **Type-Safe** - Full TypeScript implementation

## 🏗️ Architecture

### Backend (Express.js + PostgreSQL)
- RESTful API design with comprehensive endpoints
- Prisma ORM for type-safe database operations
- PostgreSQL with optimized indexes
- Input validation with Joi
- Security: Helmet.js, CORS, rate limiting
- Structured logging with Winston

### Frontend (Next.js 14)
- App Router with React Server Components
- Responsive design with Tailwind CSS
- TypeScript for type safety
- API client with error handling
- Loading and error states

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** 14+ (or cloud database)
- **pnpm** (optional)

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/me-api-playground.git
cd me-api-playground
```

### 2. Backend Setup

```bash
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database URL

# Setup database (choose one option):

# Option A: Use Docker Compose (easiest)
docker-compose up -d

# Option B: Use cloud database (Neon, Supabase, Railway)
# Update DATABASE_URL in .env with your connection string

# Run migrations
npm run migrate

# Seed sample data
npm run seed

# Start backend server
npm run dev
```

Backend runs at: **http://localhost:3001**

### 3. Frontend Setup

```bash
cd ../
npm install

# Start frontend
npm run dev
```

Frontend runs at: **http://localhost:3000**

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/profile` | Get complete profile |
| POST | `/api/profile` | Create profile |
| PUT | `/api/profile/:id` | Update profile |
| DELETE | `/api/profile/:id` | Delete profile |
| GET | `/api/projects` | List all projects |
| GET | `/api/projects?skill=X` | Filter projects by skill |
| GET | `/api/projects/:id` | Get project by ID |
| GET | `/api/skills` | List all skills |
| GET | `/api/skills/top` | Get top skills |
| GET | `/api/work` | List work experience |
| GET | `/api/search?q=X` | Full-text search |

## 🧪 Example API Calls

```bash
# Health check
curl http://localhost:3001/api/health

# Get profile
curl http://localhost:3001/api/profile

# Filter projects by Python
curl "http://localhost:3001/api/projects?skill=Python"

# Search
curl "http://localhost:3001/api/search?q=backend"

# Get top skills
curl http://localhost:3001/api/skills/top
```

## 📁 Project Structure

```
me-api-playground/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment & database config
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Error handling, validation
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Logging, helpers
│   │   └── server.ts        # Express app
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.ts          # Sample data
│   ├── .env                 # Environment variables
│   └── package.json
├── src/
│   ├── app/
│   │   ├── projects/        # Projects page
│   │   ├── search/          # Search page
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   ├── ProfileCard.tsx  # Profile info card
│   │   ├── ProjectCard.tsx  # Project display
│   │   └── SkillTag.tsx     # Skill badge
│   └── lib/
│       └── api.ts           # API client
└── README.md
```

## 🗄️ Database Schema

### Profile
- Personal information
- Education
- Social links (GitHub, LinkedIn, Portfolio)

### Skills
- Skill name
- Proficiency level (Expert, Advanced, Intermediate)
- Years of experience

### Projects
- Title, description, link
- Skills used (JSONB array)
- Start/end dates

### Work Experience
- Company, role
- Employment dates
- Description
- Current job flag

## 🎨 Frontend Pages

### Home (`/`)
- Profile card with quick stats
- Skills showcase
- Recent projects
- Work experience timeline

### Projects (`/projects`)
- All projects with grid layout
- Skill-based filtering dropdown
- Project cards with details

### Search (`/search`)
- Full-text search input
- Categorized results:
  - Projects
  - Skills
  - Work experience

## 🛠️ Development Scripts

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run migrate  # Run database migrations
npm run seed     # Seed sample data
npm run studio   # Open Prisma Studio (DB GUI)
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production server
npm run lint     # Run ESLint
```

## 🚀 Deployment

### Backend - Railway

1. Create account at [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL service
4. Deploy from GitHub:
   - Set root directory to `/backend`
   - Add environment variables
5. Run migrations in Railway console

### Frontend - Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Import repository
3. Set root directory to `/`
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```
5. Deploy

## 🔐 Security Features

- **Helmet.js** - Security headers
- **CORS** - Configured cross-origin access
- **Rate Limiting** - 100 requests/hour per IP
- **Input Validation** - Joi schemas
- **Parameterized Queries** - SQL injection prevention
- **Error Handling** - No sensitive data exposure

## 📚 Tech Stack

### Backend
- Node.js + Express.js
- PostgreSQL 14+
- Prisma ORM
- TypeScript
- Joi (validation)
- Winston (logging)
- Helmet.js (security)

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Fetch API

## 🐛 Troubleshooting

### Backend won't start
- Check if PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Run `npm run migrate` to ensure database is set up

### Frontend shows error
- Ensure backend is running on port 3001
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS settings in backend

### Database connection fails
- For Docker: Run `docker-compose up -d`
- For cloud DB: Verify connection string
- Check firewall/network settings

## 📝 Sample Data

The seed script creates:
- 1 sample profile (John Doe)
- 10 skills (Python, JavaScript, React, Node.js, etc.)
- 5 projects (E-commerce, Chat App, Task API, etc.)
- 3 work experiences

## 🎯 Future Enhancements

- [ ] JWT Authentication for write operations
- [ ] Pagination for large datasets
- [ ] GraphQL API option
- [ ] Real-time updates with WebSockets
- [ ] API documentation with Swagger/OpenAPI
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] Redis caching
- [ ] CI/CD pipeline

## 📄 License

MIT

## 👤 Author

Backend Developer Candidate

## 🙏 Acknowledgments

- Built following modern full-stack best practices
- Inspired by real-world portfolio and profile management systems
- Documentation structure follows industry standards
