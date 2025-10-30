// All components in one file - no ES6 modules
const { useState, useEffect, useMemo, useCallback } = React;
const API_BASE_URL = 'http://localhost:8000/api/tenants';
const RESERVATION_API_URL = 'http://localhost:8000/api/reservations';
const PAYMENT_API_URL = 'http://localhost:8000/api/payments';
const MESSAGE_API_URL = 'http://localhost:8000/api/messages';
const MAINTENANCE_API_URL = 'http://localhost:8000/api/maintenance-reports';
const ADMIN_API_URL = 'http://localhost:8000/api/admin-profiles';

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

function Sidebar({ onNavigate, currentPage, isCollapsed, onToggleSidebar }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const getMenuItemStyle = useCallback((page) => ({
    ...STYLES.menuItem,
    background: currentPage === page ? "rgba(255,255,255,0.1)" : "transparent",
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    padding: isCollapsed ? '15px 10px' : '15px 20px'
  }), [currentPage, isCollapsed]);

  const handleLogout = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  const confirmLogout = useCallback(() => {
    setShowLogoutModal(false);
    alert("✅ You have been logged out successfully!");
    window.location.reload();
  }, []);

  const sidebarStyle = {
    ...STYLES.sidebar,
    width: isCollapsed ? 70 : 250,
    transition: 'width 0.3s ease'
  };

  return (
    <>
      <div style={sidebarStyle}>
        <div style={{
          ...STYLES.sidebarHeader,
          padding: isCollapsed ? '20px 10px' : '20px',
          textAlign: isCollapsed ? 'center' : 'left',
          fontSize: isCollapsed ? '14px' : '18px'
        }}>
          {isCollapsed ? '🏢' : <>THE SAMMIE'S<br />APARTMENT</>}
        </div>
        
        <nav style={STYLES.sidebarNav}>
          <div 
            className="menu-item"
            style={getMenuItemStyle('dashboard')}
            onClick={() => onNavigate('dashboard')}
            title="Dashboard"
          >
            <span style={STYLES.menuIcon}>📊</span> {!isCollapsed && 'Dashboard'}
          </div>
          <div 
            className="menu-item"
            style={getMenuItemStyle('tenants')}
            onClick={() => onNavigate('tenants')}
            title="Tenant Management"
          >
            <span style={STYLES.menuIcon}>👥</span> {!isCollapsed && 'Tenant Management'}
          </div>
          <div 
            className="menu-item"
            style={getMenuItemStyle('reservation')}
            onClick={() => onNavigate('reservation')}
            title="Reservation"
          >
            <span style={STYLES.menuIcon}>📅</span> {!isCollapsed && 'Reservation'}
          </div>
          <div 
            className="menu-item"
            style={getMenuItemStyle('billing')}
            onClick={() => onNavigate('billing')}
            title="Billing"
          >
            <span style={STYLES.menuIcon}>💰</span> {!isCollapsed && 'Billing'}
          </div>
          <div 
            className="menu-item"
            style={getMenuItemStyle('communication')}
            onClick={() => onNavigate('communication')}
            title="Communication"
          >
            <span style={STYLES.menuIcon}>💬</span> {!isCollapsed && 'Communication'}
          </div>
          <div 
            className="menu-item"
            style={getMenuItemStyle('maintenance')}
            onClick={() => onNavigate('maintenance')}
            title="Maintenance"
          >
            <span style={STYLES.menuIcon}>🔧</span> {!isCollapsed && 'Maintenance'}
          </div>
          <div 
            className="menu-item"
            style={getMenuItemStyle('admin')}
            onClick={() => onNavigate('admin')}
            title="Admin Settings"
          >
            <span style={STYLES.menuIcon}>⚙️</span> {!isCollapsed && 'Admin Settings'}
          </div>
        </nav>

        <div style={{
          ...STYLES.logoutContainer,
          left: isCollapsed ? 10 : 20,
          right: isCollapsed ? 10 : 20
        }}>
          <button 
            onClick={handleLogout} 
            style={{
              ...STYLES.logoutBtn,
              width: isCollapsed ? '50px' : 'calc(100% - 40px)',
              padding: isCollapsed ? '12px' : '12px'
            }}
            title="Logout"
          >
            {isCollapsed ? '🚪' : '🚪 Logout'}
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggleSidebar}
        style={{
          position: 'fixed',
          left: isCollapsed ? 70 : 250,
          top: 20,
          zIndex: 1000,
          background: '#1e3a8a',
          color: 'white',
          border: 'none',
          borderRadius: '0 8px 8px 0',
          padding: '12px 8px',
          cursor: 'pointer',
          transition: 'left 0.3s ease',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
        }}
        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        {isCollapsed ? '▶' : '◀'}
      </button>

      {showLogoutModal && (
        <LogoutModal 
          onClose={() => setShowLogoutModal(false)} 
          onConfirm={confirmLogout} 
        />
      )}
    </>
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

function Dashboard({ onNavigate, isCollapsed }) {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div style={STYLES.contentContainer}>
        <h1 style={STYLES.pageTitle}>Dashboard</h1>

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

function AddModal({ addForm, setAddForm, onClose, onSave, errors, reservations = [] }) {
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
            {rooms.map(room => {
              // Check if room is reserved
              const reservation = reservations.find(r => r.room_number === room.number);
              const isReserved = reservation !== undefined;
              const isDisabled = room.status === 'occupied' || isReserved;
              
              let statusLabel = '🟢 Available';
              if (room.status === 'occupied') {
                statusLabel = '🔴 Occupied';
              } else if (isReserved) {
                statusLabel = '� Reserved';
              }
              
              return (
                <option 
                  value={room.number} 
                  disabled={isDisabled}
                  key={room.id}
                >
                  {room.number} {statusLabel}
                </option>
              );
            })}
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
  const [reservations, setReservations] = useState([]);
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

  const fetchReservations = async () => {
    try {
      const res = await fetch(RESERVATION_API_URL, {
        headers: {
          'Accept': 'application/json',
        }
      });
      const data = await res.json();
      setReservations(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Error fetching reservations:', err);
    }
  };
  
  useEffect(() => { 
    fetchTenants(); 
    fetchReservations();
  }, []);

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

  // Helper function to check if a room is reserved (not occupied by a tenant)
  const isRoomReserved = (roomNumber) => {
    return reservations.some(reservation => 
      reservation.room_number === roomNumber && 
      reservation.reservation_status === 'Pending'
    );
  };

  return (
    <div style={STYLES.pageContainer}>
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
                tenants.map((tenant) => {
                  const reserved = isRoomReserved(tenant.room);
                  const textColor = reserved ? '#f59e0b' : '#000000'; // Yellow for reserved, black for normal
                  return (
                    <tr key={`tenant-${tenant.id}`}>
                      <td style={STYLES.tableCell}>
                        <img 
                          src={getAvatarUrl(tenant)} 
                          alt="avatar" 
                          width={50} 
                          height={50} 
                          style={STYLES.avatarStyle} 
                        />
                      </td>
                      <td style={{...STYLES.tableCell, color: textColor}}>{tenant.room}</td>
                      <td style={{...STYLES.tableCell, color: textColor}}>{tenant.name}</td>
                      <td style={{...STYLES.tableCell, color: textColor}}>{tenant.gender}</td>
                      <td style={{...STYLES.tableCell, color: textColor}}>{tenant.contact}</td>
                      <td style={{...STYLES.tableCell, color: textColor}}>{tenant.email}</td>
                      <td style={STYLES.tableCell}>
                        <button style={getButtonStyle("#3b82f6")} onClick={() => openEdit(tenant)}>View/Edit</button>
                        <button style={getButtonStyle("#ef4444", { marginLeft: 5 })} onClick={() => handleDelete(tenant.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })
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
            reservations={reservations}
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
// RESERVATION MANAGEMENT COMPONENT
// ============================================

function ReservationManagement({ onNavigate }) {
  const [rooms, setRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [bookingForm, setBookingForm] = useState({
    full_name: '',
    email: '',
    contact_number: '',
    down_payment: '',
    mode_of_payment: 'Cash',
    reservation_status: 'Pending'
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

  // Fetch reservations
  const fetchReservations = useCallback(async () => {
    try {
      const res = await fetch(RESERVATION_API_URL, {
        headers: {
          'Accept': 'application/json',
        }
      });
      const data = await res.json();
      setReservations(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Error fetching reservations:', err);
    }
  }, []);

  useEffect(() => {
    fetchTenants();
    fetchReservations();
  }, [fetchTenants, fetchReservations]);

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
          'Accept': 'application/json',
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

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Server returned non-JSON response:', await response.text());
        setToast({ message: "❌ Server error. Please check if the API server is running.", type: "error" });
        return;
      }

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
          reservation_status: 'Pending'
        });

        // Refresh reservations list
        fetchReservations();

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
        // Handle validation errors
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(', ');
          setToast({ message: "❌ Validation Error: " + errorMessages, type: "error" });
        } else {
          const errorMsg = data.message || data.error || "Failed to create reservation";
          setToast({ message: "❌ " + errorMsg, type: "error" });
        }
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      setToast({ message: "❌ Error creating reservation. Please try again.", type: "error" });
    }
  }, [bookingForm, selectedRoom, rooms, fetchReservations]);

  // Handle cancel reservation
  const handleCancelReservation = async (reservationId) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;

    try {
      const response = await fetch(`${RESERVATION_API_URL}/${reservationId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (response.ok) {
        setToast({ message: "✅ Reservation cancelled successfully!", type: "success" });
        setShowReservationModal(false);
        setSelectedReservation(null);
        fetchReservations(); // Refresh reservations
      } else {
        setToast({ message: "❌ Failed to cancel reservation", type: "error" });
      }
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      setToast({ message: "❌ Error cancelling reservation. Please try again.", type: "error" });
    }
  };

  // Room Grid View
  const renderRoomGrid = () => {
    return (
      <div style={STYLES.roomGrid}>
        {rooms.map(room => {
          // Find reservation for this room
          const reservation = reservations.find(r => r.room_number === room.number);
          const isReserved = reservation !== undefined;
          const statusColor = isReserved ? '#f59e0b' : (room.status === 'occupied' ? '#ef4444' : '#10b981');
          const statusText = isReserved ? 'Reserved' : (room.status === 'occupied' ? 'Occupied' : 'Available');
        
        return (
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
                <span style={{...STYLES.statusBadgeAvailable, backgroundColor: statusColor}}>
                  {statusText}
                </span>
              </div>
              
              {/* Show reservation info if room is reserved */}
              {isReserved && (
                <div style={{marginTop: 8, fontSize: '13px', color: '#f59e0b'}}>
                  Reserved for:{' '}
                  <button
                    onClick={() => {
                      setSelectedReservation(reservation);
                      setShowReservationModal(true);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#f59e0b',
                      fontWeight: '600',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      padding: 0,
                      font: 'inherit'
                    }}
                  >
                    {reservation.full_name}
                  </button>
                </div>
              )}
              
              {room.status === 'available' && !isReserved && (
                <button 
                  onClick={() => handleViewRoom(room)} 
                  style={{ ...STYLES.viewBtn, marginTop: 10, width: '100%' }}
                >
                  View
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
    );
  };

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
                <option value="Pending">Pending (Reserved)</option>
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

  // Reservation Details Modal
  const renderReservationModal = () => {
    if (!showReservationModal || !selectedReservation) return null;

    return (
      <div style={STYLES.logoutModalOverlay} onClick={() => setShowReservationModal(false)}>
        <div style={STYLES.bookingModal} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setShowReservationModal(false)} style={STYLES.closeIcon}>❌</button>
          
          <h2 style={STYLES.bookingModalTitle}>Reservation Details</h2>
          
          <div style={STYLES.bookingFormGrid}>
            <div style={STYLES.bookingFormGroup}>
              <label style={STYLES.bookingLabel}>Full Name:</label>
              <div style={{...STYLES.bookingInput, backgroundColor: '#f3f4f6', padding: '10px'}}>
                {selectedReservation.full_name}
              </div>
            </div>

            <div style={STYLES.bookingFormGroup}>
              <label style={STYLES.bookingLabel}>Email:</label>
              <div style={{...STYLES.bookingInput, backgroundColor: '#f3f4f6', padding: '10px'}}>
                {selectedReservation.email}
              </div>
            </div>

            <div style={STYLES.bookingFormGroup}>
              <label style={STYLES.bookingLabel}>Contact Number:</label>
              <div style={{...STYLES.bookingInput, backgroundColor: '#f3f4f6', padding: '10px'}}>
                {selectedReservation.contact_number}
              </div>
            </div>

            <div style={STYLES.bookingFormGroup}>
              <label style={STYLES.bookingLabel}>Room Number:</label>
              <div style={{...STYLES.bookingInput, backgroundColor: '#f3f4f6', padding: '10px'}}>
                {selectedReservation.room_number}
              </div>
            </div>

            <div style={STYLES.bookingFormGroup}>
              <label style={STYLES.bookingLabel}>Down Payment:</label>
              <div style={{...STYLES.bookingInput, backgroundColor: '#f3f4f6', padding: '10px'}}>
                ₱{parseFloat(selectedReservation.down_payment).toLocaleString()}
              </div>
            </div>

            <div style={STYLES.bookingFormGroup}>
              <label style={STYLES.bookingLabel}>Mode of Payment:</label>
              <div style={{...STYLES.bookingInput, backgroundColor: '#f3f4f6', padding: '10px'}}>
                {selectedReservation.mode_of_payment}
              </div>
            </div>
          </div>

          <button 
            onClick={() => handleCancelReservation(selectedReservation.id)} 
            style={{...STYLES.confirmBtn, backgroundColor: '#ef4444', marginTop: '15px'}}
          >
            Cancel Reservation
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={STYLES.pageContainer}>
      <div style={STYLES.contentContainer}>
        <h2 style={STYLES.pageTitle}>📅 RESERVATION</h2>

        {selectedRoom ? renderRoomDetails() : renderRoomGrid()}

        {renderEditModal()}
        {renderEditDetailsModal()}
        {renderBookingModal()}
        {renderReservationModal()}

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}

// ============================================
// BILLING AND FINANCE COMPONENT
// ============================================

function BillingAndFinance({ onNavigate }) {
  const [tenants, setTenants] = useState([]);
  const [billingData, setBillingData] = useState([]);
  const [payments, setPayments] = useState([]);
  const [totalPaymentCollected, setTotalPaymentCollected] = useState(0);
  const [outstandingBalance, setOutstandingBalance] = useState(0);
  const [overdueTenantCount, setOverdueTenantCount] = useState(0);
  const [collectionRate, setCollectionRate] = useState(0);
  const [showHistoryView, setShowHistoryView] = useState(false);
  const [showTenantSelectModal, setShowTenantSelectModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [paymentItems, setPaymentItems] = useState({
    downpayment: { checked: false, amount: '' },
    water: { checked: false, amount: '' },
    electricity: { checked: false, amount: '' },
    rent: { checked: false, amount: '' },
    maintenance: { checked: false, amount: '' }
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Fetch tenants data
  const fetchTenants = useCallback(async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      const tenantList = Array.isArray(data.data) ? data.data : [];
      setTenants(tenantList);
      
      // Process billing data
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      // Calculate total payment collected this month (placeholder - will be implemented later)
      setTotalPaymentCollected(42000.00);
      
      // Calculate overdue tenants (tenants whose due date has passed)
      const overdueCount = tenantList.filter(tenant => {
        if (!tenant.created_at) return false;
        const createdDate = new Date(tenant.created_at);
        const dueDate = new Date(createdDate);
        dueDate.setMonth(dueDate.getMonth() + 1); // Due date is 1 month after creation
        return dueDate < currentDate;
      }).length;
      setOverdueTenantCount(overdueCount);
      
      // Prepare billing data for table
      const billing = tenantList.map(tenant => {
        const createdDate = new Date(tenant.created_at);
        const dueDate = new Date(createdDate);
        dueDate.setMonth(dueDate.getMonth() + 1); // Due date is 1 month after creation
        
        const isOverdue = dueDate < currentDate;
        const isPaid = false; // Placeholder - will be implemented with payment system
        
        return {
          id: tenant.id,
          name: tenant.name,
          unit: tenant.room,
          amountDue: 1000, // Placeholder amount
          dueDate: dueDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }),
          dueDateObj: dueDate,
          status: isPaid ? 'Paid' : (isOverdue ? 'Due' : 'Unpaid'),
          statusColor: isPaid ? '#10b981' : (isOverdue ? '#ef4444' : '#f59e0b')
        };
      });
      
      setBillingData(billing);
      
      // Placeholder values for future implementation
      setOutstandingBalance(15000);
      setCollectionRate(43.5);
      
    } catch (err) {
      console.error('Error fetching tenants:', err);
    }
  }, []);

  // Fetch payment history
  const fetchPayments = useCallback(async () => {
    try {
      const res = await fetch(PAYMENT_API_URL, {
        headers: {
          'Accept': 'application/json',
        }
      });
      const data = await res.json();
      setPayments(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Error fetching payments:', err);
    }
  }, []);

  useEffect(() => {
    fetchTenants();
    fetchPayments();
  }, [fetchTenants, fetchPayments]);

  // Handle Add Payee button click
  const handleAddPayeeClick = () => {
    setShowTenantSelectModal(true);
  };

  // Handle tenant selection
  const handleTenantSelect = (tenant) => {
    setSelectedTenant(tenant);
    setShowTenantSelectModal(false);
    setShowPaymentModal(true);
    // Reset payment items
    setPaymentItems({
      downpayment: { checked: false, amount: '' },
      water: { checked: false, amount: '' },
      electricity: { checked: false, amount: '' },
      rent: { checked: false, amount: '' },
      maintenance: { checked: false, amount: '' }
    });
  };

  // Handle payment item checkbox
  const handlePaymentItemChange = (item, checked) => {
    setPaymentItems(prev => ({
      ...prev,
      [item]: { ...prev[item], checked }
    }));
  };

  // Handle payment amount change
  const handlePaymentAmountChange = (item, amount) => {
    setPaymentItems(prev => ({
      ...prev,
      [item]: { ...prev[item], amount }
    }));
  };

  // Calculate total payment
  const calculateTotalPayment = () => {
    let total = 0;
    Object.values(paymentItems).forEach(item => {
      if (item.checked && item.amount) {
        total += parseFloat(item.amount) || 0;
      }
    });
    return total;
  };

  // Handle payment confirmation
  const handlePaymentConfirm = async () => {
    const totalAmount = calculateTotalPayment();
    
    if (totalAmount <= 0) {
      alert('Please add at least one payment item with an amount.');
      return;
    }

    // Create payment notes
    const notes = Object.entries(paymentItems)
      .filter(([_, item]) => item.checked && item.amount)
      .map(([key, item]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ₱${parseFloat(item.amount).toLocaleString()}`)
      .join(', ');

    // Find tenant's due date from billing data
    const tenantBilling = billingData.find(b => b.id === selectedTenant.id);
    const dueDate = tenantBilling ? tenantBilling.dueDateObj : new Date();

    try {
      const response = await fetch(PAYMENT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          tenant_id: selectedTenant.id,
          tenant_name: selectedTenant.name,
          room_number: selectedTenant.room,
          amount: totalAmount,
          payment_date: new Date().toISOString().split('T')[0],
          due_date: dueDate.toISOString().split('T')[0],
          payment_method: 'Cash', // Default, can be made selectable
          notes: notes
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('✅ Payment recorded successfully!');
        setShowPaymentModal(false);
        setSelectedTenant(null);
        // Refresh data
        fetchPayments();
        fetchTenants();
      } else {
        alert('❌ Failed to record payment: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error recording payment:', error);
      alert('❌ Error recording payment. Please try again.');
    }
  };

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedBillingData = useMemo(() => {
    let sortedData = [...billingData];
    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Special handling for different data types
        if (sortConfig.key === 'amountDue') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        } else if (sortConfig.key === 'dueDate') {
          aValue = a.dueDateObj;
          bValue = b.dueDateObj;
        } else if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedData;
  }, [billingData, sortConfig]);

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return ' ↕';
    }
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  // Sorted payment history
  const sortedPayments = useMemo(() => {
    let sorted = [...payments];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'amount') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        } else if (sortConfig.key === 'payment_date' || sortConfig.key === 'due_date') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [payments, sortConfig]);

  return (
    <div style={STYLES.pageContainer}>
      {!showHistoryView ? (
        /* MAIN BILLING VIEW */
        <div style={STYLES.contentContainer}>
          <h2 style={STYLES.pageTitle}>BILLING AND FINANCE</h2>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          marginBottom: 30
        }}>
          {/* Total Payment Collected */}
          <div style={{
            background: 'white',
            padding: 20,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
              Total Payment Collected
            </div>
            <div style={{ fontSize: 28, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 8 }}>
              ₱{totalPaymentCollected.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              This Month
            </div>
          </div>

          {/* Outstanding Balance */}
          <div style={{
            background: 'white',
            padding: 20,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
              Outstanding Balance
            </div>
            <div style={{ fontSize: 28, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 8 }}>
              ₱{outstandingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              Current
            </div>
          </div>

          {/* Overdue Tenant */}
          <div style={{
            background: 'white',
            padding: 20,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
              Overdue Tenant
            </div>
            <div style={{ fontSize: 28, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 8 }}>
              {overdueTenantCount}
            </div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              Accounts
            </div>
          </div>

          {/* Collection Rates */}
          <div style={{
            background: 'white',
            padding: 20,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>
              Collection Rates
            </div>
            <div style={{ fontSize: 28, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 8 }}>
              {collectionRate}%
            </div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              This Month
            </div>
          </div>
        </div>

        {/* Billing Table */}
        <div style={{
          background: 'white',
          borderRadius: 8,
          border: '1px solid #e5e7eb',
          padding: 20,
          marginBottom: 30
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <th 
                  onClick={() => handleSort('name')}
                  style={{
                    padding: 12,
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  Tenant Name{getSortIcon('name')}
                </th>
                <th 
                  onClick={() => handleSort('unit')}
                  style={{
                    padding: 12,
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  Unit{getSortIcon('unit')}
                </th>
                <th 
                  onClick={() => handleSort('amountDue')}
                  style={{
                    padding: 12,
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  Amount Due{getSortIcon('amountDue')}
                </th>
                <th 
                  onClick={() => handleSort('dueDate')}
                  style={{
                    padding: 12,
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  Due Date{getSortIcon('dueDate')}
                </th>
                <th style={{
                  padding: 12,
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151'
                }}>
                  Status
                </th>
                <th style={{
                  padding: 12,
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedBillingData.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: 20, textAlign: 'center', color: '#6b7280' }}>
                    No billing data available
                  </td>
                </tr>
              ) : (
                sortedBillingData.map(billing => (
                  <tr key={billing.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                      {billing.name}
                    </td>
                    <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                      {billing.unit}
                    </td>
                    <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                      ₱{billing.amountDue.toLocaleString()}
                    </td>
                    <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                      {billing.dueDate}
                    </td>
                    <td style={{ padding: 12 }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        backgroundColor: billing.statusColor,
                        color: 'white'
                      }}>
                        {billing.status}
                      </span>
                    </td>
                    <td style={{ padding: 12, textAlign: 'center' }}>
                      <button style={{
                        background: 'none',
                        border: 'none',
                        fontSize: 18,
                        cursor: 'pointer',
                        color: '#3b82f6'
                      }}>
                        •••
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 15, justifyContent: 'center' }}>
          <button 
            onClick={handleAddPayeeClick}
            style={{
              padding: '12px 32px',
              background: '#475569',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Add Payee
          </button>
          <button 
            onClick={() => setShowHistoryView(true)}
            style={{
              padding: '12px 32px',
              background: '#475569',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            View History
          </button>
        </div>
      </div>
      ) : (
        /* PAYMENT HISTORY VIEW */
        <div style={STYLES.contentContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
            <h2 style={STYLES.pageTitle}>PAYMENT HISTORY</h2>
            <button 
              onClick={() => setShowHistoryView(false)}
              style={{
                padding: '10px 20px',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              ← Back to Billing
            </button>
          </div>

          {/* Payment History Table */}
          <div style={{
            background: 'white',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            padding: 20
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                  <th 
                    onClick={() => handleSort('payment_date')}
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#374151',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    Payment Date{getSortIcon('payment_date')}
                  </th>
                  <th 
                    onClick={() => handleSort('tenant_name')}
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#374151',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    Tenant Name{getSortIcon('tenant_name')}
                  </th>
                  <th 
                    onClick={() => handleSort('room_number')}
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#374151',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    Room{getSortIcon('room_number')}
                  </th>
                  <th 
                    onClick={() => handleSort('amount')}
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#374151',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    Amount{getSortIcon('amount')}
                  </th>
                  <th 
                    onClick={() => handleSort('due_date')}
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#374151',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    Due Date{getSortIcon('due_date')}
                  </th>
                  <th 
                    onClick={() => handleSort('payment_method')}
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#374151',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    Method{getSortIcon('payment_method')}
                  </th>
                  <th style={{
                    padding: 12,
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#374151'
                  }}>
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedPayments.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: 20, textAlign: 'center', color: '#6b7280' }}>
                      No payment history available
                    </td>
                  </tr>
                ) : (
                  sortedPayments.map(payment => (
                    <tr key={payment.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                        {new Date(payment.payment_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                        {payment.tenant_name}
                      </td>
                      <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                        {payment.room_number}
                      </td>
                      <td style={{ padding: 12, fontSize: 14, color: '#2c3e50', fontWeight: 600 }}>
                        ₱{parseFloat(payment.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                        {new Date(payment.due_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: 500,
                          backgroundColor: '#e0f2fe',
                          color: '#0369a1'
                        }}>
                          {payment.payment_method}
                        </span>
                      </td>
                      <td style={{ padding: 12, fontSize: 14, color: '#6b7280' }}>
                        {payment.notes || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tenant Selection Modal */}
      {showTenantSelectModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: 8,
            padding: '24px',
            maxWidth: 500,
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 20, color: '#2c3e50' }}>Add tenant</h3>
              <button 
                onClick={() => setShowTenantSelectModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: 20 }}>
              {tenants.map(tenant => {
                // Check if tenant is unpaid (has overdue amount)
                const billingInfo = billingData.find(b => b.tenant_id === tenant.id);
                const isUnpaid = billingInfo && billingInfo.status === 'Overdue';
                
                return (
                  <label 
                    key={tenant.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px',
                      marginBottom: 8,
                      cursor: 'pointer',
                      borderRadius: 4,
                      transition: 'background 0.2s',
                      ':hover': { background: '#f9fafb' }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTenant?.id === tenant.id}
                      onChange={() => setSelectedTenant(selectedTenant?.id === tenant.id ? null : tenant)}
                      style={{
                        marginRight: 12,
                        width: 18,
                        height: 18,
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ 
                      fontSize: 16,
                      color: isUnpaid ? '#ef4444' : '#2c3e50',
                      fontWeight: isUnpaid ? 500 : 400
                    }}>
                      {tenant.name} {tenant.room_number ? `(Room ${tenant.room_number})` : ''}
                    </span>
                  </label>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowTenantSelectModal(false)}
                style={{
                  padding: '10px 24px',
                  background: '#e5e7eb',
                  color: '#374151',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => selectedTenant && handleTenantSelect(selectedTenant)}
                disabled={!selectedTenant}
                style={{
                  padding: '10px 24px',
                  background: selectedTenant ? '#475569' : '#d1d5db',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: selectedTenant ? 'pointer' : 'not-allowed'
                }}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Breakdown Modal */}
      {showPaymentModal && selectedTenant && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: 8,
            padding: '24px',
            maxWidth: 500,
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 20, color: '#2c3e50' }}>
                Tenant: {selectedTenant.name}
              </h3>
              <button 
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedTenant(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: 20 }}>
              {Object.entries(paymentItems).map(([key, item]) => (
                <div 
                  key={key}
                  style={{
                    padding: '12px',
                    marginBottom: 8,
                    border: '1px solid #e5e7eb',
                    borderRadius: 6
                  }}
                >
                  <label style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => handlePaymentItemChange(key, e.target.checked)}
                      style={{
                        marginRight: 12,
                        width: 18,
                        height: 18,
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ 
                      fontSize: 16,
                      color: '#2c3e50',
                      textTransform: 'capitalize',
                      fontWeight: 500
                    }}>
                      {key}
                    </span>
                  </label>
                  
                  {item.checked && (
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => handlePaymentAmountChange(key, e.target.value)}
                      placeholder="Enter amount"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: 4,
                        fontSize: 14
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div style={{
              padding: '16px',
              background: '#f9fafb',
              borderRadius: 6,
              marginBottom: 20,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>TOTAL AMOUNT</div>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: '#2c3e50' }}>
                ₱{calculateTotalPayment().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedTenant(null);
                }}
                style={{
                  padding: '10px 24px',
                  background: '#e5e7eb',
                  color: '#374151',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentConfirm}
                style={{
                  padding: '10px 24px',
                  background: '#475569',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// COMMUNICATION CENTER COMPONENT
// ============================================

function CommunicationCenter({ onNavigate }) {
  const [messages, setMessages] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [showTenantSelectModal, setShowTenantSelectModal] = useState(false);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(MESSAGE_API_URL, {
        headers: {
          'Accept': 'application/json',
        }
      });
      const data = await res.json();
      setMessages(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Error fetching messages:', err);
      alert('❌ Failed to fetch messages');
    }
  }, []);

  // Fetch tenants
  const fetchTenants = useCallback(async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      setTenants(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Error fetching tenants:', err);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    fetchTenants();
  }, [fetchMessages, fetchTenants]);

  // Handle "Send to All" button click
  const handleSendToAllClick = () => {
    setShowTenantSelectModal(true);
  };

  // Handle tenant selection from the card grid
  const handleTenantCardClick = (tenant) => {
    setSelectedTenant(tenant);
    setShowTenantSelectModal(false);
    setShowSendMessageModal(true);
  };

  // Handle "Send Message" (broadcast) button click
  const handleBroadcastClick = () => {
    setShowBroadcastModal(true);
  };

  // Send individual message
  const handleSendIndividualMessage = async () => {
    if (!messageText.trim()) {
      alert('⚠️ Please enter a message');
      return;
    }

    try {
      const response = await fetch(MESSAGE_API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          tenant_id: selectedTenant.id,
          tenant_name: selectedTenant.name,
          message: messageText,
          is_broadcast: false
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Message sent successfully!');
        setShowSendMessageModal(false);
        setMessageText('');
        setSelectedTenant(null);
        fetchMessages();
      } else {
        alert('❌ Failed to send message');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      alert('❌ Error sending message');
    }
  };

  // Send broadcast message to all tenants
  const handleSendBroadcastMessage = async () => {
    if (!messageText.trim()) {
      alert('⚠️ Please enter a message');
      return;
    }

    try {
      const response = await fetch(MESSAGE_API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          tenant_id: null,
          tenant_name: 'All Tenants',
          message: messageText,
          is_broadcast: true
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Broadcast message sent successfully!');
        setShowBroadcastModal(false);
        setMessageText('');
        fetchMessages();
      } else {
        alert('❌ Failed to send broadcast message');
      }
    } catch (err) {
      console.error('Error sending broadcast:', err);
      alert('❌ Error sending broadcast message');
    }
  };

  // Helper to get avatar URL
  const getAvatarUrl = (tenant) => {
    if (!tenant) return DEFAULT_AVATARS[tenant?.gender?.toLowerCase()] || DEFAULT_AVATARS.male;
    if (tenant.avatar_url) {
      return tenant.avatar_url.startsWith('http') 
        ? tenant.avatar_url 
        : `http://localhost:8000${tenant.avatar_url}`;
    }
    return DEFAULT_AVATARS[tenant.gender?.toLowerCase()] || DEFAULT_AVATARS.male;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Pagination
  const totalPages = Math.ceil(messages.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentMessages = messages.slice(startIndex, endIndex);

  return (
    <div style={STYLES.pageContainer}>
      <div style={STYLES.contentContainer}>
        <h1 style={STYLES.pageTitle}>COMMUNICATION CENTER</h1>        {/* Messages Table */}
        <div style={{
          background: 'white',
          borderRadius: 8,
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: 30
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{
                  padding: 12,
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151'
                }}>
                  <input type="checkbox" style={{ marginRight: 8 }} />
                  Tenant
                </th>
                <th style={{
                  padding: 12,
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151'
                }}>
                  Message
                </th>
                <th style={{
                  padding: 12,
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151'
                }}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {currentMessages.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ padding: 20, textAlign: 'center', color: '#6b7280' }}>
                    No messages yet
                  </td>
                </tr>
              ) : (
                currentMessages.map(message => (
                  <tr key={message.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                      {message.is_broadcast ? (
                        <span style={{ fontWeight: 500 }}>To All : </span>
                      ) : (
                        <span>To {message.tenant_name} : </span>
                      )}
                    </td>
                    <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                      {message.message}
                    </td>
                    <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                      {formatDate(message.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            padding: '0 12px'
          }}>
            <div style={{ fontSize: 14, color: '#6b7280' }}>
              {startIndex + 1}-{Math.min(endIndex, messages.length)} of {messages.length} items
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 14, color: '#6b7280' }}>Rows per page</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: 4,
                  fontSize: 14,
                  cursor: 'pointer'
                }}
              >
                <option value={4}>4</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 12px',
                  background: currentPage === 1 ? '#e5e7eb' : 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: 4,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                ◀
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                style={{
                  padding: '8px 12px',
                  background: (currentPage === totalPages || totalPages === 0) ? '#e5e7eb' : 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: 4,
                  cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer'
                }}
              >
                ▶
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 15, justifyContent: 'center' }}>
          <button
            onClick={handleSendToAllClick}
            style={{
              padding: '12px 32px',
              background: '#475569',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Send to All
          </button>
          <button
            onClick={handleBroadcastClick}
            style={{
              padding: '12px 32px',
              background: '#475569',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Send Message
          </button>
        </div>
      </div>

      {/* Tenant Selection Modal (Card Grid) */}
      {showTenantSelectModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#f5f5dc',
            borderRadius: 8,
            padding: '32px',
            maxWidth: '90vw',
            width: 1100,
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 24, color: '#2c3e50' }}>COMMUNICATION CENTER</h2>
              <button 
                onClick={() => setShowTenantSelectModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 28,
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            {/* Tenant Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
              marginBottom: 24
            }}>
              {tenants.map(tenant => (
                <div
                  key={tenant.id}
                  onClick={() => handleTenantCardClick(tenant)}
                  style={{
                    background: 'white',
                    borderRadius: 8,
                    padding: '20px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    ':hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <div style={{
                    background: '#475569',
                    borderRadius: '8px 8px 0 0',
                    padding: '40px 20px',
                    marginBottom: 16,
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={getAvatarUrl(tenant)}
                      alt={tenant.name}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '4px solid white'
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                      Tenant Name: {tenant.name}
                    </div>
                    <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>
                      Gender: {tenant.gender}
                    </div>
                    <div style={{ fontSize: 14, color: '#6b7280' }}>
                      Room Number : {tenant.room}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowTenantSelectModal(false)}
                style={{
                  padding: '12px 32px',
                  background: '#475569',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Individual Message Modal */}
      {showSendMessageModal && selectedTenant && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#f5f5dc',
            borderRadius: 8,
            padding: '32px',
            maxWidth: 900,
            width: '90%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 24, color: '#2c3e50' }}>COMMUNICATION CENTER</h2>
            </div>

            {/* Selected Tenant Info */}
            <div style={{
              background: 'white',
              borderRadius: 8,
              padding: '20px',
              marginBottom: 24,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16
              }}>
                <img
                  src={getAvatarUrl(selectedTenant)}
                  alt={selectedTenant.name}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #475569'
                  }}
                />
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#2c3e50', marginBottom: 4 }}>
                    Tenant Name: {selectedTenant.name}
                  </div>
                  <div style={{ fontSize: 14, color: '#6b7280' }}>
                    Room Number : {selectedTenant.room}
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div style={{
              background: 'white',
              borderRadius: 8,
              padding: '24px',
              marginBottom: 24,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>Rawr</div>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message here..."
                style={{
                  width: '100%',
                  minHeight: 200,
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowSendMessageModal(false);
                  setMessageText('');
                  setSelectedTenant(null);
                }}
                style={{
                  padding: '12px 32px',
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSendIndividualMessage}
                style={{
                  padding: '12px 32px',
                  background: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <span>✈</span> Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Message Modal */}
      {showBroadcastModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#f5f5dc',
            borderRadius: 8,
            padding: '32px',
            maxWidth: 900,
            width: '90%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 24, color: '#2c3e50' }}>COMMUNICATION CENTER</h2>
            </div>

            {/* All Tenants Avatars (Compressed) */}
            <div style={{
              background: 'white',
              borderRadius: 8,
              padding: '20px',
              marginBottom: 24,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: -8,
                marginBottom: 12
              }}>
                {tenants.slice(0, 8).map((tenant, index) => (
                  <img
                    key={tenant.id}
                    src={getAvatarUrl(tenant)}
                    alt={tenant.name}
                    title={tenant.name}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid white',
                      marginLeft: index > 0 ? -12 : 0,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                ))}
                {tenants.length > 8 && (
                  <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: '#475569',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 600,
                    border: '3px solid white',
                    marginLeft: -12,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    +{tenants.length - 8}
                  </div>
                )}
              </div>
            </div>

            {/* Message Input */}
            <div style={{
              background: 'white',
              borderRadius: 8,
              padding: '24px',
              marginBottom: 24,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 8 }}>Rawr</div>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your broadcast message here..."
                style={{
                  width: '100%',
                  minHeight: 200,
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowBroadcastModal(false);
                  setMessageText('');
                }}
                style={{
                  padding: '12px 32px',
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSendBroadcastMessage}
                style={{
                  padding: '12px 32px',
                  background: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <span>✈</span> Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// MAINTENANCE MANAGEMENT COMPONENT
// ============================================

function MaintenanceManagement({ onNavigate }) {
  const [reports, setReports] = useState([]);
  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [showConfirmStatusModal, setShowConfirmStatusModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  // Form state
  const [formData, setFormData] = useState({
    maintenance_type: '',
    tenant_name: '',
    room_number: '',
    note: '',
    start_date: new Date().toISOString().split('T')[0],
    price: 0
  });
  
  const [errors, setErrors] = useState({});

  // Fetch maintenance reports
  const fetchReports = useCallback(async () => {
    try {
      const res = await fetch(MAINTENANCE_API_URL, {
        headers: {
          'Accept': 'application/json',
        }
      });
      const data = await res.json();
      const reportsData = Array.isArray(data.data) ? data.data : [];
      console.log('Fetched reports:', reportsData);
      setReports(reportsData);
    } catch (err) {
      console.error('Error fetching maintenance reports:', err);
      alert('❌ Failed to fetch maintenance reports');
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Maintenance type validation - no symbols
    if (!formData.maintenance_type.trim()) {
      newErrors.maintenance_type = 'Maintenance type is required';
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.maintenance_type)) {
      newErrors.maintenance_type = 'Maintenance type must not contain symbols';
    }
    
    // Tenant name validation - letters, spaces, dots, hyphens, apostrophes only
    if (!formData.tenant_name.trim()) {
      newErrors.tenant_name = 'Tenant name is required';
    } else if (!/^[a-zA-Z\s\.\-\']+$/.test(formData.tenant_name)) {
      newErrors.tenant_name = 'Tenant name must only contain letters, spaces, dots, hyphens, and apostrophes';
    }
    
    // Room number validation - alphanumeric only
    if (!formData.room_number.trim()) {
      newErrors.room_number = 'Room number is required';
    } else if (!/^[A-Z0-9]+$/i.test(formData.room_number)) {
      newErrors.room_number = 'Room number must be alphanumeric only (no symbols)';
    }
    
    // Start date validation
    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle add report
  const handleAddReport = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(MAINTENANCE_API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Maintenance report added successfully!');
        setShowAddReportModal(false);
        setFormData({
          maintenance_type: '',
          tenant_name: '',
          room_number: '',
          note: '',
          start_date: new Date().toISOString().split('T')[0],
          price: 0
        });
        setErrors({});
        fetchReports();
      } else {
        alert('❌ Failed to add maintenance report');
      }
    } catch (err) {
      console.error('Error adding report:', err);
      alert('❌ Error adding maintenance report');
    }
  };

  // Handle status change confirmation
  const handleStatusClick = (report) => {
    if (report.status === 'Ongoing') {
      setSelectedReport(report);
      setShowConfirmStatusModal(true);
    }
  };

  // Confirm status change to Done
  const confirmStatusChange = async () => {
    if (!selectedReport) return;

    try {
      const response = await fetch(`${MAINTENANCE_API_URL}/${selectedReport.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Done' })
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Status updated to Done!');
        setShowConfirmStatusModal(false);
        setSelectedReport(null);
        fetchReports();
      } else {
        alert('❌ Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('❌ Error updating status');
    }
  };

  // Calendar functions
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  // Get reports for calendar display
  const getReportsForDate = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${month}-${dayStr}`;
    
    const filtered = reports.filter(report => {
      // Extract just the date part from the report's start_date
      const reportDate = report.start_date ? report.start_date.split('T')[0] : report.start_date;
      const matches = reportDate === dateStr;
      
      // Debug logging (can be removed later)
      if (matches) {
        console.log(`Match found for ${dateStr}: ${report.maintenance_type}`);
      }
      
      return matches;
    });
    
    return filtered;
  };

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedReports = () => {
    if (!sortConfig.key) return reports;
    
    return [...reports].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return ' ↕';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    });
  };

  const sortedReports = getSortedReports();

  return (
    <div style={STYLES.pageContainer}>
      <div style={STYLES.contentContainer}>
        <h1 style={STYLES.pageTitle}>MAINTENANCE</h1>

        {/* Calendar Section */}
        <div style={{
          background: 'white',
          borderRadius: 8,
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: 30,
          position: 'relative'
        }}>
          <h2 style={{
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
            color: '#2c3e50'
          }}>
            {currentMonth.toUpperCase()} {currentYear}
          </h2>

          {/* Calendar Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 1,
            marginBottom: 20
          }}>
            {/* Day Headers */}
            {['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'].map(day => (
              <div key={day} style={{
                padding: '12px',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 12,
                color: '#2c3e50',
                background: '#f9fafb'
              }}>
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} style={{
                padding: '12px',
                minHeight: 80,
                background: '#f9fafb'
              }} />
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dayReports = getReportsForDate(day);
              
              return (
                <div key={day} style={{
                  padding: '8px',
                  minHeight: 80,
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  position: 'relative'
                }}>
                  <div style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#2c3e50',
                    marginBottom: 4
                  }}>
                    {day}
                  </div>
                  {dayReports.map(report => (
                    <div key={report.id} style={{
                      fontSize: 9,
                      padding: '2px 4px',
                      background: report.status === 'Done' ? '#22c55e' : '#f59e0b',
                      color: 'white',
                      borderRadius: 2,
                      marginBottom: 2,
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {report.maintenance_type} UNIT {report.room_number}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Add Report Button */}
          <button
            onClick={() => setShowAddReportModal(true)}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              padding: '10px 24px',
              background: '#475569',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Add Report
          </button>
        </div>

        {/* Reports Table */}
        <div style={{
          background: 'white',
          borderRadius: 8,
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <th 
                  onClick={() => handleSort('tenant_name')}
                  style={{
                    padding: 12,
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  Tenant Name{getSortIcon('tenant_name')}
                </th>
                <th 
                  onClick={() => handleSort('room_number')}
                  style={{
                    padding: 12,
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  Room{getSortIcon('room_number')}
                </th>
                <th 
                  onClick={() => handleSort('maintenance_type')}
                  style={{
                    padding: 12,
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  Repair{getSortIcon('maintenance_type')}
                </th>
                <th 
                  onClick={() => handleSort('start_date')}
                  style={{
                    padding: 12,
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  Start Date{getSortIcon('start_date')}
                </th>
                <th 
                  onClick={() => handleSort('price')}
                  style={{
                    padding: 12,
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  Price{getSortIcon('price')}
                </th>
                <th style={{
                  padding: 12,
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151'
                }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedReports.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: 20, textAlign: 'center', color: '#6b7280' }}>
                    No maintenance reports yet
                  </td>
                </tr>
              ) : (
                sortedReports.map(report => (
                  <tr key={report.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                      {report.tenant_name}
                    </td>
                    <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                      {report.room_number}
                    </td>
                    <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                      {report.maintenance_type}
                    </td>
                    <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                      {formatDate(report.start_date)}
                    </td>
                    <td style={{ padding: 12, fontSize: 14, color: '#2c3e50' }}>
                      ₱ {report.price}
                    </td>
                    <td style={{ padding: 12 }}>
                      <span
                        onClick={() => handleStatusClick(report)}
                        style={{
                          padding: '6px 16px',
                          background: report.status === 'Done' ? '#22c55e' : '#f59e0b',
                          color: 'white',
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: report.status === 'Ongoing' ? 'pointer' : 'default',
                          display: 'inline-block'
                        }}
                      >
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Report Modal */}
      {showAddReportModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: 8,
            padding: '32px',
            maxWidth: 600,
            width: '90%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              margin: 0,
              marginBottom: 24,
              fontSize: 24,
              color: '#2c3e50',
              textAlign: 'center'
            }}>
              ADD REPORT
            </h2>

            {/* Maintenance Type */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#374151'
              }}>
                Maintenance :
              </label>
              <input
                type="text"
                placeholder="e.g., Faucet"
                value={formData.maintenance_type}
                onChange={(e) => handleInputChange('maintenance_type', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.maintenance_type ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: 6,
                  fontSize: 14,
                  background: '#f9fafb'
                }}
              />
              {errors.maintenance_type && (
                <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>
                  {errors.maintenance_type}
                </div>
              )}
            </div>

            {/* Tenant Name */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#374151'
              }}>
                Tenant Name :
              </label>
              <input
                type="text"
                placeholder="e.g. Santa Claus"
                value={formData.tenant_name}
                onChange={(e) => handleInputChange('tenant_name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.tenant_name ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: 6,
                  fontSize: 14,
                  background: '#f9fafb'
                }}
              />
              {errors.tenant_name && (
                <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>
                  {errors.tenant_name}
                </div>
              )}
            </div>

            {/* Room Number */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#374151'
              }}>
                Room Number:
              </label>
              <input
                type="text"
                placeholder="015"
                value={formData.room_number}
                onChange={(e) => handleInputChange('room_number', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.room_number ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: 6,
                  fontSize: 14,
                  background: '#f9fafb'
                }}
              />
              {errors.room_number && (
                <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>
                  {errors.room_number}
                </div>
              )}
            </div>

            {/* Note */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#374151'
              }}>
                Note :
              </label>
              <textarea
                placeholder="Add a note..."
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                style={{
                  width: '100%',
                  minHeight: 100,
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  fontSize: 14,
                  background: '#f9fafb',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  setShowAddReportModal(false);
                  setFormData({
                    maintenance_type: '',
                    tenant_name: '',
                    room_number: '',
                    note: '',
                    start_date: new Date().toISOString().split('T')[0],
                    price: 0
                  });
                  setErrors({});
                }}
                style={{
                  padding: '12px 40px',
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Back
              </button>
              <button
                onClick={handleAddReport}
                style={{
                  padding: '12px 40px',
                  background: '#475569',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Status Change Modal */}
      {showConfirmStatusModal && selectedReport && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: 8,
            padding: '32px',
            maxWidth: 400,
            width: '90%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2 style={{
              margin: 0,
              marginBottom: 12,
              fontSize: 20,
              color: '#2c3e50'
            }}>
              Confirm Status Change
            </h2>
            <p style={{
              marginBottom: 24,
              fontSize: 14,
              color: '#6b7280'
            }}>
              Are you sure you want to mark this maintenance as <strong>Done</strong>?
            </p>
            <p style={{
              marginBottom: 24,
              fontSize: 14,
              color: '#374151'
            }}>
              <strong>{selectedReport.maintenance_type}</strong> - Room {selectedReport.room_number}
            </p>
            <div style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  setShowConfirmStatusModal(false);
                  setSelectedReport(null);
                }}
                style={{
                  padding: '10px 24px',
                  background: '#e5e7eb',
                  color: '#374151',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                style={{
                  padding: '10px 24px',
                  background: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// ADMIN SETTINGS COMPONENT
// ============================================

function AdminSettings({ onNavigate }) {
  const [adminProfile, setAdminProfile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

  // Fetch admin profile
  const fetchAdminProfile = useCallback(async () => {
    try {
      const res = await fetch(ADMIN_API_URL, {
        headers: {
          'Accept': 'application/json',
        }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAdminProfile(data.data);
        setFormData({
          name: data.data.name,
          email: data.data.email,
          mobile_number: data.data.mobile_number,
          password: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      console.error('Error fetching admin profile:', err);
      alert('❌ Failed to fetch admin profile');
    }
  }, []);

  useEffect(() => {
    fetchAdminProfile();
  }, [fetchAdminProfile]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation - letters, spaces, dots, hyphens, apostrophes only
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s\.\-\']+$/.test(formData.name)) {
      newErrors.name = 'Name must only contain letters, spaces, dots, hyphens, and apostrophes';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Mobile number validation - Philippine format
    if (!formData.mobile_number.trim()) {
      newErrors.mobile_number = 'Mobile number is required';
    } else if (!/^(09\d{9}|\+639\d{9})$/.test(formData.mobile_number)) {
      newErrors.mobile_number = 'Mobile number must be in Philippine format (e.g., 09123456789 or +639123456789)';
    }
    
    // Password validation (only if password is provided)
    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle edit profile
  const handleEditProfile = () => {
    setShowEditModal(true);
    setIsEditing(true);
  };

  // Handle avatar click
  const handleAvatarClick = () => {
    setShowAvatarModal(true);
    setPreviewAvatar(adminProfile?.avatar || null);
  };

  // Handle avatar selection from predefined avatars
  const handleSelectPredefinedAvatar = (avatarUrl) => {
    setPreviewAvatar(avatarUrl);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('❌ File size must be less than 2MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('❌ Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save avatar
  const handleSaveAvatar = async () => {
    if (!previewAvatar) {
      alert('❌ Please select an avatar');
      return;
    }

    try {
      const response = await fetch(`${ADMIN_API_URL}/${adminProfile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: previewAvatar })
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Avatar updated successfully!');
        setShowAvatarModal(false);
        fetchAdminProfile();
      } else {
        alert('❌ Failed to update avatar');
      }
    } catch (err) {
      console.error('Error updating avatar:', err);
      alert('❌ Error updating avatar');
    }
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        mobile_number: formData.mobile_number
      };

      // Only include password if it was changed
      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await fetch(`${ADMIN_API_URL}/${adminProfile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Profile updated successfully!');
        setShowEditModal(false);
        setIsEditing(false);
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        setErrors({});
        fetchAdminProfile();
      } else {
        alert('❌ Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('❌ Error updating profile');
    }
  };

  // Get avatar URL (default Shrek avatar as shown in mockup)
  const getAvatarUrl = () => {
    if (adminProfile?.avatar) {
      return adminProfile.avatar;
    }
    return DEFAULT_AVATARS.male; // Using default avatar
  };

  if (!adminProfile) {
    return (
      <div style={STYLES.pageContainer}>
        <div style={STYLES.contentContainer}>
          <h1 style={STYLES.pageTitle}>Admin Settings</h1>
          <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>
            Loading admin profile...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={STYLES.pageContainer}>
      <div style={STYLES.contentContainer}>
        <h1 style={STYLES.pageTitle}>Admin Settings</h1>

        {/* Profile Card */}
        <div style={{
          background: 'white',
          borderRadius: 8,
          padding: '40px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: 600,
          margin: '0 auto'
        }}>
          {/* Avatar and Email Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 40,
            paddingBottom: 20,
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div style={{ position: 'relative' }}>
              <img
                src={getAvatarUrl()}
                alt="Admin Avatar"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #475569'
                }}
              />
              <div 
                onClick={handleAvatarClick}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  background: '#475569',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '2px solid white'
                }}>
                <span style={{ color: 'white', fontSize: 14 }}>✎</span>
              </div>
            </div>
            <div style={{ marginLeft: 20 }}>
              <div style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#2c3e50',
                marginBottom: 4
              }}>
                Admin
              </div>
              <div style={{
                fontSize: 14,
                color: '#6b7280'
              }}>
                {adminProfile.email}
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div style={{ marginBottom: 30 }}>
            {/* Name */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#374151'
              }}>
                Name
              </label>
              <div style={{
                padding: '12px',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 6,
                fontSize: 14,
                color: '#6b7280'
              }}>
                {adminProfile.name}
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#374151'
              }}>
                Email account
              </label>
              <div style={{
                padding: '12px',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 6,
                fontSize: 14,
                color: '#6b7280'
              }}>
                {adminProfile.email}
              </div>
            </div>

            {/* Mobile Number */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#374151'
              }}>
                Mobile number
              </label>
              <div style={{
                padding: '12px',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 6,
                fontSize: 14,
                color: '#6b7280'
              }}>
                {adminProfile.mobile_number}
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#374151'
              }}>
                Password
              </label>
              <div style={{
                padding: '12px',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 6,
                fontSize: 14,
                color: '#6b7280'
              }}>
                ••••••••••••
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={handleEditProfile}
            style={{
              padding: '12px 32px',
              background: '#475569',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: 8,
            padding: '32px',
            maxWidth: 500,
            width: '90%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              margin: 0,
              marginBottom: 24,
              fontSize: 24,
              color: '#2c3e50',
              textAlign: 'center'
            }}>
              Edit Profile
            </h2>

            {/* Name */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#374151'
              }}>
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.name ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
              {errors.name && (
                <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#374151'
              }}>
                Email Account
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.email ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
              {errors.email && (
                <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>
                  {errors.email}
                </div>
              )}
            </div>

            {/* Mobile Number */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#374151'
              }}>
                Mobile Number
              </label>
              <input
                type="text"
                value={formData.mobile_number}
                onChange={(e) => handleInputChange('mobile_number', e.target.value)}
                placeholder="09123456789"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.mobile_number ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
              {errors.mobile_number && (
                <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>
                  {errors.mobile_number}
                </div>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 500,
                color: '#374151'
              }}>
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter new password"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.password ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
              {errors.password && (
                <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            {formData.password && (
              <div style={{ marginBottom: 24 }}>
                <label style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#374151'
                }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm new password"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${errors.confirmPassword ? '#ef4444' : '#d1d5db'}`,
                    borderRadius: 6,
                    fontSize: 14
                  }}
                />
                {errors.confirmPassword && (
                  <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setIsEditing(false);
                  setFormData({
                    name: adminProfile.name,
                    email: adminProfile.email,
                    mobile_number: adminProfile.mobile_number,
                    password: '',
                    confirmPassword: ''
                  });
                  setErrors({});
                }}
                style={{
                  padding: '12px 32px',
                  background: '#e5e7eb',
                  color: '#374151',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                style={{
                  padding: '12px 32px',
                  background: '#475569',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: 8,
            padding: '32px',
            maxWidth: 600,
            width: '90%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              margin: 0,
              marginBottom: 24,
              fontSize: 24,
              color: '#2c3e50',
              textAlign: 'center'
            }}>
              Change Avatar
            </h2>

            {/* Preview */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 24
            }}>
              <img
                src={previewAvatar || getAvatarUrl()}
                alt="Avatar Preview"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #475569'
                }}
              />
            </div>

            {/* Predefined Avatars */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#374151',
                marginBottom: 12
              }}>
                Choose from Default Avatars
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: 12
              }}>
                {Object.values(DEFAULT_AVATARS).map((avatarUrl, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectPredefinedAvatar(avatarUrl)}
                    style={{
                      cursor: 'pointer',
                      border: previewAvatar === avatarUrl ? '3px solid #475569' : '2px solid #e5e7eb',
                      borderRadius: '50%',
                      padding: 4,
                      transition: 'all 0.2s'
                    }}
                  >
                    <img
                      src={avatarUrl}
                      alt={`Avatar ${index + 1}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#374151',
                marginBottom: 12
              }}>
                Or Upload Custom Image
              </h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
              <div style={{
                fontSize: 12,
                color: '#6b7280',
                marginTop: 8
              }}>
                Max file size: 2MB. Supported formats: JPG, PNG, GIF
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  setShowAvatarModal(false);
                  setPreviewAvatar(null);
                }}
                style={{
                  padding: '12px 32px',
                  background: '#e5e7eb',
                  color: '#374151',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAvatar}
                style={{
                  padding: '12px 32px',
                  background: '#475569',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Save Avatar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN APP COMPONENT
// ============================================

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />
      
      <div style={{ flex: 1 }}>
        {currentPage === 'dashboard' && <Dashboard key="dashboard" onNavigate={handleNavigate} isCollapsed={isSidebarCollapsed} />}
        {currentPage === 'tenants' && <TenantManagement key="tenants" onNavigate={handleNavigate} isCollapsed={isSidebarCollapsed} />}
        {currentPage === 'reservation' && <ReservationManagement key="reservation" onNavigate={handleNavigate} isCollapsed={isSidebarCollapsed} />}
        {currentPage === 'billing' && <BillingAndFinance key="billing" onNavigate={handleNavigate} isCollapsed={isSidebarCollapsed} />}
        {currentPage === 'communication' && <CommunicationCenter key="communication" onNavigate={handleNavigate} isCollapsed={isSidebarCollapsed} />}
        {currentPage === 'maintenance' && <MaintenanceManagement key="maintenance" onNavigate={handleNavigate} isCollapsed={isSidebarCollapsed} />}
        {currentPage === 'admin' && <AdminSettings key="admin" onNavigate={handleNavigate} isCollapsed={isSidebarCollapsed} />}
      </div>
    </div>
  );
}

// ============================================
// RENDER APP
// ============================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
