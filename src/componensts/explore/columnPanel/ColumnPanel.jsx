import React, { useState } from "react";
import ColumnItem from "./ColumnItem";
import "./columnPanel.css";

function ColumnPanel({columns=[],setColumns}) {
  

  const [selectedColumn, setSelectedColumn] = useState(null);
  const [search, setSearch] = useState("");

  
  const handleAction = (columnName, action) => {
    console.log(columnName, action);

    if (action === "delete") {
      setColumns(prev => prev.filter(col => col.name !== columnName));
    }

    if (action === "rename") {
      const newName = prompt("Enter new name:");
      if (!newName) return;

      setColumns(prev =>
        prev.map(col =>
          col.name === columnName ? { ...col, name: newName } : col
        )
      );
    }

    if (action === "details") {
      alert(`Column: ${columnName}`);
    }
  };

  const filteredColumns = columns.filter(col =>
    col.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="column-panel">

      {/* Header */}
      <div className="panel-header">
        <h3>Columns</h3>
        <span>{columns.length}</span>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search column..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Column List */}
      <div className="column-list">
        {filteredColumns.map((col, index) => (
          <ColumnItem
            key={index}
            column={col}
            selected={selectedColumn === col.name}
            onSelect={setSelectedColumn}
            onAction={handleAction}   
          />
        ))}
      </div>

    </div>
  );
}

export default ColumnPanel;