# 🚀 User Management System

A modern, professional **User Management System** built with React, TypeScript, and Material-UI. This application provides a complete CRUD (Create, Read, Update, Delete) interface for managing user data with a beautiful, responsive design.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3.7-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)

## ✨ Features

- ✅ **Create** new users with form validation
- ✅ **Read** and display users in a beautiful table
- ✅ **Update** existing user information
- ✅ **Delete** users with confirmation
- ✅ **Form Validation** with real-time error feedback
- ✅ **Responsive Design** - works on mobile, tablet, and desktop
- ✅ **Professional UI** with gradient themes and animations
- ✅ **Toast Notifications** for user feedback
- ✅ **Phone Number Validation** - only numeric input allowed
- ✅ **Empty State** handling with helpful messages
- ✅ **Horizontal Scrolling** for table on small screens

## 🛠️ Tech Stack

### **Frontend**
- **React 19.2.0** - UI library for building user interfaces
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite 7.2.4** - Fast build tool and dev server

### **UI Framework & Styling**
- **Material-UI (MUI) 7.3.7** - React component library
  - `@mui/material` - Core components (Button, TextField, Table, etc.)
  - `@mui/icons-material` - Material Design icons
  - `@emotion/react` & `@emotion/styled` - CSS-in-JS styling solution

### **HTTP Client**
- **Axios 1.13.4** - Promise-based HTTP client for API calls

### **Backend (Mock)**
- **JSON Server 1.0.0-beta.5** - Full fake REST API with zero coding

### **Development Tools**
- **ESLint 9.39.1** - Code linting and quality checks
- **TypeScript ESLint 8.46.4** - TypeScript-specific linting rules
- **Vite Plugin React 5.1.1** - React Fast Refresh support

## 📁 Project Structure

```
react_crud_project/
├─ .gitignore
├─ package.json                      # dependencies & scripts
├─ tsconfig.json                     # TypeScript config
├─ vite.config.ts                    # Vite + React plugin config
├─ public/
│  ├─ index.html
│  └─ favicon.ico
├─ src/
│  ├─ api/
│  │  └─ userApi.ts                  # axios REST helpers
│  ├─ components/
│  │  ├─ UserForm.tsx                # create / update form
│  │  ├─ UserList.tsx                # users table / list
│  │  └─ ui/
│  │     ├─ Button.tsx
│  │     └─ EmptyState.tsx
│  ├─ config/
│  │  └─ formSchema.ts               # form fields & validation
│  ├─ hooks/
│  │  └─ useUsers.ts                 # reusable data hooks
│  ├─ types/
│  │  └─ user.ts                     # User interface types
│  ├─ pages/
│  │  └─ Home.tsx
│  ├─ styles/
│  │  └─ index.css                   # global styles
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ db.json                        # json-server data (mock DB)
└─ README.md
```

Notes:
- Files annotated with comments to indicate purpose.
- db.json typically contains a "users" array used by json-server.
- Add dotfiles (e.g., .eslintrc.json) or a CI config if needed.
- Keep module grouping (api, components, hooks, types, config) for clarity and scalability.
- Use consistent kebab/camel case naming for files and folders.
- Example small files: package.json scripts include "dev", "build", "preview", "lint".
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** 

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react_crud_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Running the Application

You need to run **two servers** simultaneously:

#### **1. Start the Backend (JSON Server)**

In the first terminal, run:
```bash
npx json-server src/db.json --port 4000
```

This starts the mock REST API server on `http://localhost:4000`

**Available Endpoints:**
- `GET /users` - Fetch all users
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

#### **2. Start the Frontend (Vite Dev Server)**

In a second terminal, run:
```bash
npm run dev
```

This starts the React development server on `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📦 Package Details

### **Core Dependencies**

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 19.2.0 | Core React library |
| `react-dom` | 19.2.0 | React DOM rendering |
| `@mui/material` | 7.3.7 | Material-UI components |
| `@mui/icons-material` | 7.3.7 | Material Design icons |
| `@emotion/react` | 11.14.0 | CSS-in-JS library for MUI |
| `@emotion/styled` | 11.14.1 | Styled components API |
| `axios` | 1.13.4 | HTTP client for API calls |

### **Development Dependencies**

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | 5.9.3 | TypeScript compiler |
| `vite` | 7.2.4 | Build tool and dev server |
| `@vitejs/plugin-react` | 5.1.1 | React Fast Refresh |
| `eslint` | 9.39.1 | Code linting |
| `json-server` | 1.0.0-beta.5 | Mock REST API server |

## 🎨 Features Breakdown

### **1. User Form Component (`UserForm.tsx`)**
- Dynamic form fields based on schema configuration
- Real-time validation with error messages
- Phone number input restricted to numeric values only
- Edit mode with pre-filled data
- Cancel functionality to exit edit mode
- Material-UI TextField components with icons
- Responsive two-column grid layout

### **2. User List Component (`UserList.tsx`)**
- Material-UI Table with styled headers
- Alternating row colors for better readability
- Hover effects on table rows
- Icon buttons for Edit and Delete actions
- Tooltips for action buttons
- User count chip badge
- Empty state with helpful message
- Horizontal scrolling on overflow

### **3. API Service (`userApi.ts`)**
- Centralized API calls using Axios
- Proper error handling
- TypeScript typed responses
- RESTful API pattern implementation

### **4. Type Safety (`types/user.ts`)**
```typescript
export interface User {
  id?: number | string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}
```

### **5. Form Validation (`config/formSchema.ts`)**
- Schema-based form configuration
- Pattern matching for email and phone
- Required field validation
- Custom error messages

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint code quality checks |

## 🌐 API Endpoints

The JSON Server provides the following REST endpoints:

### **GET /users**
Fetch all users
```bash
curl http://localhost:4000/users
```

### **POST /users**
Create a new user
```bash
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","phone":"1234567890","email":"john@example.com"}'
```

### **PUT /users/:id**
Update a user
```bash
curl -X PUT http://localhost:4000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","phone":"9876543210","email":"jane@example.com"}'
```

### **DELETE /users/:id**
Delete a user
```bash
curl -X DELETE http://localhost:4000/users/1
```

## 🎨 UI/UX Features

- **Gradient Theme**: Purple-blue gradient throughout the application
- **Responsive Typography**: Font sizes adjust based on screen size
- **Smooth Animations**: Hover effects and transitions
- **Toast Notifications**: Success/error messages for user actions
- **Loading States**: Spinner during data fetching
- **Form Feedback**: Real-time validation and error messages
- **Custom Scrollbar**: Styled scrollbar with gradient
- **Empty States**: Helpful messages when no data exists

## 🔧 Configuration

### **TypeScript Configuration**
- Strict type checking enabled
- Path aliases for cleaner imports
- Separate configs for app and node code

### **Vite Configuration**
- React plugin for Fast Refresh
- Optimized build settings
- Development server with HMR

### **ESLint Configuration**
- React-specific rules
- TypeScript integration
- Code quality enforcement

## 📝 How It Works

### **1. Data Flow**
```
User Action → Component → API Service → JSON Server → Response → Update State → Re-render UI
```

### **2. ID Generation**
- IDs are automatically generated by JSON Server
- Uses 4-character hexadecimal strings (e.g., "65e9", "c728")
- Guaranteed unique within the collection

### **3. State Management**
- React `useState` for local component state
- Props drilling for component communication
- No external state management library needed

### **4. Form Handling**
- Controlled components with React state
- Schema-driven validation
- Dynamic field rendering

## 🚨 Important Notes

1. **Two Servers Required**: Always run both JSON Server and Vite dev server
2. **Port Numbers**: 
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:4000`
3. **Data Persistence**: All data is stored in `src/db.json`
4. **Phone Validation**: Only numeric characters allowed in phone field
5. **ID Type**: JSON Server generates string IDs, not numeric

## 🐛 Troubleshooting

### **Network Error**
If you see "Network Error", ensure JSON Server is running:
```bash
npx json-server src/db.json --port 4000
```

### **Module Not Found**
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Port Already in Use**
Kill the process using the port or change the port number:
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill
```

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using React, TypeScript, and Material-UI



