# 🌐 GDG Community Social Media Platform

A **full-stack social blogging platform** developed for the GDG Team, designed to offer a LinkedIn-style user experience. 
---

## 🧠 Objective

To develop a clean, responsive, and feature-rich blogging platform for internal GDG use that enables:
- User authentication
- Friend requests and mutual connections
- Blog creation (text, images, videos)
- Engagement via likes, comments, and shares
- Smooth UI/UX experience across devices

---


## 🚀 Tech Stack

### 🖥️ Frontend
- **React.js**
- **Tailwind CSS**
- **Redux / Context API**
- **React Router**

### 🔙 Backend
- **Spring Boot**
- **Spring Security (JWT)**
- **Spring Data JPA**
- **MySQL**

### 🌐 Deployment
- **Frontend:** 
- **Backend:**

---

## 📚 Features

### 👤 User Management
- Register, Login (JWT-based)
- Edit profile, upload profile pic
- Add / Accept / Reject Friend Requests
- View mutual friends

### 📝 Blogging
- Create blogs with **text, image, or video**
- Tag friends in posts
- View a **feed of posts** from connected friends
- Like, comment, and share posts

### 🔔 Interactions (Engagement)
- Real-time commenting & likes (planned)
- Notifications (optional bonus)
- Clean responsive UI (mobile-first)

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


## 📁 Backend Structure

```
GDG_Community_Blog_Platform/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── gdg/
│   │   │           └── blog/
│   │   │               ├── config/                 # Configuration classes
│   │   │               │   ├── SecurityConfig.java
│   │   │               │   ├── SwaggerConfig.java
│   │   │               │   └── WebConfig.java
│   │   │               │
│   │   │               ├── controller/            # REST controllers
│   │   │               │   ├── AuthController.java
│   │   │               │   ├── PostController.java
│   │   │               │   ├── CommentController.java
│   │   │               │   └── UserController.java
│   │   │               │
│   │   │               ├── dto/                   # Data Transfer Objects
│   │   │               │   ├── request/
│   │   │               │   │   ├── LoginRequest.java
│   │   │               │   │   ├── RegisterRequest.java
│   │   │               │   │   └── PostRequest.java
│   │   │               │   └── response/
│   │   │               │       ├── AuthResponse.java
│   │   │               │       ├── PostResponse.java
│   │   │               │       └── UserResponse.java
│   │   │               │
│   │   │               ├── entity/               # JPA entities
│   │   │               │   ├── User.java
│   │   │               │   ├── Post.java
│   │   │               │   └── Comment.java
│   │   │               │
│   │   │               ├── repository/           # Data repositories
│   │   │               │   ├── UserRepository.java
│   │   │               │   ├── PostRepository.java
│   │   │               │   └── CommentRepository.java
│   │   │               │
│   │   │               ├── service/              # Business logic
│   │   │               │   ├── AuthService.java
│   │   │               │   ├── PostService.java
│   │   │               │   ├── UserService.java
│   │   │               │   └── CommentService.java
│   │   │               │
│   │   │               ├── security/             # Security related
│   │   │               │   ├── JwtTokenProvider.java
│   │   │               │   └── UserDetailsServiceImpl.java
│   │   │               │
│   │   │               └── util/                 # Utility classes
│   │   │                   └── ExceptionHandler.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       └── logback-spring.xml
│   │
│   └── test/                                    # Test classes
│       └── java/
│           └── com/
│               └── gdg/
│                   └── blog/
│                       ├── controller/
│                       ├── service/
│                       └── repository/
│
├── pom.xml                                      # Maven configuration
├── Dockerfile                                   # Docker configuration
└── README.md                                    # Backend documentation

```

## 📁 Frontend Structure

```
gdg-blog/
├── public/                                      # Static files
│   ├── images/
│   └── favicon.ico
│
├── src/
│   ├── app/                                    # Next.js 14 app directory
│   │   ├── (auth)/                             # Authentication routes
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (blog)/                             # Blog routes
│   │   │   ├── posts/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── create/
│   │   │       └── page.tsx
│   │   │
│   │   ├── layout.tsx                          # Root layout
│   │   └── page.tsx                            # Home page
│   │
│   ├── components/                             # Reusable components
│   │   ├── common/                             # Common components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   │
│   │   ├── layout/                            # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   ├── blog/                              # Blog components
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostList.tsx
│   │   │   └── CommentSection.tsx
│   │   │
│   │   └── auth/                              # Auth components
│   │       ├── LoginForm.tsx
│   │       └── RegisterForm.tsx
│   │
│   ├── lib/                                   # Utility functions
│   │   ├── api.ts                             # API client
│   │   ├── auth.ts                            # Auth utilities
│   │   └── utils.ts                           # Helper functions
│   │
│   ├── hooks/                                 # Custom hooks
│   │   ├── useAuth.ts
│   │   └── usePosts.ts
│   │
│   ├── styles/                                # Global styles
│   │   └── globals.css
│   │
│   └── types/                                 # TypeScript types
│       ├── post.ts
│       ├── user.ts
│       └── comment.ts
│
├── .env.local                                  # Environment variables
├── next.config.js                             # Next.js configuration
├── tailwind.config.js                         # Tailwind CSS configuration
├── tsconfig.json                              # TypeScript configuration
├── package.json                               # Dependencies
└── README.md                                  # Frontend documentation
