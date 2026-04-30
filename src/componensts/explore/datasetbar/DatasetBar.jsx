import React from "react";
import "./DatasetBar.css";

function DatasetBar({ dataset, onAction }) {
  return (
    <div className="dataset-bar">

      {/* LEFT INFO */}
      <div className="dataset-left">
        <span className="label">Dataset:</span>
        <span className="value">{dataset.name}</span>
      </div>

      {/* MIDDLE INFO */}
      <div className="dataset-right">
        <div className="info-box">{dataset.rows} rows</div>
        <div className="info-box">{dataset.columns} columns</div>
        <div className="info-box">{dataset.size}</div>
      </div>

      
      <div className="dataset-actions">

        <button onClick={() => onAction("refresh")}>
          ⟳ Refresh
        </button>

        <button onClick={() => onAction("duplicate")}>
          ⧉ Duplicate
        </button>

        <button className="primary" onClick={() => onAction("new")}>
          + New Operation
        </button>

      </div>

    </div>
  );
}

export default DatasetBar;