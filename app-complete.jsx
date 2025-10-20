// All components in one file - no ES6 modules
const { useState, useEffect, useMemo, useCallback } = React;
const API_BASE_URL = 'http://localhost:8000/api/tenants';

// ============================================
// DEFAULT AVATAR PLACEHOLDERS (Data URIs - No 404 errors)
// ============================================

const DEFAULT_AVATARS = {
  male: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzM0OThkYiIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1zaXplPSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiPvCfkanwn4+7PC90ZXh0Pjwvc3ZnPg==',
  female: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VjNGM5OSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1zaXplPSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiPvCfkanwn4+7PC90ZXh0Pjwvc3ZnPg=='
};

// Helper function to get avatar URL
const getAvatarUrl = (tenant) => {
  if (tenant.avatar) {
    return `http://localhost:8000/${tenant.avatar}`;
  }
  return tenant.gender === "Male" ? DEFAULT_AVATARS.male : DEFAULT_AVATARS.female;
};

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
  },
  // Layout styles
  pageContainer: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f5dc"
  },
  contentContainer: {
    flex: 1,
    padding: 40
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30
  },
  pageTitle: {
    fontSize: 32,
    color: "#2c3e50"
  },
  gridTwoColumns: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 20,
    marginBottom: 30
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  cardTitle: {
    fontSize: 20,
    color: "#2c3e50"
  },
  chartPlaceholder: {
    height: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8f9fa",
    borderRadius: 8
  },
  chartContent: {
    textAlign: "center",
    color: "#6c757d"
  },
  chartIcon: {
    fontSize: 48,
    margin: 0
  },
  chartText: {
    fontSize: 14,
    marginTop: 10
  },
  chartSubtext: {
    fontSize: 12,
    color: "#999"
  },
  calendarTitle: {
    fontSize: 18,
    color: "#2c3e50",
    marginBottom: 15
  },
  calendarDay: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#6c757d',
    padding: 8
  },
  tableContainer: {
    marginTop: 20,
    background: "white",
    borderRadius: 8,
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  tableHead: {
    background: "#1e3a8a",
    color: "white"
  },
  tableBorderRow: {
    borderBottom: "2px solid #e9ecef"
  },
  tableBorderCell: {
    borderBottom: "1px solid #e9ecef"
  },
  loadingContainer: {
    textAlign: "center",
    padding: 40,
    color: "#6c757d"
  },
  // Additional inline styles to prevent recreation
  chartIconStyle: {
    fontSize: 48,
    margin: 0
  },
  chartTextStyle: {
    fontSize: 14,
    marginTop: 10
  },
  chartSubtextStyle: {
    fontSize: 12,
    color: "#999"
  },
  calendarTitleStyle: {
    fontSize: 18,
    color: "#2c3e50",
    marginBottom: 15
  },
  calendarDayHeader: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#6c757d',
    padding: 8
  },
  recentTenantsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  recentTenantsTitle: {
    fontSize: 20,
    color: "#2c3e50"
  },
  tableStyle: {
    width: "100%",
    borderCollapse: "collapse"
  },
  tableRowBorder: {
    borderBottom: "2px solid #e9ecef"
  },
  tableRowBorderLight: {
    borderBottom: "1px solid #e9ecef"
  },
  avatarStyle: {
    borderRadius: "50%",
    objectFit: "cover"
  },
  // Logout Modal Styles
  logoutModalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  },
  logoutModal: {
    background: "white",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    width: 400,
    maxWidth: "90%",
    textAlign: "center"
  },
  logoutModalIcon: {
    fontSize: 64,
    marginBottom: 15
  },
  logoutModalTitle: {
    fontSize: 24,
    color: "#2c3e50",
    marginBottom: 10,
    fontWeight: 600
  },
  logoutModalText: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 25
  },
  logoutModalButtons: {
    display: "flex",
    gap: 12,
    justifyContent: "center"
  },
  logoutCancelBtn: {
    padding: "12px 24px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 500,
    transition: "all 0.3s"
  },
  logoutConfirmBtn: {
    padding: "12px 24px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 500,
    transition: "all 0.3s"
  }
};

// Button style generator (cached)
const BUTTON_STYLES_CACHE = {};
const getButtonStyle = (bg, extraStyles = {}) => {
  const cacheKey = `${bg}-${JSON.stringify(extraStyles)}`;
  if (!BUTTON_STYLES_CACHE[cacheKey]) {
    BUTTON_STYLES_CACHE[cacheKey] = {
      padding: "8px 12px",
      background: bg,
      color: "white",
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      ...extraStyles
    };
  }
  return BUTTON_STYLES_CACHE[cacheKey];
};

// ============================================
// LOGOUT MODAL COMPONENT
// ============================================

function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div style={STYLES.logoutModalOverlay} onClick={onClose}>
      <div style={STYLES.logoutModal} onClick={(e) => e.stopPropagation()}>
        <div style={STYLES.logoutModalIcon}>⚠️</div>
        <h2 style={STYLES.logoutModalTitle}>Confirm Logout</h2>
        <p style={STYLES.logoutModalText}>
          Are you sure you want to logout from the system?
        </p>
        <div style={STYLES.logoutModalButtons}>
          <button onClick={onClose} style={STYLES.logoutCancelBtn}>
            Cancel
          </button>
          <button onClick={onConfirm} style={STYLES.logoutConfirmBtn}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// SIDEBAR COMPONENT
// ============================================

function Sidebar({ onNavigate, currentPage, onLogout }) {
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
        <button onClick={onLogout} style={STYLES.logoutBtn}>
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const fetchTenants = useCallback(async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      setTenants(Array.isArray(data.data) ? data.data.slice(0, 4) : []);
    } catch (err) {
      console.error('Error fetching tenants:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  const handleLogout = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  const confirmLogout = useCallback(() => {
    setShowLogoutModal(false);
    alert("✅ You have been logged out successfully!");
    window.location.reload();
  }, []);

  const currentDate = useMemo(() => new Date(), []);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  // Calendar day style generator (memoized)
  const getCalendarDayStyle = useCallback((dayIndex) => ({
    padding: 8,
    textAlign: 'center',
    borderRadius: 4,
    background: dayIndex + 1 === currentDate.getDate() ? '#0ea5e9' : 'transparent',
    color: dayIndex + 1 === currentDate.getDate() ? 'white' : '#2c3e50',
    cursor: 'pointer'
  }), [currentDate]);

  return (
    <div style={STYLES.pageContainer}>
      <Sidebar onNavigate={onNavigate} currentPage="dashboard" onLogout={handleLogout} />

      <div style={STYLES.contentContainer}>
        <div style={STYLES.headerContainer}>
          <h1 style={STYLES.pageTitle}>Dashboard</h1>
          <button onClick={handleLogout} style={STYLES.topLogoutBtn}>
            🚪 Logout
          </button>
        </div>

        <div style={STYLES.gridTwoColumns}>
          <div style={STYLES.card}>
            <div style={STYLES.cardHeader}>
              <h3 style={STYLES.cardTitle}>Sales Funnel</h3>
              <select style={STYLES.select}>
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div style={STYLES.chartPlaceholder}>
              <div style={STYLES.chartContent}>
                <p style={STYLES.chartIconStyle}>📊</p>
                <p style={STYLES.chartTextStyle}>Billing & Finance Chart</p>
                <p style={STYLES.chartSubtextStyle}>(Coming Soon)</p>
              </div>
            </div>
          </div>

          <div style={STYLES.card}>
            <h3 style={STYLES.calendarTitleStyle}>{currentMonth} {currentYear}</h3>
            <div style={STYLES.calendar}>
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                <div key={day} style={STYLES.calendarDayHeader}>
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <div key={i} style={getCalendarDayStyle(i)}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={STYLES.card}>
          <div style={STYLES.recentTenantsHeader}>
            <h3 style={STYLES.recentTenantsTitle}>Recent Tenants</h3>
            <button onClick={() => onNavigate('tenants')} style={STYLES.seeAllBtn}>
              See All
            </button>
          </div>

          {loading ? (
            <div style={STYLES.loadingContainer}>
              <p>Loading tenants...</p>
            </div>
          ) : tenants.length === 0 ? (
            <div style={STYLES.loadingContainer}>
              <p>No tenants found</p>
            </div>
          ) : (
            <table style={STYLES.tableStyle}>
              <thead>
                <tr style={STYLES.tableRowBorder}>
                  <th style={STYLES.tableHeader}>Avatar</th>
                  <th style={STYLES.tableHeader}>Room</th>
                  <th style={STYLES.tableHeader}>Name</th>
                  <th style={STYLES.tableHeader}>Gender</th>
                  <th style={STYLES.tableHeader}>Contact Number</th>
                  <th style={STYLES.tableHeader}>Email</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant.id} style={STYLES.tableRowBorderLight}>
                    <td style={STYLES.tableCell}>
                      <img 
                        src={getAvatarUrl(tenant)} 
                        alt="avatar" 
                        width={50} 
                        height={50} 
                        style={STYLES.avatarStyle} 
                      />
                    </td>
                    <td style={STYLES.tableCell}>{tenant.room}</td>
                    <td style={STYLES.tableCell}>{tenant.name}</td>
                    <td style={STYLES.tableCell}>{tenant.gender}</td>
                    <td style={STYLES.tableCell}>{tenant.contact}</td>
                    <td style={STYLES.tableCell}>{tenant.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
        onConfirm={confirmLogout} 
      />
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
              src={getAvatarUrl(tenant)} 
              alt="avatar" 
              width={80} 
              height={80} 
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          )}
        </div>        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  const handleLogout = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  const confirmLogout = useCallback(() => {
    setShowLogoutModal(false);
    alert("✅ You have been logged out successfully!");
    window.location.reload();
  }, []);

  return (
    <div style={STYLES.pageContainer}>
      <Sidebar onNavigate={onNavigate} currentPage="tenants" onLogout={handleLogout} />
      
      <div style={STYLES.contentContainer}>
        <h2 style={STYLES.pageTitle}>🏠 Tenant Management</h2>
        <button style={STYLES.addBtn} onClick={() => setIsAddOpen(true)}>➕ Add Tenant</button>
        
        <div style={STYLES.tableContainer}>
          <table style={STYLES.tableStyle}>
            <thead style={STYLES.tableHead}>
              <tr>
                <th style={STYLES.tableHeader}>Avatar</th>
                <th style={STYLES.tableHeader}>Room</th>
                <th style={STYLES.tableHeader}>Name</th>
                <th style={STYLES.tableHeader}>Gender</th>
                <th style={STYLES.tableHeader}>Contact</th>
                <th style={STYLES.tableHeader}>Email</th>
                <th style={STYLES.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.length === 0 ? (
                <tr>
                  <td colSpan="7" style={STYLES.loadingContainer}>No tenants found</td>
                </tr>
              ) : (
                tenants.map((tenant) => (
                  <tr key={tenant.id}>
                    <td style={STYLES.tableCell}>
                      <img 
                        src={getAvatarUrl(tenant)} 
                        alt="avatar" 
                        width={50} 
                        height={50} 
                        style={STYLES.avatarStyle} 
                      />
                    </td>
                    <td style={STYLES.tableCell}>{tenant.room}</td>
                    <td style={STYLES.tableCell}>{tenant.name}</td>
                    <td style={STYLES.tableCell}>{tenant.gender}</td>
                    <td style={STYLES.tableCell}>{tenant.contact}</td>
                    <td style={STYLES.tableCell}>{tenant.email}</td>
                    <td style={STYLES.tableCell}>
                      <button style={getButtonStyle("#3b82f6")} onClick={() => openEdit(tenant)}>View/Edit</button>
                      <button style={getButtonStyle("#ef4444", { marginLeft: 5 })} onClick={() => handleDelete(tenant.id)}>Delete</button>
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

      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
        onConfirm={confirmLogout} 
      />
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
