import React, { useState } from "react";
import "./OperationPanel.css";

import {
  numericalOps,
  categoricalOps,
  cleaningOps,
  viewOps,
} from "./ops";

function SelectionBox({ columns = [], onAnalyze }) {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [columnType, setColumnType] = useState("");
  const [operation, setOperation] = useState("");
  const [category, setCategory] = useState("analysis");

  const handleColumnChange = (e) => {
    const colName = e.target.value;
    setSelectedColumn(colName);

    const colObj = columns.find((c) => c.name === colName);
    setColumnType(colObj?.type || "");

    setOperation("");
  };

  const getOps = () => {
    switch (category) {
      case "cleaning":
        return cleaningOps;
      case "view":
        return viewOps;
      case "analysis":
      default:
        return columnType === "numerical"
          ? numericalOps
          : categoricalOps;
    }
  };

  const ops = getOps();

  return (
    <div className="operation-panel">
      <h2 className="operation-panel-title">Operation Panel</h2>

      {/* CATEGORY */}
      <select
        className="operation-panel-select"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setOperation("");
        }}
      >
        <option value="analysis">Analysis</option>
        <option value="cleaning">Cleaning</option>
        <option value="view">View</option>
      </select>

      {/* COLUMN */}
      <select
        className="operation-panel-select"
        value={selectedColumn}
        onChange={handleColumnChange}
      >
        <option value="">Select Column</option>
        {columns.map((col, i) => (
          <option key={i} value={col.name}>
            {col.name}
          </option>
        ))}
      </select>

      {/* OPERATION */}
      <select
        className="operation-panel-select"
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        disabled={!selectedColumn && category !== "view"}
      >
        <option value="">Select Operation</option>

        {ops.map((op, i) => (
          <option key={i} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      {/* BUTTON */}
      <button
        className="operation-panel-button"
        onClick={() => {
          if (!operation) return;

          onAnalyze?.({
            column: selectedColumn,
            operation,
            type: columnType,
            category,
          });
        }}
      >
        Apply
      </button>
    </div>
  );
}

export default SelectionBox;