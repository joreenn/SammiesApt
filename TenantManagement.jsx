import React, { useEffect, useState } from "react";

// Toast notification
function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div style={{ position: "fixed", top: 20, right: 20, background: type === "error" ? "#ef4444" : "#22c55e", color: "white", padding: "12px 18px", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.2)", zIndex: 2000, fontWeight: 500 }}>{message}</div>
  );
}

// Edit/View Modal
function EditViewModal({ tenant, editForm, setEditForm, onClose, onSave, errors }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div style={modalStyle}>
      <h3 style={{ textAlign: "center", marginBottom: 15 }}>
        Tenant Details
        <span style={{ marginLeft: 10, cursor: "pointer", fontSize: 18 }} title="Edit" onClick={() => setIsEditing((v) => !v)}>✏️</span>
      </h3>
      
      <div style={formGroup}>
        <label>Name:</label>
        {isEditing ? (
          <>
            <input 
              style={inputStyle} 
              type="text" 
              placeholder="e.g., Juan Dela Cruz" 
              value={editForm.name || ""} 
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} 
            />
            {errors.name && <p style={errorText}>{errors.name}</p>}
          </>
        ) : (
          <span>{tenant.name}</span>
        )}
      </div>
      
      <div style={formGroup}>
        <label>Room:</label>
        {isEditing ? (
          <>
            <input 
              style={inputStyle} 
              type="text" 
              placeholder="e.g., 101, A1, B202" 
              value={editForm.room || ""} 
              onChange={(e) => setEditForm({ ...editForm, room: e.target.value })} 
            />
            {errors.room && <p style={errorText}>{errors.room}</p>}
          </>
        ) : (
          <span>{tenant.room}</span>
        )}
      </div>
      
      <div style={formGroup}>
        <label>Contact:</label>
        {isEditing ? (
          <>
            <input 
              style={inputStyle} 
              type="text" 
              placeholder="e.g., 09123456789" 
              value={editForm.contact || ""} 
              onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })} 
            />
            {errors.contact && <p style={errorText}>{errors.contact}</p>}
          </>
        ) : (
          <span>{tenant.contact}</span>
        )}
      </div>
      
      <div style={formGroup}>
        <label>Email:</label>
        {isEditing ? (
          <>
            <input 
              style={inputStyle} 
              type="email" 
              placeholder="e.g., juan@example.com" 
              value={editForm.email || ""} 
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} 
            />
            {errors.email && <p style={errorText}>{errors.email}</p>}
          </>
        ) : (
          <span>{tenant.email}</span>
        )}
      </div>
      
      <div style={formGroup}>
        <label>Gender:</label>
        {isEditing ? (
          <select style={inputStyle} value={editForm.gender || "Male"} onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          <span>{tenant.gender}</span>
        )}
      </div>
      {isEditing && (
        <div style={formGroup}>
          <label>Avatar:</label>
          <input style={inputStyle} type="file" accept=".jpg,.jpeg,.png,.gif,.webp,.avif" onChange={(e) => setEditForm({ ...editForm, avatar: e.target.files[0] })} />
        </div>
      )}
      <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
        {isEditing && <button onClick={onSave} style={btnStyle("#22c55e")}>Save</button>}
        <button onClick={onClose} style={btnStyle("#ef4444")}>Close</button>
      </div>
    </div>
  );
}

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api/tenants';

// Main Component
export default function TenantManagement() {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", room: "", contact: "", email: "", gender: "Male", avatar: null });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  // Fetch tenants
  const fetchTenants = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      // Laravel returns data in 'data' field
      setTenants(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Error fetching tenants:', err);
      setToast({ message: "❌ Failed to fetch tenants", type: "error" });
    }
  };
  useEffect(() => { fetchTenants(); }, []);

  // Validate form (comprehensive client-side validation)
  const validateForm = (form) => {
    const errs = {};
    
    // Name validation
    if (!form.name || !form.name.trim()) {
      errs.name = "Name is required.";
    } else if (/^\d+$/.test(form.name)) {
      errs.name = "Name cannot be pure numbers.";
    } else if (!/^[a-zA-Z\s\.\-\']+$/.test(form.name)) {
      errs.name = "Name must contain only letters, spaces, dots, hyphens, and apostrophes.";
    }
    
    // Room validation
    if (!form.room || !form.room.trim()) {
      errs.room = "Room is required.";
    } else if (!/^[A-Z0-9]+$/i.test(form.room)) {
      errs.room = "Room number must contain only letters and numbers (no symbols or negative signs).";
    }
    
    // Contact validation (Philippine format)
    if (!form.contact || !form.contact.trim()) {
      errs.contact = "Contact is required.";
    } else if (!/^(09\d{9}|\+639\d{9})$/.test(form.contact)) {
      errs.contact = "Contact must be a valid Philippine number (e.g., 09123456789 or +639123456789).";
    }
    
    // Email validation
    if (!form.email || !form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    
    // Avatar validation
    if (form.avatar && form.avatar.size > 5 * 1024 * 1024) {
      errs.avatar = "Avatar must be less than 5MB.";
    }
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Add tenant
  const handleAddTenant = async () => {
    if (!validateForm(addForm)) return;
    
    const formData = new FormData();
    formData.append('name', addForm.name);
    formData.append('room', addForm.room);
    formData.append('contact', addForm.contact);
    formData.append('email', addForm.email);
    formData.append('gender', addForm.gender);
    if (addForm.avatar) {
      formData.append('avatar', addForm.avatar);
    }
    
    try {
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        body: formData
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setIsAddOpen(false);
        setAddForm({ name: "", room: "", contact: "", email: "", gender: "Male", avatar: null });
        setErrors({});
        setToast({ message: "✅ Tenant added successfully!", type: "success" });
        fetchTenants();
      } else {
        // Handle validation errors from backend
        if (data.errors) {
          const backendErrors = {};
          Object.keys(data.errors).forEach(key => {
            backendErrors[key] = data.errors[key][0]; // Get first error message
          });
          setErrors(backendErrors);
          setToast({ message: "❌ Please fix the errors", type: "error" });
        } else {
          throw new Error(data.error || "Failed to add tenant");
        }
      }
    } catch (err) {
      console.error('Error adding tenant:', err);
      setToast({ message: `❌ ${err.message}`, type: "error" });
    }
  };

  // Update tenant
  const handleUpdate = async () => {
    if (!validateForm(editForm)) return;
    
    const formData = new FormData();
    formData.append('name', editForm.name);
    formData.append('room', editForm.room);
    formData.append('contact', editForm.contact);
    formData.append('email', editForm.email);
    formData.append('gender', editForm.gender);
    if (editForm.avatar && typeof editForm.avatar !== 'string') {
      formData.append('avatar', editForm.avatar);
    }
    formData.append("_method", "PUT");
    
    try {
      const res = await fetch(`${API_BASE_URL}/${selectedTenant.id}`, { 
        method: "POST", 
        body: formData 
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setIsEditOpen(false);
        setErrors({});
        setToast({ message: "✅ Tenant updated successfully!", type: "success" });
        fetchTenants();
      } else {
        // Handle validation errors from backend
        if (data.errors) {
          const backendErrors = {};
          Object.keys(data.errors).forEach(key => {
            backendErrors[key] = data.errors[key][0];
          });
          setErrors(backendErrors);
          setToast({ message: "❌ Please fix the errors", type: "error" });
        } else {
          throw new Error(data.error || "Failed to update tenant");
        }
      }
    } catch (err) {
      console.error('Error updating tenant:', err);
      setToast({ message: `❌ ${err.message}`, type: "error" });
    }
  };

  // Delete tenant
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, { 
        method: "DELETE"
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setToast({ message: "🗑️ Tenant deleted successfully!", type: "success" });
        fetchTenants();
      } else {
        throw new Error(data.error || "Failed to delete tenant");
      }
    } catch (err) {
      console.error('Error deleting tenant:', err);
      setToast({ message: `❌ ${err.message}`, type: "error" });
    }
  };

  return (
    <div style={{ padding: 40, background: "#f1f5f9", minHeight: "100vh" }}>
      <h2>🏠 Tenant Management</h2>
      <button style={addBtnStyle} onClick={() => setIsAddOpen(true)}>➕ Add Tenant</button>
      {/* Table */}
      <div style={{ marginTop: 20, background: "white", borderRadius: 8, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#1e3a8a", color: "white" }}>
            <tr>
              <th style={thStyle}>Avatar</th>
              <th style={thStyle}>Room</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Gender</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id}>
                <td style={tdStyle}>
                  <img 
                    src={tenant.avatar ? `http://localhost:8000/${tenant.avatar}` : (tenant.gender === "Male" ? "/avatars/male.jpg" : "/avatars/female.jpg")} 
                    alt="avatar" 
                    width={50} 
                    height={50} 
                    style={{ borderRadius: "50%" }} 
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = tenant.gender === "Male" ? "/avatars/male.jpg" : "/avatars/female.jpg"; 
                    }} 
                  />
                </td>
                <td style={tdStyle}>{tenant.room}</td>
                <td style={tdStyle}>{tenant.name}</td>
                <td style={tdStyle}>{tenant.gender}</td>
                <td style={tdStyle}>{tenant.contact}</td>
                <td style={tdStyle}>{tenant.email}</td>
                <td style={tdStyle}>
                  <button style={btnStyle("#facc15")} onClick={() => { setSelectedTenant(tenant); setEditForm(tenant); setIsEditOpen(true); }}>Edit/View</button>
                  <button style={btnStyle("#ef4444")} onClick={() => handleDelete(tenant.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add Modal */}
      {isAddOpen && (
        <div style={modalStyle}>
          <h3 style={{ textAlign: "center", marginBottom: 15 }}>Add Tenant</h3>
          
          <div style={formGroup}>
            <label>Name:</label>
            <input 
              style={inputStyle} 
              type="text" 
              placeholder="e.g., Juan Dela Cruz" 
              value={addForm.name} 
              onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} 
            />
            {errors.name && <p style={errorText}>{errors.name}</p>}
          </div>
          
          <div style={formGroup}>
            <label>Room:</label>
            <input 
              style={inputStyle} 
              type="text" 
              placeholder="e.g., 101, A1, B202" 
              value={addForm.room} 
              onChange={(e) => setAddForm({ ...addForm, room: e.target.value })} 
            />
            {errors.room && <p style={errorText}>{errors.room}</p>}
          </div>
          
          <div style={formGroup}>
            <label>Contact:</label>
            <input 
              style={inputStyle} 
              type="text" 
              placeholder="e.g., 09123456789" 
              value={addForm.contact} 
              onChange={(e) => setAddForm({ ...addForm, contact: e.target.value })} 
            />
            {errors.contact && <p style={errorText}>{errors.contact}</p>}
          </div>
          
          <div style={formGroup}>
            <label>Email:</label>
            <input 
              style={inputStyle} 
              type="email" 
              placeholder="e.g., juan@example.com" 
              value={addForm.email} 
              onChange={(e) => setAddForm({ ...addForm, email: e.target.value })} 
            />
            {errors.email && <p style={errorText}>{errors.email}</p>}
          </div>
          
          <div style={formGroup}>
            <label>Gender:</label>
            <select style={inputStyle} value={addForm.gender} onChange={(e) => setAddForm({ ...addForm, gender: e.target.value })}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div style={formGroup}>
            <label>Avatar:</label>
            <input style={inputStyle} type="file" accept=".jpg,.jpeg,.png,.gif,.webp,.avif" onChange={(e) => setAddForm({ ...addForm, avatar: e.target.files[0] })} />
            {errors.avatar && <p style={errorText}>{errors.avatar}</p>}
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <button onClick={handleAddTenant} style={btnStyle("#22c55e")}>Add</button>
            <button onClick={() => setIsAddOpen(false)} style={btnStyle("#ef4444")}>Close</button>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {isEditOpen && selectedTenant && (
        <EditViewModal tenant={selectedTenant} editForm={editForm} setEditForm={setEditForm} onClose={() => setIsEditOpen(false)} onSave={handleUpdate} errors={errors} />
      )}
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// Styles
const modalStyle = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", padding: 20, borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.3)", zIndex: 1000, width: 400, maxHeight: "90vh", overflowY: "auto" };
const formGroup = { marginBottom: 10, display: "flex", flexDirection: "column" };
const inputStyle = { padding: 8, borderRadius: 4, border: "1px solid #ccc", marginTop: 4 };
const errorText = { color: "red", fontSize: 12, marginTop: 2 };
const btnStyle = (bg) => ({ padding: "8px 12px", background: bg, color: "white", border: "none", borderRadius: 4, cursor: "pointer" });
const addBtnStyle = { padding: "10px 15px", background: "#1e3a8a", color: "white", border: "none", borderRadius: 6, cursor: "pointer", marginBottom: 15 };
const thStyle = { padding: 10, textAlign: "left" };
const tdStyle = { padding: 10, borderBottom: "1px solid #ccc" };
