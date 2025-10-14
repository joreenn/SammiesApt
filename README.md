# 🏠 Tenant Management System

A full-stack web application for managing tenants with complete CRUD operations, built with **Laravel** (backend) and **React** (frontend).

## ✨ Features

### 🎯 Core Functionality
- ✅ **Create** tenants with detailed information
- ✅ **Read/View** tenant list and individual details
- ✅ **Update** tenant information with inline editing
- ✅ **Delete** tenants with confirmation
- ✅ **Avatar Upload** with image preview
- ✅ **Real-time Validation** (frontend + backend)

### 🛡️ Advanced Validation
- **Name**: Letters, spaces, dots, hyphens, apostrophes only (no pure numbers)
- **Room**: Alphanumeric only, **unique per tenant**, no symbols or negatives
- **Contact**: Philippine format (`09XXXXXXXXX` or `+639XXXXXXXXX`)
- **Email**: Valid format, **unique per tenant**
- **Avatar**: JPEG, PNG, GIF, WebP, AVIF (max 5MB)

### 🎨 User Interface
- Clean, modern design with responsive tables
- Modal dialogs for add/edit operations
- Toast notifications for success/error messages
- Avatar display with fallback images
- Edit mode toggle in view modal

## 🚀 Tech Stack

### Backend
- **Laravel 12.x** - PHP framework
- **MySQL** - Database
- **RESTful API** - API architecture
- **Storage** - File system for avatar uploads

### Frontend
- **React 18** - UI library
- **Fetch API** - HTTP requests
- **Inline CSS** - Styling

## 📋 Prerequisites

- PHP 8.2+
- Composer
- MySQL
- XAMPP (or similar local server)
- Node.js (optional, for React development)

## 🔧 Installation

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/tenant-management-system.git
cd tenant-management-system
```

### 2. Backend Setup (Laravel)

```bash
cd api

# Install dependencies
composer install

# Create .env file
copy .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tenant_management
DB_USERNAME=root
DB_PASSWORD=

# Create database (in MySQL)
CREATE DATABASE tenant_management;

# Run migrations
php artisan migrate

# Create storage link
php artisan storage:link

# Start server
php artisan serve --port=8000
```

### 3. Frontend Setup

The frontend is a single JSX file that can be opened directly in the browser through a web server (e.g., XAMPP).

1. Place `TenantManagement.jsx` in your web root
2. Create an `index.html` that imports the React component
3. Open `http://localhost/SammiesAptt/index.html`

## 🗂️ Project Structure

```
SammiesAptt/
├── api/                          # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── TenantController.php
│   │   └── Models/
│   │       └── Tenant.php
│   ├── config/
│   │   ├── cors.php
│   │   └── filesystems.php
│   ├── database/
│   │   └── migrations/
│   │       └── create_tenants_table.php
│   ├── routes/
│   │   └── api.php
│   ├── storage/
│   │   └── app/
│   │       └── public/
│   │           └── avatars/      # Uploaded avatars
│   └── .env
│
├── TenantManagement.jsx          # React Frontend
├── index.html                    # Main entry point
├── VALIDATION_RULES.md           # Validation documentation
├── AVATAR_UPLOAD_FIXED.md        # Avatar setup guide
└── README.md                     # This file
```

## 🔌 API Endpoints

| Method | Endpoint              | Description           |
|--------|----------------------|-----------------------|
| GET    | `/api/tenants`       | List all tenants      |
| POST   | `/api/tenants`       | Create new tenant     |
| GET    | `/api/tenants/{id}`  | Get tenant details    |
| PUT    | `/api/tenants/{id}`  | Update tenant         |
| DELETE | `/api/tenants/{id}`  | Delete tenant         |

### Example Request (Create Tenant)

```bash
POST http://localhost:8000/api/tenants
Content-Type: multipart/form-data

{
  "name": "Juan Dela Cruz",
  "room": "101",
  "contact": "09123456789",
  "email": "juan@example.com",
  "gender": "Male",
  "avatar": [file]
}
```

### Example Response

```json
{
  "data": {
    "id": 1,
    "name": "Juan Dela Cruz",
    "room": "101",
    "contact": "09123456789",
    "email": "juan@example.com",
    "gender": "Male",
    "avatar": "storage/avatars/1234567890_avatar.jpg",
    "created_at": "2025-10-15T12:00:00.000000Z",
    "updated_at": "2025-10-15T12:00:00.000000Z"
  },
  "message": "Tenant created successfully"
}
```

## 📝 Validation Rules

### Name
- Required
- Only letters, spaces, dots (.), hyphens (-), apostrophes (')
- Cannot be pure numbers
- Max 255 characters

### Room
- Required
- Alphanumeric only (A-Z, 0-9)
- **Unique** - no duplicate room numbers
- No symbols, spaces, or negative signs
- Max 50 characters

### Contact
- Required
- Philippine format only:
  - `09XXXXXXXXX` (11 digits)
  - `+639XXXXXXXXX` (13 characters)
- No spaces or special characters

### Email
- Required
- Valid email format
- **Unique** - no duplicate emails

### Avatar
- Optional
- Formats: JPEG, PNG, GIF, WebP, AVIF
- Max size: 5MB

## 🧪 Testing

### Valid Test Data

```javascript
Name: Juan Dela Cruz
Room: 101
Contact: 09123456789
Email: juan@example.com
Gender: Male
```

### Invalid Test Cases

```javascript
// Name
❌ "123456" (pure numbers)
❌ "Juan@2024" (special characters)

// Room
❌ "-001" (negative sign)
❌ "A-1" (hyphen)
❌ "101" (if already exists)

// Contact
❌ "12345678901" (wrong format)
❌ "09-123-456-789" (hyphens)
```

## 🛠️ Configuration

### CORS Setup
The API is configured to accept requests from any origin. To restrict:

Edit `api/config/cors.php`:
```php
'allowed_origins' => ['http://localhost:3000'],
```

### File Storage
Avatar files are stored in:
- Physical path: `api/storage/app/public/avatars/`
- Public URL: `http://localhost:8000/storage/avatars/`

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution**: Clear Laravel cache
```bash
cd api
php artisan config:clear
php artisan cache:clear
```

### Issue: Images Not Displaying
**Solution**: Recreate storage link
```bash
php artisan storage:link
```

### Issue: 422 Validation Error
**Solution**: Check Laravel logs
```bash
cat api/storage/logs/laravel.log
```

## 📚 Documentation

- [VALIDATION_RULES.md](VALIDATION_RULES.md) - Complete validation guide
- [AVATAR_UPLOAD_FIXED.md](AVATAR_UPLOAD_FIXED.md) - Avatar setup documentation
- [CONTACT_FIX.md](CONTACT_FIX.md) - Contact number validation fix

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 👤 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

## 🎉 Acknowledgments

- Laravel Framework
- React Library
- XAMPP Development Environment

---

**Made with ❤️ using Laravel & React**
