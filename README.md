# MFLIX
MFLIX is a RESTful API application for managing and exploring movie data. It provides features such as user authentication, movie rating and commenting, managing favorite movies, and searching for movies using custom filters.

---

## Features

### Movies
- **Search movies** using filters like year, genre, language, or actor
- **Get top movies** by number of ratings or comments
- **Rate movies** (add or update your score)
  
### Comments
- **View comments** by movie or by user
- **Add, update, and delete comments** *(with role-based permissions)*

### Favorites
- **Manage favorites list** – add, update, and delete entries
- **Get a user’s favorites**
  
### Accounts
- **Create accounts** (users and admins)
- **Change roles** (`USER`, `PREMIUM_USER`, `ADMIN`)
- **Update password**
- **Block and Unblock**
- **Login securely** with JWT token
  
### Security
- **JWT and Basic Auth** for identity validation
- **Role-based Authorization** for access control
  
### Validation
- All requests are validated with Joi to ensure clean, consistent, and structured data

---

## Technologies
- **Node.js** – JavaScript runtime for building the backend
- **Express** – Framework for routing and handling HTTP requests
- **MongoDB** – NoSQL database to store movies, users, comments, and favorites
- **Joi** – Schema validation
- **JWT (jsonwebtoken)** – Secure authentication using tokens
- **Bcrypt** – Password hashing for user credentials
- **Morgan** – HTTP request logging
- **Winston** – Logging library for custom logs and log levels

---

## Getting Started
Follow these steps to set up the MFLIX project on your local machine

### Prerequisites
Make sure you have the following installed
- Node.js
- npm or Yarn
> To run this project, you need your own [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster.

### Clone the repository
```batch
git clone https://github.com/tomerpeceniski/MFLIX-API.git
cd mflix-api
```

### Environment Configuration
Create a `.env` file using `.env.example` as a template and fill in your own credentials.
#### MongoDB connection
1. Sign up at [mongodb.com](https://www.mongodb.com/)
2. Create a free shared cluster
3. Add a new database user (username + password) in the database access session
4. Add your IP (or use 0.0.0.0/0 for testing) in the network access session
5. Go to Clusters → Connect → Drivers → Copy the provided URI
6. In your `.env` file, paste your URI and fill it with your user data

### Install Dependencies
```npm install```

### Run the server
- ```npm run dev``` for running with the dev profile
- ```npm run start``` for running with the production

---

This project was created by [tomerpeceniski](https://www.linkedin.com/in/tomerpeceniski/)
