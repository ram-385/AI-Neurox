import React, { useState } from "react";
import "./columnItem.css";

function ColumnItem({ column, selected, onSelect, onAction }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={`column-item ${selected ? "active" : ""}`}
      onClick={() => onSelect(column.name)}
    >
      {/* LEFT */}
      <div className="column-left">
        <div className="rectangle"></div>

        <div>
          <span className="column-name">{column.name}</span>
          <p className="column-type">{column.type}</p>
        </div>
      </div>

     
      <div
        className="dots"
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
      >
        ⋮

        {showMenu && (
          <div className="dropdown">
            <div
              className="menu-item"
              onClick={() => onAction(column.name, "rename")}
            >
              Rename
            </div>

            <div
              className="menu-item delete"
              onClick={() => onAction(column.name, "delete")}
            >
              Delete
            </div>

            <div
              className="menu-item"
              onClick={() => onAction(column.name, "details")}
            >
              Details
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ColumnItem;