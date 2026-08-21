import React, { useMemo, useState } from "react";

export default function DataTable({ rows }) {
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((row) => row.date.toLowerCase().includes(q));
  }, [rows, search]);

  const visibleRows = filteredRows.slice(0, pageSize);

  const handleExport = () => {
    const header = [
      "SL.NO",
      "DATE",
      "POLICIES",
      "CORPORATES",
      "ACTIVE MEMBERS",
      "INACTIVE MEMBERS",
      "TOTAL MEMBERS",
      "TOTAL LIVES",
    ];
    const lines = [header.join(",")];
    filteredRows.forEach((row, i) => {
      lines.push(
        [
          i + 1,
          row.date,
          row.policies,
          row.corporates,
          row.activeMembers,
          row.inactiveMembers,
          row.totalMembers,
          row.totalLives,
        ].join(",")
      );
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dashboard-data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="table-panel">
      <div className="table-panel-top">
        <button className="btn-excel" onClick={handleExport}>
          Excel
        </button>
      </div>

      <div className="table-controls">
        <div className="entries-select-wrap">
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>entries per page</span>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>SL. NO</th>
            <th>DATE</th>
            <th>POLICIES</th>
            <th>CORPORATES</th>
            <th>ACTIVE MEMBERS</th>
            <th>INACTIVE MEMBERS</th>
            <th>TOTAL MEMBERS</th>
            <th>TOTAL LIVES</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row, i) => (
            <tr key={row.date + i}>
              <td>{i + 1}</td>
              <td>{row.date}</td>
              <td>{row.policies}</td>
              <td>{row.corporates}</td>
              <td>{row.activeMembers}</td>
              <td>{row.inactiveMembers}</td>
              <td>{row.totalMembers}</td>
              <td>{row.totalLives}</td>
            </tr>
          ))}
          {visibleRows.length === 0 && (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", padding: "24px" }}>
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
