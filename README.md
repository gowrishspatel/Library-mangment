# Library Management App - README

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

This is a role-based Library Management System built using React, Redux Toolkit, Redux-Saga, and React Router v6. It was implemented as part of the Hexad Frontend Developer Assignment. The app demonstrates clean code, reusable components, SOLID principles, and proper state management practices.
🚀 Tech Stack
The project uses the following technologies:
- React 18: For building user interface components.
- Redux Toolkit: For predictable and centralized state management.
- Redux-Saga: For handling asynchronous flows such as borrowing, returning, and adding books.
- React Router v6: For routing between pages with protected/private routes.
- CSS (styles.css): For styling components and ensuring consistency across the app.
- Jest + React Testing Library: For unit and integration testing.
📂 Project Structure
The project follows a structured approach with clear separation of concerns:

src/
 ├── app/                   -> Store setup & root saga integration.
 │    ├── store.js          -> Configures Redux store with saga middleware.
 │    └── rootSaga.js       -> Combines and runs all sagas.

 ├── components/            -> Reusable UI components.
 │    ├── customComponents/ -> Generic components like Modal, Dropdown, Table.
 │    ├── BookList.jsx      -> Displays books available to borrow.
 │    ├── BorrowedList.jsx  -> Shows borrowed books.
 │    ├── AdminPanel.jsx    -> Allows admins to add books.
 │    └── Navbar.jsx        -> Navigation bar with role-based links.

 ├── features/library/      -> Redux slice, saga, and mock data for library.
 │    ├── librarySlice.js   -> State, reducers, and actions.
 │    ├── librarySaga.js    -> Async handlers for borrow, return, add.
 │    └── mockData.js       -> Initial mock data for books.

 ├── pages/                 -> Route-level components.
 │    ├── Home.jsx          -> Main landing page with book list.
 │    ├── Borrowed.jsx      -> Page for viewing borrowed books.
 │    ├── Admin.jsx         -> Admin-only page for book management.
 │    └── Login.jsx         -> Simple login with role selection.

 ├── styles/                -> Styling folder.
 │    └── styles.css        -> Global and reusable styles.

 ├── App.jsx                -> Root app, defines routes and guards.
 ├── index.js               -> Entry point, wraps app with Redux Provider.
 ├── utils.js               -> Helper utility functions.
 └── reportWebVitals.js     -> Performance monitoring.

🔑 Features
The app provides different features depending on user role.

Authentication & Roles:
- Users can log in by selecting User or Admin role.
- Role is stored in Redux state.

# User Role:
- Can view books and borrow up to 2 at a time.
- Can return previously borrowed books.

# Admin Role:
- Can add new books to the library inventory.
- Has access to Admin Panel tab only.

# State Management:
- Library state is managed with Redux Toolkit slice.
- Redux-Saga handles async side effects with delays simulating real API calls.

# UI & Navigation:
- Navbar changes depending on login role.
- Private routes prevent unauthorized access.
- Custom reusable components (Dialog, Table, Dropdown) improve reusability.

# Example Workflows
## As User:
 - Log in with role 'User'.
 - Borrow books (up to 2).
 - View borrowed books in the Borrowed page.
 - Return a book.

## As Admin:
 - Log in with role 'Admin'.
 - Add new books from Admin Panel.
 - View updated books in Home page.
 - assign the books for the user.
 - return tghe books if assigned to the user or himself

# Future Enhancements
- Replace mock data with backend API integration.
- Add book search, filtering, and pagination.
- Implement JWT/OAuth authentication.
- Add dark mode support.

# 📚 Hexa Library Management

A simple **Library Management System** built with **React, Redux Toolkit, Firebase Auth, and Redux-Saga**.  
Supports user and admin roles, book borrowing/returning, and Google/GitHub login.

---

## 🚀 Features
- 🔐 Authentication (Email/Password + Google/GitHub)
- 👥 Role-based login (Admin/User)
- 📖 Borrow and return books
- 📊 Manage stock of books
- 🌐 Deployed on **Vercel**

---

## 🛠️ Tech Stack
- **Frontend:** React, Redux Toolkit, Redux-Saga
- **Auth & DB:** Firebase
- **Deployment:** Vercel

---

## ⚡ Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/library-management.git
   cd library-management


# Author
Developed by Gowrish S Patel for Hexad Frontend Developer Assignment.
