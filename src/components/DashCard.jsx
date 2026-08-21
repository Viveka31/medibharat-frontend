import React from "react";

export default function DashCard({ iconClass, icon, label, value }) {
  return (
    <div className="dash-card">
      <div className="dash-card-top">
        <div className={`dash-card-icon ${iconClass}`}>{icon}</div>
        <div className="dash-card-label">
          <div className="label">{label}</div>
          <div className="value">{value}</div>
        </div>
      </div>
      <div className="dash-card-footer">Just updated</div>
    </div>
  );
}
