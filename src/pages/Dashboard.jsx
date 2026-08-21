import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import DashCard from "../components/DashCard.jsx";
import DataTable from "../components/DataTable.jsx";
import api from "../api/axios.js";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function fetchDashboard() {
      try {
        const res = await api.get("/dashboard");
        if (!ignore) setData(res.data);
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Failed to load dashboard data.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchDashboard();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="app-shell">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
        />

        <main className="dashboard-content">
          {loading && <div className="loading-text">Loading dashboard...</div>}
          {error && !loading && <div className="error-text">{error}</div>}

          {data && !loading && !error && (
            <>
              <div className="cards-grid">
                <DashCard iconClass="icon-policy" icon="📄" label="Policy" value={data.cards.policy} />
                <DashCard iconClass="icon-corporates" icon="🏢" label="Corporates" value={data.cards.corporates} />
                <DashCard iconClass="icon-employees" icon="👥" label="Employees" value={data.cards.employees} />
                <DashCard iconClass="icon-lives" icon="👨‍👩‍👧" label="Lives" value={data.cards.lives} />
                <DashCard iconClass="icon-insurer" icon="☂" label="Insurer" value={data.cards.insurer} />
                <DashCard iconClass="icon-payer" icon="₹" label="Payer" value={data.cards.payer} />
              </div>

              <DataTable rows={data.tableRows} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
