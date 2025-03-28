# MFLIX
MFLIX is a RESTful API application for managing and exploring movie data. It provides features such as user authentication, movie rating and commenting, managing favorite movies, and searching for movies using custom filters.

---

## Features
### Movies
- Find movies with customized filters  (year, genre, language, actor, etc.) 
- Retrieve most rated and most commented movies
- Submit and update ratings
### Comments
- View all comments from a movie
- View all comments from a user
- Add, update and delete comments (with role-based permissions)
### Favorites
- Add, update and delete movies from the favorites list
- Get favorites list from a user
### Accounts
- Add users and admins
- Update account role (USER, PREMIUM_USER, ADMIN)
- Update password with validation
- Block and unblock accounts
- Secure login with JWT token generation
### Security
- JWT and Basic Authentication for ensuring that the requester is a valid user
- Role-based Authorization for ensuring that the requester has permission to perform certain action
### Validation
In order to guarantee structure and constraints, all request inputs are validated. This ensures that the data persisted to the database is clean, consistent, and free from unexpected inputs.

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
