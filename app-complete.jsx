// All components in one file - no ES6 modules
const { useState, useEffect, useMemo, useCallback } = React;
const API_BASE_URL = 'http://localhost:8000/api/tenants';
const RESERVATION_API_URL = 'http://localhost:8000/api/reservations';

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
  },
  // Reservation Management Styles
  roomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 25,
    marginTop: 30
  },
  roomCard: {
    background: "white",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s, box-shadow 0.3s"
  },
  roomImage: {
    width: "100%",
    height: 200,
    objectFit: "cover"
  },
  roomContent: {
    padding: 20
  },
  roomTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#2c3e50",
    marginBottom: 15,
    textAlign: "center"
  },
  roomButtons: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  editBtn: {
    padding: "10px 20px",
    background: "#475569",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.3s"
  },
  viewBtn: {
    padding: "10px 20px",
    background: "#475569",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.3s"
  },
  statusBadgeOccupied: {
    padding: "10px 20px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "default"
  },
  statusBadgeAvailable: {
    padding: "10px 20px",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "default"
  },
  roomDetailsCard: {
    background: "white",
    borderRadius: 12,
    padding: 30,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginTop: 30
  },
  roomDetailsImage: {
    width: "100%",
    maxHeight: 400,
    objectFit: "cover",
    borderRadius: 12,
    marginBottom: 30
  },
  detailsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: "#2c3e50",
    display: "flex",
    alignItems: "center",
    gap: 10
  },
  editIconBtn: {
    background: "none",
    border: "none",
    fontSize: 24,
    cursor: "pointer",
    color: "#475569",
    transition: "color 0.3s"
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    marginBottom: 30
  },
  detailItem: {
    marginBottom: 15
  },
  detailLabel: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 5,
    fontWeight: 500
  },
  detailValue: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: 400
  },
  priceTag: {
    fontSize: 32,
    fontWeight: 700,
    color: "#475569",
    textAlign: "center",
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: 12,
    marginBottom: 20
  },
  proceedBtn: {
    width: "100%",
    padding: "15px",
    background: "#475569",
    color: "white",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 600,
    transition: "all 0.3s"
  },
  editModal: {
    background: "white",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    width: 500,
    maxWidth: "90%",
    maxHeight: "90vh",
    overflowY: "auto"
  },
  editModalTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: "#2c3e50",
    marginBottom: 25,
    textAlign: "center"
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    background: "none",
    border: "none",
    fontSize: 24,
    cursor: "pointer",
    color: "#6c757d"
  },
  saveChangeBtn: {
    width: "100%",
    padding: "12px",
    background: "#475569",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 600,
    marginTop: 20,
    transition: "all 0.3s"
  },
  // Booking Modal Styles
  bookingModal: {
    background: "white",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    width: 600,
    maxWidth: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
    position: "relative"
  },
  bookingModalTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: "#2c3e50",
    marginBottom: 25,
    textAlign: "center"
  },
  bookingFormRow: {
    display: "flex",
    gap: 15,
    marginBottom: 15
  },
  bookingFormGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  bookingLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: "#2c3e50",
    marginBottom: 8
  },
  bookingInput: {
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: 8,
    fontSize: 14,
    transition: "border 0.3s"
  },
  bookingSelect: {
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: 8,
    fontSize: 14,
    background: "white",
    cursor: "pointer",
    transition: "border 0.3s"
  },
  confirmBtn: {
    width: "100%",
    padding: "14px",
    background: "#475569",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 600,
    marginTop: 20,
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
        <div 
          className="menu-item"
          style={getMenuItemStyle('reservation')}
          onClick={() => onNavigate('reservation')}
        >
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
  const [rooms, setRooms] = useState([]);
  
  // Fetch room availability from localStorage
  useEffect(() => {
    const savedRooms = localStorage.getItem('apartmentRooms');
    if (savedRooms) {
      setRooms(JSON.parse(savedRooms));
    } else {
      // Initialize default 10 rooms if not exists
      const defaultRooms = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        number: `Room ${String(i + 1).padStart(2, '0')}`,
        status: 'available'
      }));
      setRooms(defaultRooms);
      localStorage.setItem('apartmentRooms', JSON.stringify(defaultRooms));
    }
  }, []);
  
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
              <select
                style={inputStyle}
                value={editForm.room || ""}
                onChange={(e) => setEditForm({ ...editForm, room: e.target.value })}
              >
                <option value="">Select Room</option>
                {rooms.map(room => (
                  <option 
                    value={room.number} 
                    disabled={room.status === 'occupied' && room.number !== tenant.room}
                    key={room.id}
                  >
                    {room.number} {room.status === 'occupied' && room.number !== tenant.room ? '🔴 Occupied' : '🟢 Available'}
                  </option>
                ))}
              </select>
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
  const [rooms, setRooms] = useState([]);
  
  // Fetch room availability from localStorage
  useEffect(() => {
    const savedRooms = localStorage.getItem('apartmentRooms');
    if (savedRooms) {
      setRooms(JSON.parse(savedRooms));
    } else {
      // Initialize default 10 rooms if not exists
      const defaultRooms = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        number: `Room ${String(i + 1).padStart(2, '0')}`,
        status: 'available'
      }));
      setRooms(defaultRooms);
      localStorage.setItem('apartmentRooms', JSON.stringify(defaultRooms));
    }
  }, []);

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
          <select
            style={inputStyle}
            value={addForm.room}
            onChange={(e) => setAddForm({ ...addForm, room: e.target.value })}
          >
            <option value="">Select Room</option>
            {rooms.map(room => (
              <option 
                value={room.number} 
                disabled={room.status === 'occupied'}
                key={room.id}
              >
                {room.number} {room.status === 'occupied' ? '🔴 Occupied' : '🟢 Available'}
              </option>
            ))}
          </select>
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
      const tenantList = Array.isArray(data.data) ? data.data : [];
      setTenants(tenantList);
      
      // Sync room availability with current tenants
      const savedRooms = localStorage.getItem('apartmentRooms');
      if (savedRooms) {
        const rooms = JSON.parse(savedRooms);
        
        // Mark all rooms as available first
        const updatedRooms = rooms.map(room => ({
          ...room,
          status: 'available',
          tenantName: null
        }));
        
        // Mark rooms with tenants as occupied
        tenantList.forEach(tenant => {
          const roomIndex = updatedRooms.findIndex(r => r.number === tenant.room);
          if (roomIndex !== -1) {
            updatedRooms[roomIndex].status = 'occupied';
            updatedRooms[roomIndex].tenantName = tenant.name;
          }
        });
        
        localStorage.setItem('apartmentRooms', JSON.stringify(updatedRooms));
      }
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
      
      // Update room status to occupied in localStorage
      const savedRooms = localStorage.getItem('apartmentRooms');
      if (savedRooms) {
        const rooms = JSON.parse(savedRooms);
        const updatedRooms = rooms.map(room => 
          room.number === addForm.room 
            ? { ...room, status: 'occupied', tenantName: addForm.name }
            : room
        );
        localStorage.setItem('apartmentRooms', JSON.stringify(updatedRooms));
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
    
    const oldRoom = selectedTenant.room;
    const newRoom = editForm.room;
    
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
      
      // Update room statuses if room changed
      if (oldRoom !== newRoom) {
        const savedRooms = localStorage.getItem('apartmentRooms');
        if (savedRooms) {
          const rooms = JSON.parse(savedRooms);
          const updatedRooms = rooms.map(room => {
            if (room.number === oldRoom) {
              return { ...room, status: 'available', tenantName: null };
            }
            if (room.number === newRoom) {
              return { ...room, status: 'occupied', tenantName: editForm.name };
            }
            return room;
          });
          localStorage.setItem('apartmentRooms', JSON.stringify(updatedRooms));
        }
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
    
    // Find the tenant's room before deleting
    const tenantToDelete = tenants.find(t => t.id === id);
    
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) throw new Error('Failed to delete tenant');
      
      // Update room status to available in localStorage
      if (tenantToDelete && tenantToDelete.room) {
        const savedRooms = localStorage.getItem('apartmentRooms');
        if (savedRooms) {
          const rooms = JSON.parse(savedRooms);
          const updatedRooms = rooms.map(room => 
            room.number === tenantToDelete.room 
              ? { ...room, status: 'available', tenantName: null }
              : room
          );
          localStorage.setItem('apartmentRooms', JSON.stringify(updatedRooms));
        }
      }
      
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
// RESERVATION MANAGEMENT COMPONENT
// ============================================

function ReservationManagement({ onNavigate }) {
  const [rooms, setRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [bookingForm, setBookingForm] = useState({
    full_name: '',
    email: '',
    contact_number: '',
    down_payment: '',
    mode_of_payment: 'Cash',
    reservation_status: 'Available'
  });
  const [toast, setToast] = useState(null);

  // Default room image
  const DEFAULT_ROOM_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LXNpemU9IjY0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzZjNzU3ZCIgZm9udC1mYW1pbHk9IkFyaWFsIj7wn4+qPC90ZXh0Pjwvc3ZnPg==';

  // Initialize rooms data
  useEffect(() => {
    const initialRooms = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      number: `Room ${String(i + 1).padStart(2, '0')}`,
      image: DEFAULT_ROOM_IMAGE,
      inclusions: 'Kitchen, Bed Frame, Comfort Room',
      address: 'Washington Village, Maa',
      others: 'Water is divided depending on bill\n13 kWh',
      price: 6000,
      status: 'available'
    }));
    
    // Load from localStorage if exists
    const savedRooms = localStorage.getItem('apartmentRooms');
    if (savedRooms) {
      setRooms(JSON.parse(savedRooms));
    } else {
      setRooms(initialRooms);
      localStorage.setItem('apartmentRooms', JSON.stringify(initialRooms));
    }
  }, []);

  // Fetch tenants and update room statuses
  const fetchTenants = useCallback(async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      const tenantList = Array.isArray(data.data) ? data.data : [];
      setTenants(tenantList);

      // Update room statuses based on tenant occupancy
      setRooms(prevRooms => {
        const updatedRooms = prevRooms.map(room => {
          const tenant = tenantList.find(t => t.room === room.number);
          return {
            ...room,
            status: tenant ? 'occupied' : 'available',
            tenantName: tenant ? tenant.name : null
          };
        });
        localStorage.setItem('apartmentRooms', JSON.stringify(updatedRooms));
        return updatedRooms;
      });
    } catch (err) {
      console.error('Error fetching tenants:', err);
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

  const handleViewRoom = useCallback((room) => {
    setSelectedRoom(room);
    setIsEditingDetails(false);
  }, []);

  const handleEditRoom = useCallback((room) => {
    setEditForm({ ...room });
    setShowEditModal(true);
  }, []);

  const handleSaveRoomDetails = useCallback(() => {
    if (!editForm.number || !editForm.inclusions || !editForm.address || !editForm.price) {
      setToast({ message: "❌ Please fill all required fields", type: "error" });
      return;
    }

    const updatedRooms = rooms.map(room => 
      room.id === editForm.id ? { ...room, ...editForm } : room
    );
    
    setRooms(updatedRooms);
    localStorage.setItem('apartmentRooms', JSON.stringify(updatedRooms));
    
    if (selectedRoom && selectedRoom.id === editForm.id) {
      setSelectedRoom({ ...selectedRoom, ...editForm });
    }
    
    setIsEditingDetails(false);
    setToast({ message: "✅ Room details updated successfully", type: "success" });
  }, [editForm, rooms, selectedRoom]);

  const handleImageUpload = useCallback((e, roomId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedRooms = rooms.map(room =>
          room.id === roomId ? { ...room, image: reader.result } : room
        );
        setRooms(updatedRooms);
        localStorage.setItem('apartmentRooms', JSON.stringify(updatedRooms));
        
        if (editForm.id === roomId) {
          setEditForm({ ...editForm, image: reader.result });
        }
        
        setToast({ message: "✅ Room photo updated successfully", type: "success" });
      };
      reader.readAsDataURL(file);
    }
  }, [rooms, editForm]);

  const handleProceed = useCallback(() => {
    setShowBookingModal(true);
  }, []);

  const handleBookingSubmit = useCallback(async () => {
    // Validation
    if (!bookingForm.full_name || !bookingForm.email || !bookingForm.contact_number || !bookingForm.down_payment) {
      setToast({ message: "❌ Please fill in all required fields", type: "error" });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingForm.email)) {
      setToast({ message: "❌ Please enter a valid email address", type: "error" });
      return;
    }

    // Contact number validation (Philippine format)
    const contactRegex = /^(09\d{9}|\+639\d{9})$/;
    if (!contactRegex.test(bookingForm.contact_number)) {
      setToast({ message: "❌ Contact must be in format 09XXXXXXXXX or +639XXXXXXXXX", type: "error" });
      return;
    }

    // Down payment validation
    if (parseFloat(bookingForm.down_payment) <= 0) {
      setToast({ message: "❌ Down payment must be greater than 0", type: "error" });
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_number: selectedRoom.number,
          full_name: bookingForm.full_name,
          email: bookingForm.email,
          contact_number: bookingForm.contact_number,
          down_payment: parseFloat(bookingForm.down_payment),
          mode_of_payment: bookingForm.mode_of_payment,
          reservation_status: bookingForm.reservation_status
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setToast({ message: "✅ Reservation created successfully!", type: "success" });
        
        // Reset forms and close modals
        setShowBookingModal(false);
        setSelectedRoom(null);
        setBookingForm({
          full_name: '',
          email: '',
          contact_number: '',
          down_payment: '',
          mode_of_payment: 'Cash',
          reservation_status: 'Available'
        });

        // Update room status if reservation is Occupied
        if (bookingForm.reservation_status === 'Occupied') {
          const updatedRooms = rooms.map(room =>
            room.id === selectedRoom.id 
              ? { ...room, status: 'occupied', tenantName: bookingForm.full_name }
              : room
          );
          setRooms(updatedRooms);
          localStorage.setItem('apartmentRooms', JSON.stringify(updatedRooms));
        }
      } else {
        setToast({ message: "❌ " + (data.message || "Failed to create reservation"), type: "error" });
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      setToast({ message: "❌ Error creating reservation. Please try again.", type: "error" });
    }
  }, [bookingForm, selectedRoom, rooms]);

  // Room Grid View
  const renderRoomGrid = () => (
    <div style={STYLES.roomGrid}>
      {rooms.map(room => (
        <div key={room.id} style={STYLES.roomCard}>
          <img src={room.image} alt={room.number} style={STYLES.roomImage} />
          <div style={STYLES.roomContent}>
            <h3 style={STYLES.roomTitle}>{room.number}</h3>
            <div style={STYLES.roomButtons}>
              <button 
                onClick={() => handleEditRoom(room)} 
                style={STYLES.editBtn}
              >
                Edit
              </button>
              <span style={room.status === 'occupied' ? STYLES.statusBadgeOccupied : STYLES.statusBadgeAvailable}>
                {room.status === 'occupied' ? 'Occupied' : 'Available'}
              </span>
            </div>
            {room.status === 'available' && (
              <button 
                onClick={() => handleViewRoom(room)} 
                style={{ ...STYLES.viewBtn, marginTop: 10, width: '100%' }}
              >
                View
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Room Details View
  const renderRoomDetails = () => {
    if (!selectedRoom) return null;

    return (
      <div style={STYLES.roomDetailsCard}>
        <img src={selectedRoom.image} alt={selectedRoom.number} style={STYLES.roomDetailsImage} />
        
        <div style={STYLES.detailsHeader}>
          <h2 style={STYLES.detailsTitle}>
            DETAILS
            <button 
              onClick={() => {
                setEditForm({ ...selectedRoom });
                setIsEditingDetails(true);
              }} 
              style={STYLES.editIconBtn}
              title="Edit Details"
            >
              ✏️
            </button>
          </h2>
          <span style={STYLES.statusBadgeAvailable}>Available</span>
        </div>

        <div style={STYLES.detailsGrid}>
          <div style={STYLES.detailItem}>
            <div style={STYLES.detailLabel}>Room Number:</div>
            <div style={STYLES.detailValue}>{selectedRoom.number}</div>
          </div>
          
          <div style={STYLES.detailItem}>
            <div style={STYLES.detailLabel}>Inclusions:</div>
            <div style={STYLES.detailValue}>{selectedRoom.inclusions}</div>
          </div>
          
          <div style={STYLES.detailItem}>
            <div style={STYLES.detailLabel}>Address:</div>
            <div style={STYLES.detailValue}>{selectedRoom.address}</div>
          </div>
          
          <div style={STYLES.detailItem}>
            <div style={STYLES.detailLabel}>Others:</div>
            <div style={STYLES.detailValue} dangerouslySetInnerHTML={{ __html: selectedRoom.others.replace(/\n/g, '<br>') }} />
          </div>
        </div>

        <div style={STYLES.priceTag}>₱ {selectedRoom.price.toLocaleString()}</div>
        
        <button onClick={handleProceed} style={STYLES.proceedBtn}>
          Proceed
        </button>
        
        <button 
          onClick={() => setSelectedRoom(null)} 
          style={{ ...STYLES.proceedBtn, background: '#6c757d', marginTop: 10 }}
        >
          Back to Rooms
        </button>
      </div>
    );
  };

  // Edit Modal
  const renderEditModal = () => {
    if (!showEditModal) return null;

    return (
      <div style={STYLES.logoutModalOverlay} onClick={() => setShowEditModal(false)}>
        <div style={{ ...STYLES.editModal, position: 'relative' }} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setShowEditModal(false)} style={STYLES.closeIcon}>❌</button>
          
          <h2 style={STYLES.editModalTitle}>Edit Details</h2>
          
          <div style={STYLES.formGroup}>
            <label style={STYLES.detailLabel}>Room Number:</label>
            <input
              type="text"
              value={editForm.number || ''}
              onChange={(e) => setEditForm({ ...editForm, number: e.target.value })}
              style={STYLES.input}
            />
          </div>

          <div style={STYLES.formGroup}>
            <label style={STYLES.detailLabel}>Inclusions:</label>
            <input
              type="text"
              value={editForm.inclusions || ''}
              onChange={(e) => setEditForm({ ...editForm, inclusions: e.target.value })}
              style={STYLES.input}
            />
          </div>

          <div style={STYLES.formGroup}>
            <label style={STYLES.detailLabel}>Address:</label>
            <input
              type="text"
              value={editForm.address || ''}
              onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
              style={STYLES.input}
            />
          </div>

          <div style={STYLES.formGroup}>
            <label style={STYLES.detailLabel}>Others:</label>
            <textarea
              value={editForm.others || ''}
              onChange={(e) => setEditForm({ ...editForm, others: e.target.value })}
              style={{ ...STYLES.input, minHeight: 80, resize: 'vertical' }}
            />
          </div>

          <div style={STYLES.formGroup}>
            <label style={STYLES.detailLabel}>Price:</label>
            <input
              type="number"
              value={editForm.price || ''}
              onChange={(e) => setEditForm({ ...editForm, price: parseInt(e.target.value) || 0 })}
              style={STYLES.input}
            />
          </div>

          <div style={STYLES.formGroup}>
            <label style={STYLES.detailLabel}>Room Photo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, editForm.id)}
              style={STYLES.input}
            />
          </div>

          <button onClick={() => {
            const updatedRooms = rooms.map(room =>
              room.id === editForm.id ? { ...room, ...editForm } : room
            );
            setRooms(updatedRooms);
            localStorage.setItem('apartmentRooms', JSON.stringify(updatedRooms));
            setShowEditModal(false);
            setToast({ message: "✅ Room updated successfully", type: "success" });
          }} style={STYLES.saveChangeBtn}>
            Save Change
          </button>
        </div>
      </div>
    );
  };

  // Edit Details Modal (when viewing room details)
  const renderEditDetailsModal = () => {
    if (!isEditingDetails) return null;

    return (
      <div style={STYLES.logoutModalOverlay} onClick={() => setIsEditingDetails(false)}>
        <div style={{ ...STYLES.editModal, position: 'relative' }} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setIsEditingDetails(false)} style={STYLES.closeIcon}>❌</button>
          
          <h2 style={STYLES.editModalTitle}>Edit Details</h2>
          
          <div style={STYLES.formGroup}>
            <label style={STYLES.detailLabel}>Room Number:</label>
            <input
              type="text"
              value={editForm.number || ''}
              onChange={(e) => setEditForm({ ...editForm, number: e.target.value })}
              style={STYLES.input}
              disabled
            />
          </div>

          <div style={STYLES.formGroup}>
            <label style={STYLES.detailLabel}>Inclusions:</label>
            <input
              type="text"
              value={editForm.inclusions || ''}
              onChange={(e) => setEditForm({ ...editForm, inclusions: e.target.value })}
              style={STYLES.input}
            />
          </div>

          <div style={STYLES.formGroup}>
            <label style={STYLES.detailLabel}>Address:</label>
            <input
              type="text"
              value={editForm.address || ''}
              onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
              style={STYLES.input}
            />
          </div>

          <div style={STYLES.formGroup}>
            <label style={STYLES.detailLabel}>Others:</label>
            <textarea
              value={editForm.others || ''}
              onChange={(e) => setEditForm({ ...editForm, others: e.target.value })}
              style={{ ...STYLES.input, minHeight: 80, resize: 'vertical' }}
            />
          </div>

          <div style={STYLES.formGroup}>
            <label style={STYLES.detailLabel}>Price (₱):</label>
            <input
              type="number"
              value={editForm.price || ''}
              onChange={(e) => setEditForm({ ...editForm, price: parseInt(e.target.value) || 0 })}
              style={STYLES.input}
            />
          </div>

          <button onClick={handleSaveRoomDetails} style={STYLES.saveChangeBtn}>
            Save Change
          </button>
        </div>
      </div>
    );
  };

  // Booking Modal
  const renderBookingModal = () => {
    if (!showBookingModal || !selectedRoom) return null;

    return (
      <div style={STYLES.logoutModalOverlay} onClick={() => setShowBookingModal(false)}>
        <div style={STYLES.bookingModal} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setShowBookingModal(false)} style={STYLES.closeIcon}>❌</button>
          
          <h2 style={STYLES.bookingModalTitle}>Reservation Form</h2>
          
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <img src={selectedRoom.image} alt={selectedRoom.number} style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8 }} />
          </div>

          <div style={STYLES.bookingFormRow}>
            <div style={STYLES.bookingFormGroup}>
              <label style={STYLES.bookingLabel}>Full Name:</label>
              <input
                type="text"
                placeholder="E.g., Nabunturan, Justin"
                value={bookingForm.full_name}
                onChange={(e) => setBookingForm({ ...bookingForm, full_name: e.target.value })}
                style={STYLES.bookingInput}
              />
            </div>
          </div>

          <div style={STYLES.bookingFormRow}>
            <div style={STYLES.bookingFormGroup}>
              <label style={STYLES.bookingLabel}>Email Address:</label>
              <input
                type="email"
                placeholder="E.g., Justin@gmail.com"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                style={STYLES.bookingInput}
              />
            </div>
          </div>

          <div style={STYLES.bookingFormRow}>
            <div style={STYLES.bookingFormGroup}>
              <label style={STYLES.bookingLabel}>Contact Number:</label>
              <input
                type="text"
                placeholder="09212312312312"
                value={bookingForm.contact_number}
                onChange={(e) => setBookingForm({ ...bookingForm, contact_number: e.target.value })}
                style={STYLES.bookingInput}
              />
            </div>
          </div>

          <div style={STYLES.bookingFormRow}>
            <div style={STYLES.bookingFormGroup}>
              <label style={STYLES.bookingLabel}>Down payment:</label>
              <input
                type="number"
                placeholder="P 5,000.00"
                value={bookingForm.down_payment}
                onChange={(e) => setBookingForm({ ...bookingForm, down_payment: e.target.value })}
                style={STYLES.bookingInput}
              />
            </div>
          </div>

          <div style={STYLES.bookingFormRow}>
            <div style={STYLES.bookingFormGroup}>
              <label style={STYLES.bookingLabel}>Mode of Payment:</label>
              <select
                value={bookingForm.mode_of_payment}
                onChange={(e) => setBookingForm({ ...bookingForm, mode_of_payment: e.target.value })}
                style={STYLES.bookingSelect}
              >
                <option value="Cash">Cash</option>
                <option value="Gcash">Gcash</option>
              </select>
            </div>
            <div style={STYLES.bookingFormGroup}>
              <label style={STYLES.bookingLabel}>Reservation Status:</label>
              <select
                value={bookingForm.reservation_status}
                onChange={(e) => setBookingForm({ ...bookingForm, reservation_status: e.target.value })}
                style={STYLES.bookingSelect}
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
              </select>
            </div>
          </div>

          <button onClick={handleBookingSubmit} style={STYLES.confirmBtn}>
            Confirm
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={STYLES.pageContainer}>
      <Sidebar onNavigate={onNavigate} currentPage="reservation" onLogout={handleLogout} />

      <div style={STYLES.contentContainer}>
        <h2 style={STYLES.pageTitle}>📅 RESERVATION</h2>

        {selectedRoom ? renderRoomDetails() : renderRoomGrid()}

        {renderEditModal()}
        {renderEditDetailsModal()}
        {renderBookingModal()}

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
      {currentPage === 'reservation' && <ReservationManagement onNavigate={handleNavigate} />}
    </div>
  );
}

// ============================================
// RENDER APP
// ============================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
