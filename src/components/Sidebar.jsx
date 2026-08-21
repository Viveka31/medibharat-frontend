import React from "react";

const NAV_ITEMS = [
  { label: "Configuration", icon: "⚙", hasCaret: true },
  { label: "Online Data", icon: "▭", hasCaret: true },
  { label: "RFQ", icon: "📄", hasCaret: true },
  { label: "Online Enrollment", icon: "🔒", hasCaret: false },
  { label: "Cash Deposit Balance", icon: "🏦", hasCaret: false },
  { label: "VAS", icon: "💳", hasCaret: true },
  { label: "Reports And Analysis", icon: "▭", hasCaret: true },
  { label: "Utility", icon: "🖥", hasCaret: true },
  { label: "Claim Intimation", icon: "🔒", hasCaret: false },
  { label: "Claim Submission", icon: "🔒", hasCaret: false },
  { label: "Online Payment Status", icon: "🔒", hasCaret: false },
  { label: "Natural Submission", icon: "🔒", hasCaret: false },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-dashboard-btn">
        <span>▦</span>
        <span>Dashboard</span>
      </div>
      <ul className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <span className="item-left">
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </span>
            {item.hasCaret && <span>▾</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
}
