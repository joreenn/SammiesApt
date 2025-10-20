// All components in one file - no ES6 modules
const { useState, useEffect, useMemo, useCallback } = React;
const API_BASE_URL = 'http://localhost:8000/api/tenants';

// ============================================
// GLOBAL STYLES (defined once, never recreated)
// ============================================

const STYLES = {
  sidebar: {
    width: 250,
    background: "linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)",
    color: "white",
    minHeight: "100vh",
    position: "relative"
  },
  sidebarHeader: {
    color: "white",
    padding: "20px",
    fontSize: "18px",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },
  sidebarNav: {
    padding: "20px 0"
  },
  menuItem: {
    padding: "15px 20px",
    cursor: "pointer",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    fontSize: 14
  },
  menuIcon: {
    marginRight: 10
  },
  logoutContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20
  },
  logoutBtn: {
    width: "calc(100% - 40px)",
    padding: "12px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.3s"
  },
  topLogoutBtn: {
    padding: "12px 24px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 500,
    transition: "all 0.3s"
  },
  card: {
    background: "white",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  select: {
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #ddd",
    fontSize: 14,
    cursor: "pointer"
  },
  calendar: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 4,
    fontSize: 14
  },
  seeAllBtn: {
    padding: "10px 20px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.3s"
  },
  addBtn: {
    padding: "10px 15px",
    background: "#1e3a8a",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    marginBottom: 15
  },
  tableHeader: {
    padding: 12,
    textAlign: "left",
    fontSize: 14,
    fontWeight: 600,
    color: "#fff"
  },
  tableCell: {
    padding: 12,
    fontSize: 14,
    color: "#2c3e50",
    borderBottom: "1px solid #e9ecef"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    background: "white",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    width: 400,
    maxHeight: "90vh",
    overflowY: "auto"
  },
  formGroup: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column"
  },
  input: {
    padding: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
    marginTop: 4
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2
  },
  avatar: {
    borderRadius: "50%",
    objectFit: "cover"
  },
  toast: {
    position: "fixed",
    top: 20,
    right: 20,
    color: "white",
    padding: "12px 18px",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: 2000,
    fontWeight: 500
  }
};

// Button style generator (memoized)
const getButtonStyle = (bg) => ({
  padding: "8px 12px",
  background: bg,
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer"
});

// ============================================
// SIDEBAR COMPONENT
// ============================================

function Sidebar({ onNavigate, currentPage }) {
  const handleLogout = useCallback(() => {
    if (window.confirm("⚠️ Are you sure you want to logout?")) {
      alert("✅ You have been logged out successfully!");
      window.location.reload();
    }
  }, []);

  const getMenuItemStyle = useCallback((page) => ({
    ...STYLES.menuItem,
    background: currentPage === page ? "rgba(255,255,255,0.1)" : "transparent"
  }), [currentPage]);

  return (
    <div style={STYLES.sidebar}>
      <h2 style={STYLES.sidebarHeader}>
        THE SAMMIE'S<br />APARTMENT
      </h2>
      
      <nav style={STYLES.sidebarNav}>
        <div 
          className="menu-item"
          style={getMenuItemStyle('dashboard')}
          onClick={() => onNavigate('dashboard')}
        >
          <span style={STYLES.menuIcon}>📊</span> Dashboard
        </div>
        <div 
          className="menu-item"
          style={getMenuItemStyle('tenants')}
          onClick={() => onNavigate('tenants')}
        >
          <span style={STYLES.menuIcon}>👥</span> Tenant Management
        </div>
        <div className="menu-item" style={STYLES.menuItem}>
          <span style={STYLES.menuIcon}>📅</span> Reservation
        </div>
        <div className="menu-item" style={STYLES.menuItem}>
          <span style={STYLES.menuIcon}>💰</span> Billing
        </div>
        <div className="menu-item" style={STYLES.menuItem}>
          <span style={STYLES.menuIcon}>💬</span> Communication
        </div>
        <div className="menu-item" style={STYLES.menuItem}>
          <span style={STYLES.menuIcon}>🔧</span> Maintenance
        </div>
        <div className="menu-item" style={STYLES.menuItem}>
          <span style={STYLES.menuIcon}>⚙️</span> Admin Settings
        </div>
      </nav>

      <div style={STYLES.logoutContainer}>
        <button onClick={handleLogout} style={STYLES.logoutBtn}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

// ============================================
// TOAST COMPONENT
// ============================================

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  
  const toastStyle = useMemo(() => ({
    ...STYLES.toast,
    background: type === "error" ? "#ef4444" : "#22c55e"
  }), [type]);
  
  return (
    <div style={toastStyle}>
      {message}
    </div>
  );
}

// ============================================
// DASHBOARD COMPONENT
// ============================================

function Dashboard({ onNavigate }) {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTenants = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      setTenants(Array.isArray(data.data) ? data.data.slice(0, 4) : []);
    } catch (err) {
      console.error('Error fetching tenants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleLogout = () => {
    if (window.confirm("⚠️ Are you sure you want to logout?")) {
      alert("✅ You have been logged out successfully!");
      window.location.reload();
    }
  };

  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const cardStyle = {
    background: "white",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  };

  const topLogoutBtnStyle = {
    padding: "12px 24px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 500,
    transition: "all 0.3s"
  };

  const selectStyle = {
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #ddd",
    fontSize: 14,
    cursor: "pointer"
  };

  const calendarStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 4,
    fontSize: 14
  };

  const seeAllBtnStyle = {
    padding: "10px 20px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.3s"
  };

  const thStyle = {
    padding: 12,
    textAlign: "left",
    fontSize: 14,
    fontWeight: 600,
    color: "#6c757d"
  };

  const tdStyle = {
    padding: 12,
    fontSize: 14,
    color: "#2c3e50"
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f5dc" }}>
      <Sidebar onNavigate={onNavigate} currentPage="dashboard" />

      <div style={{ flex: 1, padding: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
          <h1 style={{ fontSize: 32, color: "#2c3e50" }}>Dashboard</h1>
          <button onClick={handleLogout} style={topLogoutBtnStyle}>
            🚪 Logout
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 30 }}>
          <div style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 20, color: "#2c3e50" }}>Sales Funnel</h3>
              <select style={selectStyle}>
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div style={{ height: 250, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa", borderRadius: 8 }}>
              <div style={{ textAlign: "center", color: "#6c757d" }}>
                <p style={{ fontSize: 48, margin: 0 }}>📊</p>
                <p style={{ fontSize: 14, marginTop: 10 }}>Billing & Finance Chart</p>
                <p style={{ fontSize: 12, color: "#999" }}>(Coming Soon)</p>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: 18, color: "#2c3e50", marginBottom: 15 }}>{currentMonth} {currentYear}</h3>
            <div style={calendarStyle}>
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                <div key={day} style={{ fontWeight: 'bold', fontSize: 12, color: '#6c757d', padding: 8 }}>
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <div key={i} style={{
                  padding: 8,
                  textAlign: 'center',
                  borderRadius: 4,
                  background: i + 1 === currentDate.getDate() ? '#0ea5e9' : 'transparent',
                  color: i + 1 === currentDate.getDate() ? 'white' : '#2c3e50',
                  cursor: 'pointer'
                }}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontSize: 20, color: "#2c3e50" }}>Recent Tenants</h3>
            <button onClick={() => onNavigate('tenants')} style={seeAllBtnStyle}>
              See All
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: 40, color: "#6c757d" }}>
              <p>Loading tenants...</p>
            </div>
          ) : tenants.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: "#6c757d" }}>
              <p>No tenants found</p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e9ecef" }}>
                  <th style={thStyle}>Avatar</th>
                  <th style={thStyle}>Room</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Gender</th>
                  <th style={thStyle}>Contact Number</th>
                  <th style={thStyle}>Email</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant.id} style={{ borderBottom: "1px solid #e9ecef" }}>
                    <td style={tdStyle}>
                      <img 
                        src={tenant.avatar ? `http://localhost:8000/${tenant.avatar}` : (tenant.gender === "Male" ? "/avatars/male.jpg" : "/avatars/female.jpg")} 
                        alt="avatar" 
                        width={50} 
                        height={50} 
                        style={{ borderRadius: "50%", objectFit: "cover" }} 
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
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// TENANT MANAGEMENT MODALS
// ============================================

function EditViewModal({ tenant, editForm, setEditForm, onClose, onSave, errors }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const modalOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  };

  const modalStyle = {
    background: "white",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    width: 400,
    maxHeight: "90vh",
    overflowY: "auto"
  };

  const formGroup = {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column"
  };

  const inputStyle = {
    padding: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
    marginTop: 4
  };

  const errorText = {
    color: "red",
    fontSize: 12,
    marginTop: 2
  };

  const btnStyle = (bg) => ({
    padding: "8px 12px",
    background: bg,
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer"
  });

  return (
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
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
                placeholder="e.g., 09123456789 or +639123456789" 
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
                placeholder="e.g., example@email.com" 
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
            <select 
              style={inputStyle} 
              value={editForm.gender || ""} 
              onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <span>{tenant.gender}</span>
          )}
        </div>
        
        <div style={formGroup}>
          <label>Avatar:</label>
          {isEditing ? (
            <input 
              style={inputStyle} 
              type="file" 
              accept="image/*" 
              onChange={(e) => setEditForm({ ...editForm, avatar: e.target.files[0] })} 
            />
          ) : (
            <img 
              src={tenant.avatar ? `http://localhost:8000/${tenant.avatar}` : (tenant.gender === "Male" ? "/avatars/male.jpg" : "/avatars/female.jpg")} 
              alt="avatar" 
              width={80} 
              height={80} 
              style={{ borderRadius: "50%", objectFit: "cover" }}
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = tenant.gender === "Male" ? "/avatars/male.jpg" : "/avatars/female.jpg"; 
              }}
            />
          )}
        </div>
        
        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <button style={btnStyle("#6b7280")} onClick={onClose}>Close</button>
          {isEditing && <button style={btnStyle("#1e3a8a")} onClick={onSave}>Save</button>}
        </div>
      </div>
    </div>
  );
}

function AddModal({ addForm, setAddForm, onClose, onSave, errors }) {
  const modalOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  };

  const modalStyle = {
    background: "white",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    width: 400,
    maxHeight: "90vh",
    overflowY: "auto"
  };

  const formGroup = {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column"
  };

  const inputStyle = {
    padding: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
    marginTop: 4
  };

  const errorText = {
    color: "red",
    fontSize: 12,
    marginTop: 2
  };

  const btnStyle = (bg) => ({
    padding: "8px 12px",
    background: bg,
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer"
  });

  return (
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ textAlign: "center", marginBottom: 15 }}>Add New Tenant</h3>
        
        <div style={formGroup}>
          <label>Name: *</label>
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
          <label>Room: *</label>
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
          <label>Contact: *</label>
          <input 
            style={inputStyle} 
            type="text" 
            placeholder="e.g., 09123456789 or +639123456789" 
            value={addForm.contact} 
            onChange={(e) => setAddForm({ ...addForm, contact: e.target.value })} 
          />
          {errors.contact && <p style={errorText}>{errors.contact}</p>}
        </div>
        
        <div style={formGroup}>
          <label>Email: *</label>
          <input 
            style={inputStyle} 
            type="email" 
            placeholder="e.g., example@email.com" 
            value={addForm.email} 
            onChange={(e) => setAddForm({ ...addForm, email: e.target.value })} 
          />
          {errors.email && <p style={errorText}>{errors.email}</p>}
        </div>
        
        <div style={formGroup}>
          <label>Gender: *</label>
          <select 
            style={inputStyle} 
            value={addForm.gender} 
            onChange={(e) => setAddForm({ ...addForm, gender: e.target.value })}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        
        <div style={formGroup}>
          <label>Avatar:</label>
          <input 
            style={inputStyle} 
            type="file" 
            accept="image/*" 
            onChange={(e) => setAddForm({ ...addForm, avatar: e.target.files[0] })} 
          />
        </div>
        
        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <button style={btnStyle("#6b7280")} onClick={onClose}>Cancel</button>
          <button style={btnStyle("#1e3a8a")} onClick={onSave}>Add Tenant</button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// TENANT MANAGEMENT COMPONENT
// ============================================

function TenantManagement({ onNavigate }) {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", room: "", contact: "", email: "", gender: "Male", avatar: null });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const fetchTenants = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      setTenants(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Error fetching tenants:', err);
      setToast({ message: "❌ Failed to fetch tenants", type: "error" });
    }
  };
  
  useEffect(() => { fetchTenants(); }, []);

  const validateForm = (form) => {
    const errs = {};
    
    if (!form.name || !form.name.trim()) {
      errs.name = "Name is required";
    } else if (/^\d+$/.test(form.name.trim())) {
      errs.name = "Name cannot be purely numeric";
    } else if (!/^[a-zA-Z\s\.\-\']+$/.test(form.name)) {
      errs.name = "Name can only contain letters, spaces, dots, hyphens, and apostrophes";
    }
    
    if (!form.room || !form.room.trim()) {
      errs.room = "Room is required";
    } else if (!/^[A-Z0-9]+$/i.test(form.room)) {
      errs.room = "Room must be alphanumeric only (no spaces or symbols)";
    }
    
    if (!form.contact || !form.contact.trim()) {
      errs.contact = "Contact is required";
    } else if (!/^(09\d{9}|\+639\d{9})$/.test(form.contact)) {
      errs.contact = "Contact must be in format 09XXXXXXXXX or +639XXXXXXXXX";
    }
    
    if (!form.email || !form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Invalid email format";
    }
    
    return errs;
  };

  const handleAddTenant = async () => {
    const errs = validateForm(addForm);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    
    const formData = new FormData();
    formData.append('name', addForm.name);
    formData.append('room', addForm.room);
    formData.append('contact', addForm.contact);
    formData.append('email', addForm.email);
    formData.append('gender', addForm.gender);
    if (addForm.avatar) formData.append('avatar', addForm.avatar);
    
    try {
      const res = await fetch(API_BASE_URL, {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      
      if (!res.ok) {
        if (result.errors) {
          const backendErrors = {};
          Object.keys(result.errors).forEach(key => {
            backendErrors[key] = result.errors[key][0];
          });
          setErrors(backendErrors);
          return;
        }
        throw new Error(result.message || 'Failed to add tenant');
      }
      
      setToast({ message: "✅ Tenant added successfully", type: "success" });
      setIsAddOpen(false);
      setAddForm({ name: "", room: "", contact: "", email: "", gender: "Male", avatar: null });
      fetchTenants();
    } catch (err) {
      setToast({ message: `❌ ${err.message}`, type: "error" });
    }
  };

  const handleUpdate = async () => {
    const errs = validateForm(editForm);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', editForm.name);
    formData.append('room', editForm.room);
    formData.append('contact', editForm.contact);
    formData.append('email', editForm.email);
    formData.append('gender', editForm.gender);
    if (editForm.avatar instanceof File) formData.append('avatar', editForm.avatar);
    
    try {
      const res = await fetch(`${API_BASE_URL}/${selectedTenant.id}`, {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      
      if (!res.ok) {
        if (result.errors) {
          const backendErrors = {};
          Object.keys(result.errors).forEach(key => {
            backendErrors[key] = result.errors[key][0];
          });
          setErrors(backendErrors);
          return;
        }
        throw new Error(result.message || 'Failed to update tenant');
      }
      
      setToast({ message: "✅ Tenant updated successfully", type: "success" });
      setIsEditOpen(false);
      fetchTenants();
    } catch (err) {
      setToast({ message: `❌ ${err.message}`, type: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) throw new Error('Failed to delete tenant');
      
      setToast({ message: "✅ Tenant deleted successfully", type: "success" });
      fetchTenants();
    } catch (err) {
      setToast({ message: `❌ ${err.message}`, type: "error" });
    }
  };

  const openEdit = (tenant) => {
    setSelectedTenant(tenant);
    setEditForm({ ...tenant });
    setErrors({});
    setIsEditOpen(true);
  };

  const addBtnStyle = {
    padding: "10px 15px",
    background: "#1e3a8a",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    marginBottom: 15
  };

  const thStyle = {
    padding: 10,
    textAlign: "left",
    color: "#fff"
  };

  const tdStyle = {
    padding: 10,
    borderBottom: "1px solid #ccc"
  };

  const btnStyle = (bg) => ({
    padding: "8px 12px",
    background: bg,
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer"
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f5dc" }}>
      <Sidebar onNavigate={onNavigate} currentPage="tenants" />
      
      <div style={{ flex: 1, padding: 40 }}>
        <h2 style={{ fontSize: 32, color: "#2c3e50", marginBottom: 20 }}>🏠 Tenant Management</h2>
        <button style={addBtnStyle} onClick={() => setIsAddOpen(true)}>➕ Add Tenant</button>
        
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
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: 20 }}>No tenants found</td>
                </tr>
              ) : (
                tenants.map((tenant) => (
                  <tr key={tenant.id}>
                    <td style={tdStyle}>
                      <img 
                        src={tenant.avatar ? `http://localhost:8000/${tenant.avatar}` : (tenant.gender === "Male" ? "/avatars/male.jpg" : "/avatars/female.jpg")} 
                        alt="avatar" 
                        width={50} 
                        height={50} 
                        style={{ borderRadius: "50%", objectFit: "cover" }} 
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
                      <button style={btnStyle("#3b82f6")} onClick={() => openEdit(tenant)}>View/Edit</button>
                      <button style={{ ...btnStyle("#ef4444"), marginLeft: 5 }} onClick={() => handleDelete(tenant.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {isAddOpen && (
          <AddModal 
            addForm={addForm} 
            setAddForm={setAddForm} 
            onClose={() => { setIsAddOpen(false); setErrors({}); }} 
            onSave={handleAddTenant} 
            errors={errors} 
          />
        )}
        {isEditOpen && selectedTenant && (
          <EditViewModal 
            tenant={selectedTenant} 
            editForm={editForm} 
            setEditForm={setEditForm} 
            onClose={() => { setIsEditOpen(false); setErrors({}); }} 
            onSave={handleUpdate} 
            errors={errors} 
          />
        )}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}

// ============================================
// MAIN APP COMPONENT
// ============================================

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {currentPage === 'tenants' && <TenantManagement onNavigate={handleNavigate} />}
    </div>
  );
}

// ============================================
// RENDER APP
// ============================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
