# Me-API Backend

Backend API for the Me-API Playground - A personal profile management system with RESTful API endpoints.

## 🚀 Features

- **Complete Profile API** - CRUD operations for personal profiles
- **Project Management** - List projects with skill-based filtering
- **Skills Tracking** - View all skills and get top skills analytics
- **Work Experience** - Retrieve employment history
- **Full-Text Search** - Search across projects, skills, and work experience
- **Advanced Query Capabilities** - Filter and aggregate data efficiently
- **Security** - Helmet.js, CORS, rate limiting
- **Validation** - Request validation with Joi
- **Logging** - Structured logging with Winston

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** 14+ (local or cloud instance)
- **Git**

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/me_api_db"
PORT=3001
NODE_ENV=development
```

### 3. Database Setup Options

#### Option A: Local PostgreSQL

**Install PostgreSQL:**
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **macOS**: `brew install postgresql@14`
- **Linux**: `sudo apt-get install postgresql-14`

**Create Database:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE me_api_db;

# Exit
\q
```

#### Option B: Cloud Database (Recommended for Quick Start)

Use a free PostgreSQL instance from:

**Neon (Recommended):**
1. Go to https://neon.tech
2. Create free account
3. Create new project
4. Copy connection string
5. Update `DATABASE_URL` in `.env`

**Supabase:**
1. Go to https://supabase.com
2. Create free account
3. Create new project
4. Get connection string from Settings → Database
5. Update `DATABASE_URL` in `.env`

**Railway:**
1. Go to https://railway.app
2. Create account
3. Add PostgreSQL service
4. Copy connection string
5. Update `DATABASE_URL` in `.env`

### 4. Run Database Migrations

```bash
npm run migrate
```

This creates all necessary tables with proper schema and indexes.

### 5. Seed Database (Optional)

Populate database with sample data:

```bash
npm run seed
```

This creates:
- 1 sample profile (John Doe)
- 10 skills (Python, JavaScript, React, etc.)
- 5 projects
- 3 work experiences

### 6. Start Development Server

```bash
npm run dev
```

Server runs at: http://localhost:3001

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Profile
```
GET    /api/profile          # Get complete profile with relations
POST   /api/profile          # Create new profile
PUT    /api/profile/:id      # Update profile
DELETE /api/profile/:id      # Delete profile
```

### Projects
```
GET /api/projects             # List all projects
GET /api/projects?skill=X     # Filter projects by skill
GET /api/projects/:id         # Get specific project
```

### Skills
```
GET /api/skills               # List all skills
GET /api/skills/top           # Get most frequently used skills
```

### Work Experience
```
GET /api/work                 # List work experience
```

### Search
```
GET /api/search?q=X           # Full-text search across all data
```

## 🧪 Example API Calls

### Get Profile
```bash
curl http://localhost:3001/api/profile
```

### Filter Projects by Skill
```bash
curl "http://localhost:3001/api/projects?skill=Python"
```

### Get Top Skills
```bash
curl http://localhost:3001/api/skills/top
```

### Search
```bash
curl "http://localhost:3001/api/search?q=backend"
```

## 📦 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts       # Prisma client
│   │   └── environment.ts    # Environment config
│   ├── controllers/
│   │   ├── profileController.ts
│   │   ├── projectController.ts
│   │   ├── skillController.ts
│   │   ├── workController.ts
│   │   └── searchController.ts
│   ├── middleware/
│   │   ├── errorHandler.ts   # Error handling
│   │   └── validation.ts     # Request validation
│   ├── routes/
│   │   └── api.ts            # API routes
│   ├── utils/
│   │   └── logger.ts         # Winston logger
│   └── server.ts             # Express app entry point
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
├── .env                      # Environment variables
└── package.json
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data
- `npm run studio` - Open Prisma Studio (database GUI)
- `npm test` - Run tests

## 🗄️ Database Schema

### Profile Table
- `id` - Unique identifier
- `name` - Full name
- `email` - Email (unique)
- `education` - Educational background
- `github_url`, `linkedin_url`, `portfolio_url` - Social links

### Skills Table
- `id` - Unique identifier
- `profile_id` - Foreign key to profile
- `name` - Skill name
- `proficiency` - Skill level
- `years_experience` - Years of experience

### Projects Table
- `id` - Unique identifier
- `profile_id` - Foreign key to profile
- `title` - Project title
- `description` - Project description
- `link` - Project URL
- `skills_used` - Array of skills (JSONB)
- `start_date`, `end_date` - Project timeline

### Work Experience Table
- `id` - Unique identifier
- `profile_id` - Foreign key to profile
- `company` - Company name
- `role` - Job title
- `start_date`, `end_date` - Employment period
- `description` - Role description
- `is_current` - Currently employed flag

## 🚀 Deployment

### Railway Deployment

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and deploy:
```bash
railway login
railway init
railway up
```

3. Add PostgreSQL:
```bash
railway add postgresql
```

4. Set environment variables in Railway dashboard

### Environment Variables for Production
```env
DATABASE_URL=<your-production-db-url>
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-frontend-domain.com
JWT_SECRET=<strong-secret-key>
```

## 🔐 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - 100 requests per hour per IP
- **Input Validation** - Joi schema validation
- **Error Handling** - Consistent error responses
- **SQL Injection Prevention** - Parameterized queries via Prisma

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "status": 400
  }
}
```

## 🐛 Troubleshooting

### Database Connection Issues

**Error: `Can't reach database server`**
- Check if PostgreSQL is running
- Verify DATABASE_URL in `.env`
- Check firewall settings

**Error: `Database does not exist`**
- Create database: `CREATE DATABASE me_api_db;`
- Or use cloud database

### Port Already in Use

**Error: `Port 3001 is already in use`**
- Change PORT in `.env`
- Or kill process: `npx kill-port 3001`

## 📚 Learn More

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📄 License

MIT
