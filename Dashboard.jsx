import React, { useEffect, useState } from "react";

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api/tenants';

export default function Dashboard({ onNavigate }) {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tenants for preview (limit to 4)
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

  // Logout handler
  const handleLogout = () => {
    if (window.confirm("⚠️ Are you sure you want to logout?")) {
      alert("✅ You have been logged out successfully!");
      // You can add actual logout logic here (clear tokens, redirect, etc.)
      window.location.reload();
    }
  };

  // Get current date info
  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f5dc" }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <h2 style={{ color: "white", padding: "20px", fontSize: "18px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          THE SAMMIE'S<br />APARTMENT
        </h2>
        
        <nav style={{ padding: "20px 0" }}>
          <div style={{ ...menuItemStyle, background: "rgba(255,255,255,0.1)" }}>
            <span style={{ marginRight: 10 }}>📊</span> Dashboard
          </div>
          <div style={menuItemStyle} onClick={() => onNavigate('tenants')}>
            <span style={{ marginRight: 10 }}>👥</span> Tenant Management
          </div>
          <div style={menuItemStyle}>
            <span style={{ marginRight: 10 }}>📅</span> Reservation
          </div>
          <div style={menuItemStyle}>
            <span style={{ marginRight: 10 }}>💰</span> Billing
          </div>
          <div style={menuItemStyle}>
            <span style={{ marginRight: 10 }}>💬</span> Communication
          </div>
          <div style={menuItemStyle}>
            <span style={{ marginRight: 10 }}>🔧</span> Maintenance
          </div>
          <div style={menuItemStyle}>
            <span style={{ marginRight: 10 }}>⚙️</span> Admin Settings
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 40 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
          <h1 style={{ fontSize: 32, color: "#2c3e50" }}>Dashboard</h1>
          <button onClick={handleLogout} style={logoutBtnStyle}>
            🚪 Logout
          </button>
        </div>

        {/* Top Section: Chart and Calendar */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 30 }}>
          {/* Sales Funnel Chart */}
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

          {/* Calendar */}
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

        {/* Tenant List */}
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

// Styles
const sidebarStyle = {
  width: 250,
  background: "linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)",
  color: "white",
  minHeight: "100vh"
};

const menuItemStyle = {
  padding: "15px 20px",
  cursor: "pointer",
  transition: "all 0.3s",
  display: "flex",
  alignItems: "center",
  fontSize: 14
};

const cardStyle = {
  background: "white",
  borderRadius: 12,
  padding: 24,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const logoutBtnStyle = {
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
