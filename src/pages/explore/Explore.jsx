import React, { useState, useEffect } from "react";

import ColumnPanel from "../../componensts/explore/columnPanel/ColumnPanel.jsx";
import ActionPanel from "../../componensts/explore/actionPanel/ActionPanel";
import Preview from "../../componensts/explore/PreviewPanel/Preview";
import SelectionBox from "../../componensts/explore/analysis/SelectionBox.jsx";
import Chart from "../../componensts/explore/analysis/Chart.jsx";
import OperationPanel from "../../componensts/explore/operationPanel/OperationPanel.jsx";
import "./Explore.css";

function Explore() {

  // DATASET INFO (STATIC HEADER)

  const dataset = {
    name: "file.csv",
    rows: 0,
    columns: 0,
    size: "unknown"
  };


  // Global State

  const [datasetId, setDatasetId] = useState(null);
  const [data, setData] = useState([]);           // table preview
  const [columns, setColumns] = useState([]);     // column list
  const [stats, setStats] = useState(null);       // stat result
  const [analysisConfig, setAnalysisConfig] = useState(null);


  // Load from local storage  (after upload)

  useEffect(() => {
    const id = localStorage.getItem("dataset_id");
    const preview = localStorage.getItem("Data");
    const cols = localStorage.getItem("columns");
    
    if (id) setDatasetId(id);
    if (preview) {
      const parsed = JSON.parse(preview);
      
      setData({
        type: "table",
        data: parsed
      });
    }
     if (cols && columns.length === 0) {
    setColumns(JSON.parse(cols));
  }
  }, []);


  // Analysis Handler (stats)

  const handleAnalyze = async (config) => {
    setAnalysisConfig(config);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/column-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dataset_id: datasetId,
          column: config.column,
          operation: config.type
        })
      });

      const result = await res.json();
      setStats(result.result);

    } catch (err) {
      console.error("Analysis error:", err);
    }
  };


  // TABLE OPERATIONS HANDLER

  const handleAction = async (action, column) => {
  try {
    let url = "";
    let body = { dataset_id: datasetId };

    if (action === "delete_column") {
      url = "/delete_column";
      body.column_name = column;
    }

    if (action === "rename_column") {
      url = "/rename-column";
      body.old_name = column.old;
      body.new_name = column.new;
    }

    if (!url) return;

    const res = await fetch(`http://127.0.0.1:8000/api${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const result = await res.json();

   
    if (result.data) {
      setData({
        type: "table",
        data: result.data   
      });

      // sync localStorage also
      localStorage.setItem("Data", JSON.stringify(result.data));
    }

    if (result.columns) {
  setColumns(prev => {
    console.log("NEW COLUMNS:", result.columns);
    return result.columns;
  });

  localStorage.setItem("columns", JSON.stringify(result.columns));
}

  } catch (err) {
    console.error("Action error:", err);
  }
};


  return (
    <div>
      
      <ActionPanel />

      <div className="explore-layout">

        {/* LEFT PANEL */}
        <div className="left-panel">
          <ColumnPanel columns={columns} onAction={handleAction} />
        </div>

        {/* CENTER PANEL */}
        <div className="center-panel">

          {/* TABLE PREVIEW */}
          <Preview Data={data} />

          {/* ANALYSIS SECTION */}
          <div className="analysis-box">

            <SelectionBox
              columns={columns}
              Data={data.data}
              onAnalyze={handleAnalyze}
            />
            <Chart
              config={analysisConfig}
              data={data.data}
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <OperationPanel
            columns={columns}
            onAnalyze={handleAction}
          />
        </div>

      </div>
    </div>
  );
}

export default Explore;


