# Job Application Management System

A full-stack web application designed to streamline the job application process with role-based access for Candidates and HR.

---

## Features

### Candidate

* Apply for jobs through a detailed form
* Upload resume (PDF supported)
* Provide portfolio, GitHub, LinkedIn, and other details

### HR Dashboard

* Secure login for HR users
* View all applications
* Approve or reject candidates
* Organized data handling for efficient review

### System

* Role-based functionality (Candidate & HR)
* Full CRUD operations
* Resume storage and retrieval
* Clean UI with responsive design

---

## Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **Other Tools:** Multer (file upload), REST APIs

---

## Project Structure

```
hr-dashboard/
│
├── hr-frontend/     # React frontend
├── hr-backend/      # Node.js + Express backend
└── README.md
```

---

## Setup Instructions

### 🔹 1. Clone the Repository

```
git clone https://github.com/thearpit143/job-application-management-system.git
cd job-application-management-system
```

---

### 🔹 2. Backend Setup

```
cd hr-backend
npm install
npm start
```

---

### 🔹 3. Frontend Setup

```
cd hr-frontend
npm install
npm run dev
```

---

## Database Setup

* Install PostgreSQL
* Create a new database
* Update database connection settings in backend config file (`db.js` or `.env`)
* Start backend server

---

## Environment Variables (Recommended)

Change a file in `hr-backend/src/config/db.js`:

```
  user: 'postgres',
  host: 'localhost',
  database: 'hiring_portal',
  password: 'your password',
  port: 5432,
```

---

## Screenshots

*Add screenshots here to showcase:*

* Candidate Application Form
* HR Dashboard
* Approve/Reject Interface

---

## Future Enhancements

* JWT-based authentication & authorization
* Role-based access control improvements
* Email notifications for application status
* Pagination and search filters
* Deployment (Frontend + Backend hosting)

---

## Note

Database schema is not included in this repository.
To run the project, configure your own PostgreSQL database and update the backend connection settings.

---

## Author

**Arpit Chauhan**
B.Tech CSE

---

## Support

If you like this project, consider giving it a star on GitHub!
