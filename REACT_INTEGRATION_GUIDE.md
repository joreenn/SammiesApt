# Quick Start: Connect React Frontend to Laravel Backend

## 🚀 Step-by-Step Integration Guide

### Step 1: Start the Laravel Server

Open a terminal and run:
```bash
cd C:\xampp\htdocs\SammiesAptt\api
php artisan serve --port=8000
```

Keep this terminal window open. Your API will be available at: `http://localhost:8000`

---

### Step 2: Update Your React Component

Open `TenantManagement.jsx` and add this configuration at the top:

```javascript
// Add this near the top of your file, after imports
const API_BASE_URL = 'http://localhost:8000/api/tenants';
```

---

### Step 3: Update Your API Functions

Replace your mock data handling with real API calls:

#### Fetch All Tenants:
```javascript
const fetchTenants = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const result = await response.json();
    setTenants(result.data); // Laravel returns data in 'data' field
  } catch (error) {
    console.error('Error fetching tenants:', error);
    showToast('Error fetching tenants', 'error');
  }
};

// Call this when component mounts
useEffect(() => {
  fetchTenants();
}, []);
```

#### Create Tenant:
```javascript
const handleAdd = async () => {
  try {
    const formData = new FormData();
    formData.append('name', addForm.name);
    formData.append('room', addForm.room);
    formData.append('contact', addForm.contact);
    formData.append('email', addForm.email);
    formData.append('gender', addForm.gender);
    
    if (addForm.avatar) {
      formData.append('avatar', addForm.avatar);
    }

    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      showToast(result.message || 'Tenant added successfully');
      fetchTenants(); // Refresh the list
      setShowAdd(false);
      // Reset form
      setAddForm({ name: '', room: '', contact: '', email: '', gender: 'Male', avatar: null });
    } else {
      // Handle validation errors
      if (result.errors) {
        const errorMessages = Object.values(result.errors).flat().join(', ');
        showToast(errorMessages, 'error');
      } else {
        showToast(result.error || 'Error adding tenant', 'error');
      }
    }
  } catch (error) {
    console.error('Error creating tenant:', error);
    showToast('Error creating tenant', 'error');
  }
};
```

#### Update Tenant:
```javascript
const handleSave = async () => {
  try {
    const formData = new FormData();
    formData.append('name', editForm.name);
    formData.append('room', editForm.room);
    formData.append('contact', editForm.contact);
    formData.append('email', editForm.email);
    formData.append('gender', editForm.gender);
    
    if (editForm.avatar) {
      formData.append('avatar', editForm.avatar);
    }

    // Use POST with method override for file uploads
    formData.append('_method', 'PUT');

    const response = await fetch(`${API_BASE_URL}/${viewing.id}`, {
      method: 'POST', // Use POST for file uploads
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      showToast(result.message || 'Tenant updated successfully');
      fetchTenants(); // Refresh the list
      setViewing(null);
    } else {
      if (result.errors) {
        const errorMessages = Object.values(result.errors).flat().join(', ');
        showToast(errorMessages, 'error');
      } else {
        showToast(result.error || 'Error updating tenant', 'error');
      }
    }
  } catch (error) {
    console.error('Error updating tenant:', error);
    showToast('Error updating tenant', 'error');
  }
};
```

#### Delete Tenant:
```javascript
const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this tenant?')) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    const result = await response.json();

    if (response.ok) {
      showToast(result.message || 'Tenant deleted successfully');
      fetchTenants(); // Refresh the list
    } else {
      showToast(result.error || 'Error deleting tenant', 'error');
    }
  } catch (error) {
    console.error('Error deleting tenant:', error);
    showToast('Error deleting tenant', 'error');
  }
};
```

#### Display Avatar Images:
```javascript
// When displaying tenant avatar:
const avatarSrc = tenant.avatar 
  ? `http://localhost:8000/${tenant.avatar}`
  : 'https://via.placeholder.com/50';

<img src={avatarSrc} alt={tenant.name} />
```

---

### Step 4: Handle File Selection

Make sure your file input captures the file object:

```javascript
// In your add/edit form:
<input 
  type="file" 
  accept=".jpg,.jpeg,.png" 
  onChange={(e) => {
    const file = e.target.files[0];
    setAddForm({ ...addForm, avatar: file }); // Store the file object
    // or for edit form:
    // setEditForm({ ...editForm, avatar: file });
  }} 
/>
```

---

### Step 5: Add Error State Display (Optional)

```javascript
const [errors, setErrors] = useState({});

// In your form, display errors:
{errors.name && <span style={{color: 'red'}}>{errors.name[0]}</span>}
{errors.email && <span style={{color: 'red'}}>{errors.email[0]}</span>}
```

---

## 🧪 Testing Your Integration

### 1. Start Both Servers:
- **Backend**: `php artisan serve --port=8000` (in `api` directory)
- **Frontend**: Your React dev server (if using Vite/Create React App)

### 2. Open Your React App:
- Navigate to your frontend URL (e.g., `http://localhost:3000`)

### 3. Test Operations:
1. **Load Page** - Should fetch empty tenant list (or existing data)
2. **Add Tenant** - Fill form and submit
3. **View List** - New tenant should appear
4. **Edit Tenant** - Click edit, modify, save
5. **Delete Tenant** - Click delete, confirm

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error
**Error**: "Access to fetch has been blocked by CORS policy"

**Solution**:
1. Check Laravel server is running on port 8000
2. Verify `config/cors.php` includes your frontend URL
3. Clear Laravel cache: `php artisan config:clear`
4. Restart Laravel server

### Issue 2: 404 Not Found
**Error**: "GET http://localhost:8000/api/tenants 404"

**Solution**:
1. Check `routes/api.php` exists
2. Run `php artisan route:list` to verify routes
3. Ensure `bootstrap/app.php` includes api routes

### Issue 3: File Upload Not Working
**Error**: Validation error or file not saved

**Solution**:
1. Ensure you're using `FormData` for file uploads
2. Check file input has `accept` attribute
3. Verify file size is under 2MB
4. Use POST method (not PUT) for file uploads with `_method` field

### Issue 4: Images Not Displaying
**Error**: 404 for avatar image

**Solution**:
1. Run `php artisan storage:link` in Laravel directory
2. Check file path: should be `storage/avatars/filename.jpg`
3. Verify URL: `http://localhost:8000/storage/avatars/filename.jpg`

### Issue 5: Validation Errors
**Error**: 422 response with validation messages

**Solution**:
- Check all required fields are being sent
- Ensure email is valid format
- Verify email is unique (not already in database)
- Check file type is jpeg/png/jpg

---

## 📊 Complete Example Component

Here's a minimal working example:

```javascript
import React, { useEffect, useState } from "react";

const API_BASE_URL = 'http://localhost:8000/api/tenants';

function TenantManagement() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch tenants
  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      const result = await response.json();
      setTenants(result.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add tenant
  const addTenant = async (formData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: formData // FormData object
      });
      const result = await response.json();
      if (response.ok) {
        fetchTenants();
        return { success: true, data: result };
      } else {
        return { success: false, errors: result.errors };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Update tenant
  const updateTenant = async (id, formData) => {
    formData.append('_method', 'PUT');
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (response.ok) {
        fetchTenants();
        return { success: true, data: result };
      } else {
        return { success: false, errors: result.errors };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Delete tenant
  const deleteTenant = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchTenants();
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <div>
      {loading ? <p>Loading...</p> : (
        <ul>
          {tenants.map(tenant => (
            <li key={tenant.id}>
              {tenant.name} - Room {tenant.room}
              {tenant.avatar && (
                <img 
                  src={`http://localhost:8000/${tenant.avatar}`} 
                  alt={tenant.name}
                  width="50"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TenantManagement;
```

---

## ✅ Checklist

Before starting, make sure:

- [ ] XAMPP MySQL is running
- [ ] Laravel server is running (`php artisan serve`)
- [ ] React dev server is running
- [ ] Database `tenant_management` exists
- [ ] Migrations have been run
- [ ] Storage link has been created

---

## 🎉 You're All Set!

Your backend is ready and waiting for your React frontend to connect!

**Need help?** 
- Check `API_DOCUMENTATION.md` for detailed API reference
- Check Laravel logs at `storage/logs/laravel.log`
- Use browser DevTools Network tab to debug API calls

Happy coding! 🚀
