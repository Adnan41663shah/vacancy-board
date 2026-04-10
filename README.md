# Job Board - MERN Stack Job Portal

A modern, feature-rich job board application built with the MERN stack, focusing on diversity and inclusion in the workplace. The platform provides an intuitive interface for job seekers to discover opportunities while offering comprehensive admin tools for job management.

## 🌟 Features

### Public Features (Job Seekers)
- **Modern Hero Section** with animated typing effect and floating card
- **Interactive Job Search** - Search by title, company, location, or description
- **Advanced Filtering** - Filter by location, job type, category, vacancy type, and date posted
- **Category Sidebar** - Browse jobs by category with real-time job counts and icons
- **Job Detail Modal** - View complete job information in an elegant modal
- **Connect Section** - Learn about connecting with organizations
- **Smooth Scrolling** - Navigate seamlessly between sections
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Pagination** - Efficient navigation through job listings
- **Futuristic Footer** - Modern footer with company information and links

### Admin Features
- **Secure Authentication** - JWT-based admin login system
- **Dashboard Analytics** - Real-time statistics (Total Jobs, This Week, etc.)
- **Job Management** - Create, edit, and delete job postings
- **Category Management** - Add and manage job categories with custom icons
- **CSV Export** - Export job listings to CSV format
- **Advanced Search & Filter** - Powerful filtering options for job management
- **Profile Management** - Update admin profile and change password
- **Responsive Admin Panel** - Mobile-friendly admin interface

## 🎨 UI/UX Highlights

- **Animated Typing Effect** - Dynamic heading animation on hero section
- **Floating Animations** - Smooth floating effects on interactive cards
- **Gradient Styling** - Beautiful gradient buttons and text effects
- **Modern Color Scheme** - Orange and purple gradient theme
- **Smooth Transitions** - Elegant animations throughout the application
- **Mobile-First Design** - Optimized for all screen sizes

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **express-rate-limit** for rate limiting
- **CORS** enabled for cross-origin requests

### Frontend
- **React 18** with Vite
- **React Router DOM** for navigation
- **Tailwind CSS** for styling
- **React Hook Form** for form management
- **Axios** for API calls
- **React Toastify** for notifications
- **Context API** for state management
- **Lucide React** for modern icons
- **React Icons** for additional icons

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Quick Start

1. **Clone the repository:**
```bash
git clone <repository-url>
cd vacancy_board
```

2. **Install all dependencies:**
```bash
npm run install-all
```

Or install separately:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Backend Setup:**

Navigate to backend directory:
```bash
cd backend
```

Create `.env` file:
```bash
cp .env.example .env
```

Update `.env` with your configuration:
```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Create admin user:
```bash
npm run create-admin
```

(Optional) Seed sample jobs and categories:
```bash
npm run seed
npm run seed-categories
```

4. **Frontend Setup:**

Navigate to frontend directory:
```bash
cd frontend
```

Create `.env` file (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Development Mode

**Option 1: Run both servers concurrently (from root):**
```bash
npm run dev
```

**Option 2: Run separately:**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

## 🔐 Default Admin Credentials

After running `npm run create-admin` in the backend directory:
- **Username**: `admin`
- **Password**: `Password@123`
- **Email**: `admin@cloudblitz.in`

⚠️ **Important**: Change the password immediately after first login!

## 📁 Project Structure

```
vacancy_board/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js   # Admin operations
│   │   ├── categoryController.js # Category management
│   │   └── jobController.js     # Job CRUD operations
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   ├── errorHandler.js      # Error handling
│   │   └── validate.js          # Input validation
│   ├── models/
│   │   ├── Admin.js             # Admin model
│   │   ├── Category.js          # Category model
│   │   └── Job.js               # Job model
│   ├── routes/
│   │   ├── adminRoutes.js       # Admin routes
│   │   ├── categoryRoutes.js    # Category routes
│   │   └── jobRoutes.js         # Job routes
│   ├── utils/
│   │   ├── autoDeleteJobs.js    # Auto-delete expired jobs
│   │   ├── checkAdmin.js        # Check admin existence
│   │   ├── createAdmin.js       # Create admin user
│   │   ├── deleteAllAdmins.js   # Utility script
│   │   ├── seed.js              # Seed sample jobs
│   │   └── seedCategories.js    # Seed categories
│   └── server.js                # Main server file
│
└── frontend/
    ├── public/
    │   ├── handsome-man-with-laptop-removebg-preview.png
    │   ├── image.png
    │   └── static assets
    ├── src/
    │   ├── components/
    │   │   ├── admin/
    │   │   │   ├── AdminHeader.jsx
    │   │   │   ├── AdminSidebar.jsx
    │   │   │   ├── CategoryForm.jsx
    │   │   │   ├── DeleteModal.jsx
    │   │   │   ├── JobForm.jsx
    │   │   │   ├── JobsTable.jsx
    │   │   │   └── StatsCards.jsx
    │   │   ├── auth/
    │   │   │   └── LoginModal.jsx
    │   │   ├── common/
    │   │   │   ├── ConnectSection.jsx
    │   │   │   ├── EmptyState.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Header.jsx
    │   │   │   ├── HeroHeader.jsx
    │   │   │   ├── Loading.jsx
    │   │   │   └── Pagination.jsx
    │   │   └── jobs/
    │   │       ├── CategorySidebar.jsx
    │   │       ├── JobCard.jsx
    │   │       ├── JobFilters.jsx
    │   │       ├── JobGrid.jsx
    │   │       └── JobModal.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx  # Authentication context
    │   │   └── JobContext.jsx    # Job data context
    │   ├── hooks/
    │   │   └── useDebounce.js   # Debounce hook
    │   ├── pages/
    │   │   ├── AdminDashboard.jsx
    │   │   └── HomePage.jsx
    │   ├── services/
    │   │   ├── api.js            # API configuration
    │   │   ├── authService.js    # Auth API calls
    │   │   ├── categoryService.js # Category API calls
    │   │   └── jobService.js     # Job API calls
    │   └── utils/
    │       ├── constants.js      # App constants
    │       ├── formatDate.js     # Date formatting
    │       └── formatDescription.js # Text formatting
    ├── tailwind.config.js
    └── vite.config.js
```

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/jobs` - Get paginated jobs with filters
  - Query params: `page`, `pageSize`, `search`, `location`, `type`, `category`, `vacancyType`, `datePosted`
- `GET /api/jobs/:id` - Get single job details
- `GET /api/categories` - Get all categories

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Register new admin
- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/profile` - Update profile
- `PUT /api/admin/change-password` - Change password

### Job Management (Protected)
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `GET /api/admin/jobs/export` - Export jobs to CSV

### Category Management (Protected)
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## 🎯 Key Features Implemented

### User Interface
✅ Modern hero section with typing animation  
✅ Floating card animations  
✅ Gradient buttons and text effects  
✅ Category sidebar with icons and counts  
✅ Responsive mobile-first design  
✅ Smooth scrolling navigation  
✅ Futuristic footer design  
✅ Connect section with call-to-action buttons  

### Functionality
✅ Real-time job search with debouncing  
✅ Advanced filtering system  
✅ Category-based job browsing  
✅ Pagination for job listings  
✅ Job detail modal  
✅ Admin authentication  
✅ Job CRUD operations  
✅ Category management  
✅ CSV export functionality  
✅ Dashboard statistics  
✅ Form validation  
✅ Error handling  
✅ Loading states  
✅ Toast notifications  

## 🌐 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/vacancy_board
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vacancy_board

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Development Scripts

### Root Level
- `npm run install-all` - Install all dependencies
- `npm run dev` - Run both backend and frontend concurrently
- `npm run dev:backend` - Run only backend
- `npm run dev:frontend` - Run only frontend
- `npm run build` - Build frontend for production
- `npm start` - Start backend in production mode

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run create-admin` - Create admin user
- `npm run seed` - Seed sample jobs
- `npm run seed-categories` - Seed sample categories

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Design System

### Colors
- **Primary Orange**: `#f97316` (orange-500)
- **Primary Purple**: `#9333ea` (purple-600)
- **Gradients**: Orange to Purple transitions
- **Background**: Gray-50 for light sections, gradient for hero/footer

### Typography
- **Headings**: Bold, responsive sizing
- **Body**: Regular weight, optimized for readability
- **Font Family**: System fonts (sans-serif)

### Components
- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: White background with shadow and rounded corners
- **Modals**: Centered overlay with backdrop
- **Forms**: Clean input fields with validation states

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

MIT License

## 👥 Support

For issues, questions, or contributions, please contact the development team.

---

**Built with ❤️ by the Job Board Team**
