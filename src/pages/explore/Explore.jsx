import React, { useState } from "react";

import ColumnPanel from "../../componensts/explore/columnPanel/ColumnPanel.jsx"
import DatasetBar from "../../componensts/explore/datasetbar/DatasetBar"
import ActionPanel from "../../componensts/explore/actionPanel/ActionPanel"
import Preview from "../../componensts/explore/PreviewPanel/Preview"
import DummyData from './DummyData.js'
import dummyData from "./DummyData.js";

function Explore() {
  const dataset = {
    name: "file.csv",
    rows: 12,
    columns: 10,
    size: "45.4 Mb"
  };

  


  const handleAction = (action) => {
    console.log(`performing ${action}`);
  };

  return (
    <div>
      <DatasetBar dataset={dataset} onAction={handleAction} />
      <ActionPanel />
       <div style={{display:'flex'}}>
            <ColumnPanel/>
              <Preview Data = {dummyData}/>
       </div>
    </div>
  );
}

export default Explore;