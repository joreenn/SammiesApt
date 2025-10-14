# Tenant Management System - Backend API Documentation

## Overview
This is a Laravel-based REST API for managing tenants with full CRUD operations, error handling, and file upload capabilities.

## Server Information
- **Base URL**: `http://localhost:8000`
- **API Prefix**: `/api`
- **Database**: MySQL (tenant_management)

## Features Implemented
✅ **CRUD Operations** - Create, Read, Update, Delete tenants
✅ **Error Handling** - Comprehensive error messages and validation
✅ **File Handling** - Avatar image upload with validation
✅ **Data Validation** - Input validation for all fields
✅ **CORS Configuration** - Enabled for React frontend

---

## API Endpoints

### 1. Get All Tenants
**GET** `/api/tenants`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "room": "101",
      "contact": "123-456-7890",
      "email": "john@example.com",
      "gender": "Male",
      "avatar": "storage/avatars/1234567890_profile.jpg",
      "created_at": "2025-10-14T15:30:00.000000Z",
      "updated_at": "2025-10-14T15:30:00.000000Z"
    }
  ]
}
```

---

### 2. Get Single Tenant
**GET** `/api/tenants/{id}`

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "room": "101",
    "contact": "123-456-7890",
    "email": "john@example.com",
    "gender": "Male",
    "avatar": "storage/avatars/1234567890_profile.jpg",
    "created_at": "2025-10-14T15:30:00.000000Z",
    "updated_at": "2025-10-14T15:30:00.000000Z"
  }
}
```

**Error Response (404):**
```json
{
  "error": "Tenant not found"
}
```

---

### 3. Create New Tenant
**POST** `/api/tenants`

**Headers:**
```
Content-Type: multipart/form-data
```

**Request Body (FormData):**
```
name: John Doe (required, string, max:255)
room: 101 (required, string, max:50)
contact: 123-456-7890 (required, string, max:50)
email: john@example.com (required, email, unique)
gender: Male (required, enum: Male|Female)
avatar: [file] (optional, image: jpeg|png|jpg, max:2MB)
```

**Success Response (201):**
```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "room": "101",
    "contact": "123-456-7890",
    "email": "john@example.com",
    "gender": "Male",
    "avatar": "storage/avatars/1234567890_profile.jpg",
    "created_at": "2025-10-14T15:30:00.000000Z",
    "updated_at": "2025-10-14T15:30:00.000000Z"
  },
  "message": "Tenant created successfully"
}
```

**Validation Error Response (422):**
```json
{
  "errors": {
    "email": ["The email has already been taken."],
    "name": ["The name field is required."]
  }
}
```

---

### 4. Update Tenant
**PUT/PATCH** `/api/tenants/{id}`

**Headers:**
```
Content-Type: multipart/form-data
```

**Request Body (FormData - all fields optional):**
```
name: John Doe Updated
room: 102
contact: 987-654-3210
email: john.updated@example.com
gender: Male
avatar: [file]
```

**Success Response (200):**
```json
{
  "data": {
    "id": 1,
    "name": "John Doe Updated",
    "room": "102",
    "contact": "987-654-3210",
    "email": "john.updated@example.com",
    "gender": "Male",
    "avatar": "storage/avatars/1234567891_newprofile.jpg",
    "created_at": "2025-10-14T15:30:00.000000Z",
    "updated_at": "2025-10-14T15:35:00.000000Z"
  },
  "message": "Tenant updated successfully"
}
```

---

### 5. Delete Tenant
**DELETE** `/api/tenants/{id}`

**Success Response (200):**
```json
{
  "message": "Tenant deleted successfully"
}
```

**Error Response (404):**
```json
{
  "error": "Error deleting tenant: Model not found"
}
```

---

## Error Handling

### HTTP Status Codes
- **200** - Success (GET, PUT, DELETE)
- **201** - Created (POST)
- **404** - Not Found
- **422** - Validation Error
- **500** - Server Error

### Error Response Format
```json
{
  "error": "Error message here"
}
```

### Validation Error Format
```json
{
  "errors": {
    "field_name": ["Error message 1", "Error message 2"]
  }
}
```

---

## File Upload Details

### Avatar Upload
- **Accepted formats**: JPEG, PNG, JPG
- **Max size**: 2MB (2048KB)
- **Storage location**: `storage/app/public/avatars/`
- **Public URL**: `http://localhost:8000/storage/avatars/filename.jpg`

### File Naming Convention
Files are automatically renamed using timestamp + original filename:
```
1234567890_profile.jpg
```

### Old File Deletion
When updating a tenant's avatar, the old file is automatically deleted from storage.

---

## Database Schema

### Tenants Table
```sql
CREATE TABLE tenants (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    room VARCHAR(50) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    avatar VARCHAR(255) NULLABLE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

---

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000` (React default)
- `http://localhost:5173` (Vite default)

All HTTP methods and headers are allowed.

---

## Testing the API

### Using cURL

**Get all tenants:**
```bash
curl http://localhost:8000/api/tenants
```

**Create a tenant:**
```bash
curl -X POST http://localhost:8000/api/tenants \
  -F "name=John Doe" \
  -F "room=101" \
  -F "contact=123-456-7890" \
  -F "email=john@example.com" \
  -F "gender=Male" \
  -F "avatar=@/path/to/image.jpg"
```

**Update a tenant:**
```bash
curl -X PUT http://localhost:8000/api/tenants/1 \
  -F "name=John Doe Updated" \
  -F "room=102"
```

**Delete a tenant:**
```bash
curl -X DELETE http://localhost:8000/api/tenants/1
```

### Using Postman
1. Import the endpoints above
2. Set method and URL
3. For POST/PUT with files, use Body > form-data
4. Add fields and file upload
5. Send request

---

## React Frontend Integration

### Example API Call Using Fetch

```javascript
// Get all tenants
const fetchTenants = async () => {
  const response = await fetch('http://localhost:8000/api/tenants');
  const data = await response.json();
  return data.data;
};

// Create tenant with file upload
const createTenant = async (tenantData) => {
  const formData = new FormData();
  formData.append('name', tenantData.name);
  formData.append('room', tenantData.room);
  formData.append('contact', tenantData.contact);
  formData.append('email', tenantData.email);
  formData.append('gender', tenantData.gender);
  if (tenantData.avatar) {
    formData.append('avatar', tenantData.avatar);
  }

  const response = await fetch('http://localhost:8000/api/tenants', {
    method: 'POST',
    body: formData
  });
  return await response.json();
};

// Update tenant
const updateTenant = async (id, tenantData) => {
  const formData = new FormData();
  Object.keys(tenantData).forEach(key => {
    formData.append(key, tenantData[key]);
  });

  const response = await fetch(`http://localhost:8000/api/tenants/${id}`, {
    method: 'POST', // Use POST with _method field for file uploads
    body: formData,
    headers: {
      'X-HTTP-Method-Override': 'PUT' // Laravel method override
    }
  });
  return await response.json();
};

// Delete tenant
const deleteTenant = async (id) => {
  const response = await fetch(`http://localhost:8000/api/tenants/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
};
```

---

## Project Structure

```
api/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── TenantController.php    # Main CRUD controller
│   └── Models/
│       └── Tenant.php                  # Tenant model
├── config/
│   └── cors.php                        # CORS configuration
├── database/
│   └── migrations/
│       └── 2025_10_14_*_create_tenants_table.php
├── routes/
│   ├── api.php                         # API routes
│   └── web.php                         # Web routes
├── storage/
│   └── app/
│       └── public/
│           └── avatars/                # Uploaded avatar files
└── .env                                # Environment configuration
```

---

## Environment Variables (.env)

```env
APP_NAME=TenantManagement
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tenant_management
DB_USERNAME=root
DB_PASSWORD=

FILESYSTEM_DISK=local
```

---

## Running the Server

```bash
# Start Laravel development server
php artisan serve --port=8000

# The API will be available at:
# http://localhost:8000/api/tenants
```

---

## Troubleshooting

### CORS Issues
If you experience CORS errors:
1. Check `config/cors.php` has your frontend URL
2. Clear Laravel cache: `php artisan config:clear`
3. Restart the server

### File Upload Issues
1. Ensure `storage/app/public` directory exists
2. Run `php artisan storage:link`
3. Check file permissions on storage directory

### Database Connection Issues
1. Verify MySQL is running in XAMPP
2. Check database name exists: `tenant_management`
3. Verify credentials in `.env` file

---

## Next Steps

1. ✅ Laravel backend is fully set up
2. ✅ Database is created and migrated
3. ✅ API endpoints are ready
4. ⏭️ Update your React frontend to use these endpoints
5. ⏭️ Test all CRUD operations

---

## Support

For issues or questions:
1. Check Laravel logs: `storage/logs/laravel.log`
2. Use `php artisan route:list` to see all available routes
3. Test endpoints with Postman or cURL before frontend integration

**Your backend is now ready to use! 🚀**
