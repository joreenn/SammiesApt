import React, { useEffect, useState } from "react";

export default function TenantManagement() {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({
  name: "",
  room: "",
  contact: "",
  email: "",
  gender: "Male",
  avatar: null, // important!
});
    const handleAddOpen = () => {
    setAddForm({
      name: "",
      room: "",
      contact: "",
      email: "",
      gender: "Male",
    });
    setIsAddOpen(true);
  };


  // Get CSRF token from meta tag
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  // Fetch tenants from API
  useEffect(() => {
    fetch("/tenants")
      .then(res => res.json())
      .then(data => setTenants(data))
      .catch(err => console.error(err));
  }, []);

  // View tenant
  const handleView = (tenant) => {
    setSelectedTenant(tenant);
    setIsViewOpen(true);
  };

  // Open edit form
  const handleEdit = (tenant) => {
    setSelectedTenant(tenant);
    setEditForm({ ...tenant });
    setIsEditOpen(true);
  };

 // Safely get CSRF token
const getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute('content') : '';
};

// Then use it in your fetch calls
const handleAddTenant = () => {
  const formData = new FormData();
  formData.append("name", addForm.name);
  formData.append("room", addForm.room);
  formData.append("contact", addForm.contact);
  formData.append("email", addForm.email);
  formData.append("gender", addForm.gender);
  if (addForm.avatar) {
    formData.append("avatar", addForm.avatar); // file
  }

  fetch("/tenants", {
    method: "POST",
    headers: {
      "X-CSRF-TOKEN": getCsrfToken(),
    },
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message); // show JSON message
      setIsAddOpen(false);
      window.location.reload(); // refresh page
    })
    .catch(err => console.error(err));
};

const handleUpdate = () => {
  fetch(`/tenants/${selectedTenant.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": getCsrfToken(),
    },
    body: JSON.stringify(editForm),
  })
    .then(res => res.json())
    .then((updatedTenant) => {
      setTenants(prev => prev.map(t => t.id === updatedTenant.id ? updatedTenant : t));
      setIsEditOpen(false);
      alert("Tenant successfully updated!"); // Inform the user
       window.location.reload(); 
    })
    .catch(err => console.error(err));
};


const handleDelete = (id) => {
  if (!window.confirm("Are you sure you want to delete this tenant?")) return;

  fetch(`/tenants/${id}`, {
    method: "DELETE",
    headers: {
      "X-CSRF-TOKEN": getCsrfToken(),
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then((data) => {
      setTenants(prev => prev.filter(t => t.id !== id));
      alert(data.message); // Show JSON message from backend
     window.location.reload(); 
    })
    .catch(err => console.error(err));
};


  return (
    <div style={{ padding: "40px", fontFamily: "Segoe UI, sans-serif", background: "#f1f5f9", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "26px", fontWeight: "bold", color: "#0f172a" }}>🏠 Tenant Management</h2>
       <button style={addBtnStyle} onClick={handleAddOpen}>➕ Add Tenant</button>

      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", background: "white", borderRadius: "12px", boxShadow: "0 6px 14px rgba(0,0,0,0.08)" }}>
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
            {tenants.map((tenant, index) => (
              <tr key={tenant.id} style={{ background: index % 2 === 0 ? "#f9fafb" : "white" }}>
                <td style={tdStyle}>
                  <img
                    src={`/avatars/${tenant.avatar}`}
                    alt={tenant.name}
                    style={{ width: "45px", height: "45px", borderRadius: "50%", border: "2px solid #3b82f6" }}
                  />
                </td>
                <td style={tdStyle}><strong>{tenant.room}</strong></td>
                <td style={tdStyle}>{tenant.name}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: tenant.gender === "Male" ? "#1d4ed8" : "#db2777",
                    background: tenant.gender === "Male" ? "#dbeafe" : "#fce7f3",
                  }}>
                    {tenant.gender}
                  </span>
                </td>
                <td style={tdStyle}>{tenant.contact}</td>
                <td style={tdStyle}>{tenant.email}</td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button style={actionBtn("#22c55e", "#16a34a")} onClick={() => handleView(tenant)}>View</button>
                    <button style={actionBtn("#facc15", "#eab308", "black")} onClick={() => handleEdit(tenant)}>Edit</button>
                    <button style={actionBtn("#ef4444", "#dc2626")} onClick={() => handleDelete(tenant.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
    {isAddOpen && (
      <div style={modalStyle}>
        <h3>Add Tenant</h3>
        <input type="text" placeholder="Name" value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} />
        <input type="text" placeholder="Room" value={addForm.room} onChange={e => setAddForm({...addForm, room: e.target.value})} />
        <input type="text" placeholder="Contact" value={addForm.contact} onChange={e => setAddForm({...addForm, contact: e.target.value})} />
        <input type="text" placeholder="Email" value={addForm.email} onChange={e => setAddForm({...addForm, email: e.target.value})} />
        <select value={addForm.gender} onChange={e => setAddForm({...addForm, gender: e.target.value})}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        
        {/* Avatar upload */}
       <input
          type="file"
          onChange={e => setAddForm({ ...addForm, avatar: e.target.files[0] })}
        />


        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <button onClick={handleAddTenant} style={actionBtn("#22c55e", "#16a34a")}>Save</button>
          <button onClick={() => setIsAddOpen(false)} style={actionBtn("#ef4444", "#dc2626")}>Cancel</button>
        </div>
      </div>
    )}


      {/* View Modal */}
      {isViewOpen && selectedTenant && (
        <div style={modalStyle}>
          <h3>Tenant Details</h3>
          <p><strong>Name:</strong> {selectedTenant.name}</p>
          <p><strong>Room:</strong> {selectedTenant.room}</p>
          <p><strong>Gender:</strong> {selectedTenant.gender}</p>
          <p><strong>Contact:</strong> {selectedTenant.contact}</p>
          <p><strong>Email:</strong> {selectedTenant.email}</p>
          <button onClick={() => setIsViewOpen(false)} style={addBtnStyle}>Close</button>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && selectedTenant && (
        <div style={modalStyle}>
          <h3>Edit Tenant</h3>
          <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Name" />
          <input type="text" value={editForm.room} onChange={(e) => setEditForm({ ...editForm, room: e.target.value })} placeholder="Room" />
          <input type="text" value={editForm.contact} onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })} placeholder="Contact" />
          <input type="text" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} placeholder="Email" />
          <select value={editForm.gender} onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button onClick={handleUpdate} style={actionBtn("#22c55e", "#16a34a")}>Save</button>
            <button onClick={() => setIsEditOpen(false)} style={actionBtn("#ef4444", "#dc2626")}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const thStyle = { padding: "14px", textAlign: "left", fontSize: "14px", fontWeight: "600" };
const tdStyle = { padding: "12px 14px", fontSize: "14px", borderBottom: "1px solid #e5e7eb" };
const addBtnStyle = {
  background: "#f97316",
  color: "white",
  padding: "10px 18px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "600",
};
const actionBtn = (bg, hover, text = "white") => ({
  background: bg,
  color: text,
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "13px",
});
const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  zIndex: 1000,
};
