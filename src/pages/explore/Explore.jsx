import React, { useState } from "react";

import ColumnPanel from "../../componensts/explore/columnPanel/ColumnPanel.jsx"
import DatasetBar from "../../componensts/explore/datasetbar/DatasetBar"
import ActionPanel from "../../componensts/explore/actionPanel/ActionPanel"
import Preview from "../../componensts/explore/PreviewPanel/Preview"

import dummyData from "./DummyData.js";
import SelectionBox from "../../componensts/explore/analysis/SelectionBox.jsx";
import Chart from "../../componensts/explore/analysis/Chart.jsx";
import Statics from "../../componensts/explore/analysis/Statics.jsx";

import OperationPanel from "../../componensts/explore/operationPanel/OperationPanel.jsx"

import './Explore.css'

function Explore() {
  const dataset = {
    name: "file.csv",
    rows: 12,
    columns: 10,
    size: "45.4 Mb"
  };

  const [columns, setColumns] = useState([
    { name: "age", type: "numerical" },
    { name: "salary", type: "numerical" },
    { name: "gender", type: "categorical" },
    { name: "city", type: "categorical" }
  ]);

  const [analysisConfig, setAnalysisConfig] = useState(null);

  const handleAnalyze = (data) => {
    console.log("RECEIVED:", data);
    setAnalysisConfig(data);
  };


  const handleAction = (action) => {
    console.log(`performing ${action}`);
  };

  return (
    <div>
      <DatasetBar dataset={dataset} onAction={handleAction} />
      <ActionPanel />
      <div className="explore-layout">

        <div className="left-panel">
          <ColumnPanel columns={columns} setColumns={setColumns} />
        </div>

        <div className="center-panel">
          <Preview Data={dummyData} />

          <div className="analysis-box">
            <SelectionBox columns={columns} onAnalyze={handleAnalyze} />
            <div style={{ display: 'flex', justifyContent:'space-around',gap:'5px' }}>

              <Chart 
              config={analysisConfig}
               data={dummyData.data} 
               style={{margin:'5px'}}
               />
              <Statics
                column={analysisConfig?.column}
                type={analysisConfig?.type}
                data={dummyData.data}
                style={{margin:'5px'}}
              />
            </div>

          </div>
        </div>

        <div className="right-panel">
          <OperationPanel columns={columns} onAnalyze={handleAnalyze} />
        </div>

      </div>
    </div>
  );
}

export default Explore;