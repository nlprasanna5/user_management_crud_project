# 🚀 User Management System

A modern, professional **User Management System** built with React, TypeScript, and Material-UI. This application provides a complete CRUD (Create, Read, Update, Delete) interface for managing user data with a beautiful, responsive design and **persistent localStorage** for data storage.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3.7-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)

## ✨ Features

- ✅ **Create** new users with form validation
- ✅ **Read** and display users in a paginated table
- ✅ **Update** existing user information
- ✅ **Delete** users with confirmation dialog
- ✅ **Pagination** - 5, 10, or 25 users per page
- ✅ **LocalStorage Persistence** - Data survives page refreshes
- ✅ **Duplicate Detection** - Email and phone number validation
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

### **Data Storage**
- **LocalStorage** - Browser-based persistent storage
- **JSONPlaceholder API** - Initial seed data (10 sample users)
- **Auto-incrementing IDs** - Automatic unique ID generation for new users

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
├─ README.md                         # This file
├─ LOCALSTORAGE_INFO.md             # Detailed localStorage documentation
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ api/
│  │  └─ userApi.ts                  # API calls + localStorage logic
│  ├─ components/
│  │  ├─ UserForm.tsx                # create / update form
│  │  └─ UserList.tsx                # users table with pagination
│  ├─ config/
│  │  └─ formSchema.ts               # form fields & validation
│  ├─ types/
│  │  └─ user.ts                     # User interface types
│  ├─ assets/
│  │  └─ react.svg
│  ├─ App.tsx                        # Main app component
│  ├─ App.css                        # App styles
│  ├─ main.tsx                       # Entry point
│  └─ index.css                      # Global styles
└─ db.json                           # Legacy file (no longer used)
```

**Note**: `db.json` is kept for reference but is no longer used. All data is now stored in localStorage.

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

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

Simply start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173`

**That's it!** No backend server needed. 🎉

### How It Works

1. **First Visit**: App automatically fetches 10 sample users from JSONPlaceholder API
2. **Data Saved**: Users are saved to your browser's localStorage
3. **Offline Ready**: All subsequent operations work entirely offline
4. **Full CRUD**: Create, read, update, and delete users with full persistence

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

## 🗄️ Data Storage Architecture

This application uses **localStorage** for persistent data storage, providing a complete CRUD experience without needing a backend server.

### **How It Works**

1. **Initial Load**: On first visit, the app fetches 10 sample users from JSONPlaceholder API
2. **Automatic Save**: These users are automatically saved to localStorage
3. **Subsequent Loads**: All future visits load data directly from localStorage
4. **Persistence**: All CRUD operations (Create, Update, Delete) are saved to localStorage
5. **Survives Refreshes**: Data persists across browser sessions and page refreshes

### **Why LocalStorage?**

**JSONPlaceholder Limitation**:
- JSONPlaceholder is a **fake API** for testing and prototyping
- It simulates API responses but **doesn't persist data** on the server
- Creating/updating users returns success, but data is never saved
- Subsequent GET requests only return the original 10 users

**LocalStorage Benefits**:
- ✅ Real data persistence in your browser
- ✅ Works completely offline (after initial load)
- ✅ Fast performance (no network calls)
- ✅ Complete CRUD functionality
- ✅ Data survives browser refreshes
- ✅ Perfect for learning and prototyping

### **Storage Details**

- **Storage Key**: `user_management_users`
- **Format**: JSON array of user objects
- **Location**: Browser's localStorage (Application → Local Storage in DevTools)
- **ID Generation**: Auto-incrementing integers starting from the highest existing ID

### **View Your Data**

1. Open Browser Developer Tools (F12)
2. Go to: **Application** → **Local Storage** → `http://localhost:5173`
3. Look for key: `user_management_users`

### **Reset Data**

To clear all data and fetch fresh users from JSONPlaceholder:

**Option 1 - Browser DevTools**:
```
1. F12 → Application → Local Storage
2. Delete `user_management_users`
3. Refresh page
```

**Option 2 - Browser Console**:
```javascript
localStorage.removeItem('user_management_users');
window.location.reload();
```

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
- **Pagination** - 5, 10, or 25 users per page
- Alternating row colors for better readability
- Hover effects on table rows
- Icon buttons for Edit and Delete actions
- Tooltips for action buttons
- User count chip badge
- Empty state with helpful message
- Horizontal scrolling on overflow

### **3. API Service (`userApi.ts`)**
- LocalStorage integration for data persistence
- Initial data fetching from JSONPlaceholder API
- Auto-incrementing ID generation
- Proper error handling
- TypeScript typed responses
- CRUD operations:
  - `getUsers()` - Fetch from localStorage or API
  - `createUser()` - Add new user to localStorage
  - `updateUser()` - Update existing user in localStorage
  - `deleteUser()` - Remove user from localStorage
  - `clearAllUsers()` - Reset all data (utility)

### **4. Type Safety (`types/user.ts`)**
```typescript
export default interface User {
  id?: number;
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
| `npm run dev` | Start Vite development server at http://localhost:5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint code quality checks |

## 💾 Data Management

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
- **Loading States**: Spinner during data operations
- **Form Feedback**: Real-time validation and error messages
- **Pagination Controls**: 5, 10, or 25 users per page
- **Confirmation Dialogs**: Delete confirmation to prevent accidents
- **Empty States**: Helpful messages when no data exists
- **Duplicate Detection**: Prevents duplicate emails and phone numbers

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
User Action → Component → API Service → LocalStorage → Update State → Re-render UI
```

### **2. ID Generation**
- IDs are auto-incremented integers
- Generated by finding max ID and adding 1
- Starts from 1 if no users exist
- Guaranteed unique within localStorage

### **3. State Management**
- React `useState` for local component state
- Props drilling for component communication
- Data fetched from localStorage on mount
- Re-fetched after each CRUD operation

### **4. Form Handling**
- Controlled components with React state
- Schema-driven validation
- Dynamic field rendering
- Real-time error feedback

### **5. First-Time Experience**
```
1. User visits app for first time
2. localStorage is empty
3. App fetches 10 users from JSONPlaceholder
4. Users saved to localStorage
5. All future operations use localStorage
```

## 🔄 Migration to Real Backend

If you want to connect to a real backend later:

1. **Update API URL** in `userApi.ts`
2. **Remove localStorage functions**:
   - Remove `getLocalUsers()`
   - Remove `saveLocalUsers()`
   - Remove `getNextId()`
3. **Update CRUD functions** to use real API calls
4. **Keep transformation logic** if backend has different data structure
5. **Update error handling** as needed

The rest of the application will work seamlessly!

## 🚨 Important Notes

1. **No Backend Required**: App works completely without a backend server
2. **Data Persistence**: All data is stored in browser's localStorage
3. **Initial Seed Data**: 10 users fetched from JSONPlaceholder on first visit
4. **Port Number**: Frontend runs on `http://localhost:5173`
5. **Phone Validation**: Only numeric characters allowed in phone field
6. **ID Type**: Auto-incremented integer IDs
7. **Browser Storage**: Data is specific to each browser/device
8. **Storage Limit**: localStorage has a 5-10MB limit (more than enough for users)

## 🐛 Troubleshooting

### **No Users Showing**
Check if localStorage is enabled:
```javascript
// In browser console
localStorage.setItem('test', 'test');
localStorage.getItem('test'); // Should return 'test'
```

### **Network Error on First Load**
This is normal if JSONPlaceholder API is down. The app will:
- Show an error message
- Work normally once you add users manually
- All created users will persist in localStorage

### **Data Not Persisting**
Check browser settings:
- Ensure cookies/localStorage are enabled
- Private/Incognito mode clears data on close
- Check if localStorage quota is exceeded

### **Clear All Data**
To reset and start fresh:
```javascript
// In browser console
localStorage.removeItem('user_management_users');
window.location.reload();
```

### **Module Not Found**
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Documentation

- **[LOCALSTORAGE_INFO.md](./LOCALSTORAGE_INFO.md)** - Detailed localStorage implementation guide
- **[DUPLICATE_VALIDATION.md](./DUPLICATE_VALIDATION.md)** - Duplicate detection documentation
- **[IMPROVEMENTS.md](./IMPROVEMENTS.md)** - Future enhancement ideas

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using React, TypeScript, and Material-UI



