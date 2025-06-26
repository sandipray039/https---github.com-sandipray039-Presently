# Presently - Geolocation Based Attendance Registry System

A full-stack **Geolocation-based Attendance Registry System** that allows employees to securely check in, check out, and manage breaks only when they are within a predefined geofenced office location. The platform also provides a comprehensive Admin Dashboard for branch and employee management.

---

## 🚀 Features

### 👨‍💼 Employee Panel

* Protected dashboard with JWT-based authentication
* Geofencing logic using Latitude & Longitude to validate proximity to office
* Check In, Check Out, Break Start & Break End functionality
* View full personal attendance history (with charts)

### 🛠️ Admin Panel

* Add new employees and manage their data
* Create and manage multiple branches with geofence radius
* View today's attendance (with graphical analysis)
* View all employees' attendance by day or month
* Remove employees or branches

---

## 🧱 Tech Stack

### Frontend

* React.js (Functional Components)
* React Router DOM
* Context API (for Auth state management)
* Axios for API communication
* Recharts for attendance data visualization
* Bootstrap for UI

### Backend

* ASP.NET Core (.NET 8)
* Repository Pattern with Dependency Injection
* JWT Token Authentication (Bearer Scheme)
* Password encryption with **BCrypt**
* Role-based Authorization (Admin / Employee)
* Exception Handling & Validation Filters

### Database

* Microsoft SQL Server (SSMS)
* Entity Framework Core (Code-First approach)
* Migrations for schema evolution

---

## 📸 Screenshots

![Screenshot 2025-06-26 211630](https://github.com/user-attachments/assets/00ba7aa6-c974-42da-aa2c-4677051fad55)
![Screenshot 2025-06-26 211752](https://github.com/user-attachments/assets/02c49187-2822-4d45-ab6a-abf00a0c8349)
![Screenshot 2025-06-26 211810](https://github.com/user-attachments/assets/9dd6dafc-4ba5-4058-ac81-2488a8a66046)
![Screenshot 2025-06-26 211825](https://github.com/user-attachments/assets/2cf8b272-60d7-457e-a8bb-9748fa6608d1)
![Screenshot 2025-06-26 211901](https://github.com/user-attachments/assets/acf05a9f-9caa-451b-9dfe-c57c893ddfa7)
![Screenshot 2025-06-26 212227](https://github.com/user-attachments/assets/502cfccc-3266-4687-93e9-d9d78291f676)
![Screenshot 2025-06-26 212244](https://github.com/user-attachments/assets/02d1ee7d-0629-44eb-b08a-8ffd9e953b83)








---

## 🔐 Security & Architecture

* JWT tokens for stateless authentication
* Passwords encrypted using bcrypt hashing
* Protected frontend routes using role-based checks
* Structured using layered architecture with clean separation of concerns

---

## 📁 Folder Structure (Backend)

```
├── Controllers
├── DTOs
├── Models
├── Repositories
├── Services
├── Migrations
└── Program.cs / Startup.cs
```

---

## 🔧 Setup & Installation

### Backend (.NET Core)

```bash
cd Backend
update appsettings.json with your SQL connection string
dotnet ef database update
dotnet run
```

### Frontend (React)

```bash
cd Frontend
npm install
npm run dev
```

---

## 📌 Key Concepts Implemented

* Geolocation validation (with `navigator.geolocation` in browser)
* Radius calculation using Haversine formula
* DateTime parsing and time tracking
* React Context API for global state (auth)
* Admin-Employee authorization separation
* RESTful APIs with clean contracts (DTO)


## 📬 Contact

**Developer:** Sandip Kumar Ray
**Email:** [sandipray0391@gmail.com](mailto:sandipray0391@gmail.com)
**LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/sandip-kumar-ray-2bb78532a/)

---

## 🌟 Show your support

If you liked this project, consider giving it a ⭐ on GitHub!

---

## License

MIT License - use freely with credit.
