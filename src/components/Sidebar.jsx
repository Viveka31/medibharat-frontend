import React, { useState } from "react";

const NAV_ITEMS = [
  {
    label: "Configuration",
    icon: "⚙",
    children: ["General Settings", "Roles & Permissions", "Notification Settings"],
  },
  {
    label: "Online Data",
    icon: "▭",
    children: ["Data Upload", "Data Sync"],
  },
  {
    label: "RFQ",
    icon: "📄",
    children: ["Create RFQ", "RFQ History"],
  },
  { label: "Online Enrollment", icon: "🔒" },
  { label: "Cash Deposit Balance", icon: "🏦" },
  {
    label: "VAS",
    icon: "💳",
    children: ["Value Added Services", "VAS Reports"],
  },
  {
    label: "Reports And Analysis",
    icon: "▭",
    children: ["Policy Reports", "Claim Reports", "Custom Reports"],
  },
  {
    label: "Utility",
    icon: "🖥",
    children: ["Bulk Upload", "Templates"],
  },
  { label: "Claim Intimation", icon: "🔒" },
  { label: "Claim Submission", icon: "🔒" },
  { label: "Online Payment Status", icon: "🔒" },
  { label: "Natural Submission", icon: "🔒" },
];

export default function Sidebar() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (label) => {
    setOpenItem((prev) => (prev === label ? null : label));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-dashboard-btn">
        <span>▦</span>
        <span>Dashboard</span>
      </div>
      <ul className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const hasChildren = Boolean(item.children?.length);
          const isOpen = openItem === item.label;

          return (
            <li key={item.label} className="sidebar-nav-item">
              <div
                className="sidebar-nav-row"
                onClick={hasChildren ? () => toggleItem(item.label) : undefined}
                role={hasChildren ? "button" : undefined}
                tabIndex={hasChildren ? 0 : undefined}
              >
                <span className="item-left">
                  <span className="sidebar-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                {hasChildren && (
                  <span className={`sidebar-caret ${isOpen ? "open" : ""}`}>▾</span>
                )}
              </div>

              {hasChildren && (
                <ul className={`sidebar-submenu ${isOpen ? "open" : ""}`}>
                  {item.children.map((child) => (
                    <li key={child} className="sidebar-subitem">
                      {child}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
