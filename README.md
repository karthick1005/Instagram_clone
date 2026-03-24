<div align="center">
  <img src="public/logo.png" alt="Instagram Clone Logo" width="80" />
  <h1>Instagram Clone</h1>
  <p>A full-stack Instagram-inspired social media application built with React, Firebase, and Vite.</p>

  ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
  ![Firebase](https://img.shields.io/badge/Firebase-10.12.0-FFCA28?logo=firebase&logoColor=black)
  ![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?logo=vite&logoColor=white)
  ![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.8.2-319795?logo=chakraui&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-green)
  ![Deployment](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)
</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Live Demo](#live-demo)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Set Up Firebase](#3-set-up-firebase)
  - [4. Configure Environment Variables](#4-configure-environment-variables)
  - [5. Run the Development Server](#5-run-the-development-server)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Firebase Data Model](#firebase-data-model)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Instagram Clone is a feature-rich social media web application that replicates the core experience of Instagram. Users can create accounts, upload photos with filters, interact with posts through likes and comments, follow other users, and manage their profiles — all powered by a real-time Firebase backend.

---

## Features

| Category | Features |
|---|---|
| **Authentication** | Email/password sign-up & login, Google OAuth |
| **User Profiles** | Profile picture upload, username & bio editing, follower/following counts |
| **Posts** | Create posts with image upload, delete own posts, view timestamps |
| **Image Filters** | Apply filters and adjust intensity via sliders before posting |
| **Feed** | Chronological home feed with suggested users |
| **Interactions** | Like/unlike posts and comments, add & view comments |
| **Saved Posts** | Save and unsave posts to a personal collection |
| **Stories** | Stories component on the home feed |
| **Navigation** | Sidebar navigation with route-based page transitions |
| **Notifications** | Real-time toast notifications for all user actions |
| **Dark Theme** | Full dark-mode UI matching Instagram's aesthetic |

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| [React](https://reactjs.org/) | 18.2.0 | UI library |
| [Vite](https://vitejs.dev/) | 5.2.0 | Build tool & dev server |
| [React Router DOM](https://reactrouter.com/) | 6.23.1 | Client-side routing |
| [Chakra UI](https://chakra-ui.com/) | 2.8.2 | Accessible component library |
| [Material UI](https://mui.com/) | 6.1.0 | Material Design components |
| [Framer Motion](https://www.framer.com/motion/) | 11.2.2 | Animations |
| [React Icons](https://react-icons.github.io/react-icons/) | 5.2.1 | Icon library |
| [Zustand](https://zustand-demo.pmnd.rs/) | 4.5.2 | Global state management |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | 10.0.5 | Toast notifications |

### Backend & Infrastructure
| Technology | Version | Purpose |
|---|---|---|
| [Firebase Authentication](https://firebase.google.com/docs/auth) | 10.12.0 | User auth (Email + Google) |
| [Cloud Firestore](https://firebase.google.com/docs/firestore) | 10.12.0 | NoSQL real-time database |
| [Firebase Storage](https://firebase.google.com/docs/storage) | 10.12.0 | Image hosting |
| [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks) | 5.1.1 | Firebase hooks for React |

### Developer Tools
| Technology | Purpose |
|---|---|
| [ESLint](https://eslint.org/) | Code linting & style enforcement |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | React Fast Refresh |

---

## Live Demo

> Deployed on [Vercel](https://vercel.com) — visit the live application at the URL configured in your Vercel project.

---

## Prerequisites

Ensure the following are installed on your machine before getting started:

- **Node.js** v16 or later — [Download](https://nodejs.org/)
- **npm** v8 or later (bundled with Node.js)
- A **Firebase** account — [Sign up free](https://firebase.google.com/)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/karthick1005/Instagram_clone.git
cd Instagram_clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable the following services:
   - **Authentication** → Sign-in methods → Enable **Email/Password** and **Google**.
   - **Firestore Database** → Create database (start in production mode, then update rules as needed).
   - **Storage** → Get started.
3. In your Firebase project settings, add a **Web App** and copy the Firebase config object.
4. **(Optional but recommended)** Configure Firestore Security Rules to protect your data:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow delete: if request.auth.uid == resource.data.userid;
      match /comments/{commentId} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
```

5. **(Optional)** Configure Firebase Storage Rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

### 4. Configure Environment Variables

Create a `.env` file in the project root directory (this file is already in `.gitignore` and will not be committed):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH=your_auth_domain
VITE_PROJECTID=your_project_id
VITE_STORAGEBUCKET=your_storage_bucket
VITE_MESSAGINGSENDER=your_messaging_sender_id
VITE_APPID=your_app_id
VITE_MEASUREMENTID=your_measurement_id
```

> ⚠️ **Never commit your `.env` file or expose your Firebase credentials publicly.**

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH` | Firebase auth domain (e.g. `your-project.firebaseapp.com`) |
| `VITE_PROJECTID` | Firebase project ID |
| `VITE_STORAGEBUCKET` | Firebase Storage bucket (e.g. `your-project.appspot.com`) |
| `VITE_MESSAGINGSENDER` | Firebase Cloud Messaging sender ID |
| `VITE_APPID` | Firebase app ID |
| `VITE_MEASUREMENTID` | Google Analytics measurement ID |

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:5173** with Hot Module Replacement (HMR) enabled.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start Vite dev server with HMR at `localhost:5173` |
| Build | `npm run build` | Compile and bundle the app for production into `dist/` |
| Preview | `npm run preview` | Serve the production build locally for testing |
| Lint | `npm run lint` | Run ESLint across all `.js` and `.jsx` files |

---

## Project Structure

```
Instagram_clone/
├── public/                    # Static assets (images, icons, favicon)
├── src/
│   ├── main.jsx               # React application entry point
│   ├── App.jsx                # Root component with Chakra UI provider
│   ├── index.css              # Global styles
│   ├── Firebase/
│   │   └── Firebase.js        # Firebase app initialization & exports
│   ├── Routes/
│   │   └── Router.jsx         # Application route definitions
│   ├── Hooks/                 # Custom React hooks (Firebase interactions)
│   │   ├── Usesignupandpass.js  # Sign-up, login, user data hooks
│   │   ├── Post.js              # Post creation & deletion
│   │   ├── Photos.js            # Image upload to Firebase Storage
│   │   ├── comments.js          # Comment creation & management
│   │   └── updatelike.js        # Likes and follow/unfollow logic
│   ├── Pages/
│   │   ├── Authpage/          # Login & sign-up page
│   │   ├── HomePage/          # Main social feed
│   │   ├── Profilepage/       # User profile page
│   │   │   └── Post_open/     # Full-screen single post view
│   │   └── Component/         # Shared UI components
│   │       ├── Sidebar/       # Navigation sidebar
│   │       ├── PostUpload/    # Post creation modal
│   │       ├── Postgenerator/ # Feed post renderer
│   │       │   └── Post/      # Individual post card
│   │       ├── Filter/        # Image filter tools
│   │       │   ├── Slider/    # Filter intensity slider
│   │       │   ├── FilterPreview/ # Filter preview grid
│   │       │   └── Utilits/   # Filter utility functions
│   │       ├── Story/         # Stories bar component
│   │       ├── comment/       # Comment display component
│   │       ├── Menu_card/     # Post action menu
│   │       ├── EditProfile/   # Edit profile modal
│   │       └── Toast/         # Toast notification wrapper
│   ├── Toggle/                # Dark/light mode toggle
│   └── assets/                # Constants, icons, and default images
├── dist/                      # Production build output (generated)
├── .env                       # Environment variables (do not commit)
├── .eslintrc.cjs              # ESLint configuration
├── .gitignore                 # Git ignore rules
├── index.html                 # HTML entry point
├── package.json               # Project metadata and dependencies
├── vite.config.js             # Vite build configuration
└── vercel.json                # Vercel deployment configuration (SPA rewrites)
```

---

## Firebase Data Model

### `users` Collection

```
users/{uid}
├── uid:            string    — Firebase Auth user ID
├── email:          string    — User email address
├── username:       string    — Unique display username
├── fullname:       string    — User's full name
├── bio:            string    — Profile biography
├── profilepicurl:  string    — Firebase Storage URL for profile picture
├── follower:       string[]  — UIDs of users who follow this user
├── following:      string[]  — UIDs of users this user follows
├── posts:          string[]  — IDs of posts created by this user
├── saved:          string[]  — IDs of posts saved by this user
└── createdAt:      timestamp — Account creation time
```

### `posts` Collection

```
posts/{postId}
├── caption:   string    — Post caption text
├── img:       string[]  — Firebase Storage URLs for post images
├── likes:     string[]  — UIDs of users who liked this post
├── username:  string    — Username of post creator
├── userid:    string    — UID of post creator
└── time:      timestamp — Post creation time
```

### `posts/{postId}/comments` Subcollection

```
posts/{postId}/comments/{commentId}
├── comment:   string    — Comment text
├── likes:     string[]  — UIDs of users who liked this comment
├── userid:    string    — UID of commenter
├── username:  string    — Username of commenter
└── pic:       string    — Profile picture URL of commenter
```

---

## Deployment

This project is configured for zero-configuration deployment on **Vercel**.

### Deploy to Vercel

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Set the **Framework Preset** to `Vite`.
4. Add all environment variables from your `.env` file in the Vercel project settings under **Settings → Environment Variables**.
5. Deploy — Vercel will automatically run `npm run build` and serve the `dist/` directory.

> The included `vercel.json` configures SPA rewrites so that client-side routes (e.g. `/profile/:id`) load correctly on page refresh.

### Manual Build & Deploy

```bash
# Build the production bundle
npm run build

# Preview the build locally
npm run preview
```

The `dist/` folder can be hosted on any static file host (Netlify, AWS S3 + CloudFront, GitHub Pages, etc.).

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository.
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Commit your changes**: `git commit -m "feat: add your feature description"`
4. **Push to the branch**: `git push origin feature/your-feature-name`
5. **Open a Pull Request** against the `main` branch.

### Code Style

- Run `npm run lint` before submitting a PR — linting must pass with zero warnings.
- Follow the existing component and file naming conventions.
- Keep components focused and reusable; place shared components under `src/Pages/Component/`.

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 Karthick

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/karthick1005">Karthick</a>
</div>
