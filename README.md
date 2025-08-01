# 🏢 Sardar IT - HRMS (Human Resource Management System)

A complete HRMS system designed for **Sardar IT**, built with **Laravel**, **Next.js**, and **MySQL**. It includes modules for employee management, attendance, payroll, and more, with a modern responsive UI and secure REST API.

---

## ✅ Features

- 👨‍💼 Employee CRUD Management  
- 🕒 Attendance Tracking (Daily/Monthly)  
- 📝 Leave Application & Approval  
- 💰 Payroll Calculation & Payslip  
- 🏢 Department & Designation Setup  
- 🔐 Role-Based Access (Admin, HR, Employee)  
- 🔑 Secure Login (Laravel Sanctum / JWT)  
- 📊 Dashboard with stats  
- 📱 Fully Responsive UI (Next.js + Tailwind CSS)  
- 🔄 REST API Integration

---

## ⚙️ Tech Stack

| Layer       | Technology     |
|-------------|----------------|
| Backend     | Laravel 10+    |
| Frontend    | Next.js 14+    |
| Database    | MySQL 8+       |
| UI Styling  | Tailwind CSS   |
| API Auth    |    JWT         |
| API Comm.   | Axios / Fetch  |

---

## 🚀 Installation Commands (Backend + Frontend)

```bash
# 🔧 Laravel Backend Setup
git clone [https://github.com/sardar-it/hrms-laravel.git](https://github.com/ahsan-alam-500/hrms.git)
cd hrms-laravel
composer install
cp .env.example .env
php artisan key:generate
# 🛠️ Edit .env and configure DB credentials
php artisan migrate --seed
php artisan serve

# 🌐 Next.js Frontend Setup
cd ..
git clone [https://github.com/sardar-it/hrms-frontend.git](https://github.com/ahsan-alam-500/hrms.git)
cd hrms-frontend
npm install
# Create .env.local file and add:
# NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
npm run dev
