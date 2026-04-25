import React, { useState } from "react";
import "./upload.css";

import { NavLink } from "react-router-dom";

import JSZip from "jszip";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { XMLParser } from "fast-xml-parser";
import Preview from "./Preview";

// images
import Csv from "../../assets/upload-assets/csv.png";
import Json from "../../assets/upload-assets/json.png";
import Xml from "../../assets/upload-assets/xml.png";
import Text from "../../assets/upload-assets/text.png";
import Img from "../../assets/upload-assets/img.png";
import Excel from "../../assets/upload-assets/excel.jpg";

function Upload() {
  const [selected, setSelected] = useState("");
  const [fileInfo, setFileInfo] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  const fileTypes = {
    csv: { ext: ".csv", icon: Csv },
    excel: { ext: ".xls,.xlsx", icon: Excel },
    json: { ext: ".json", icon: Json },
    xml: { ext: ".xml", icon: Xml },
    text: { ext: ".txt", icon: Text },
    img: { ext: ".zip", icon: Img },
  };

  const flattenObject = (obj, prefix = "") => {
    let result = {};
    for (let key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(result, flattenObject(value, newKey));
      } else {
        result[newKey] = value;
      }
    }
    return result;
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!selected) {
      alert("Please select dataset type first");
      return;
    }

    try {
      // IMAGE ZIP
      if (selected === "img") {
        if (!file.name.toLowerCase().endsWith(".zip")) {
          alert("Only ZIP file allowed for image dataset");
          return;
        }

        const zip = await JSZip.loadAsync(file);
        const imageFiles = [];

        Object.values(zip.files).forEach((entry) => {
          if (
            !entry.dir &&
            /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(entry.name)
          ) {
            imageFiles.push(entry);
          }
        });

        if (imageFiles.length === 0) {
          alert("No image files found in ZIP");
          return;
        }

        const imageUrls = [];

        await Promise.all(
          imageFiles.map(async (entry) => {
            const blob = await entry.async("blob");
            const url = URL.createObjectURL(blob);
            imageUrls.push(url);
          })
        );

        setFileInfo({
          name: file.name,
          type: "Image ZIP",
          size: (file.size / 1024).toFixed(2) + " KB",
          fileCount: imageFiles.length,
        });

        setPreviewData({
          type: "images",
          data: imageUrls,
        });

        return;
      }

      
      const allowed = selected ? fileTypes[selected].ext : "";
      const regex = new RegExp(allowed.replace(/,/g, "|"), "i");

      if (!regex.test(file.name)) {
        alert("Wrong file type selected");
        return;
      }

      setFileInfo({
        name: file.name,
        type: selected,
        size: (file.size / 1024).toFixed(2) + " KB",
        fileCount: 1,
      });

      // CSV
      if (selected === "csv") {
        Papa.parse(file, {
          header: true,
          complete: (result) => {
            const cleanData = result.data.filter(
              (row) => Object.keys(row).length > 0
            );

            setPreviewData({
              type: "table",
              data: cleanData.slice(0, 20),
            });
          },
        });
      }

      // EXCEL
      if (selected === "excel") {
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet);

          setPreviewData({
            type: "table",
            data: json.slice(0, 20),
          });
        };

        reader.readAsArrayBuffer(file);
      }

      // JSON
      if (selected === "json") {
        const reader = new FileReader();

        reader.onload = (e) => {
          let json = JSON.parse(e.target.result);
          let data = [];

          if (Array.isArray(json)) {
            data = json.map((item) => flattenObject(item));
          } else {
            data = [flattenObject(json)];
          }

          setPreviewData({
            type: "table",
            data: data.slice(0, 20),
          });
        };

        reader.readAsText(file);
      }

      // XML
      if (selected === "xml") {
        const reader = new FileReader();

        reader.onload = (e) => {
          const parser = new XMLParser();
          const jsonObj = parser.parse(e.target.result);

          const firstKey = Object.keys(jsonObj)[0];
          let data = jsonObj[firstKey];

          if (!Array.isArray(data)) data = [data];

          data = data.map((item) => flattenObject(item));

          setPreviewData({
            type: "table",
            data: data.slice(0, 20),
          });
        };

        reader.readAsText(file);
      }

      // TEXT
      if (selected === "text") {
        const reader = new FileReader();

        reader.onload = (e) => {
          setPreviewData({
            type: "text",
            data: e.target.result,
          });
        };

        reader.readAsText(file);
      }
    } catch (error) {
      console.error(error);
      alert("Error processing file");
    }
  };

  return (
    <div className="upload-page">
      <h2>Upload Dataset</h2>

      {/* DATASET CARDS */}
      <div className="dataset-section">
        <h3>1. Select Dataset Type</h3>
        <p>Choose the format of your dataset file</p>

        <div className="dataset-grid">
          {Object.keys(fileTypes).map((key) => (
            <label
              key={key}
              className={`dataset-card ${
                selected === key ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="dataset"
                value={key}
                checked={selected === key}
                onChange={(e) => setSelected(e.target.value)}
              />

              <div className="icon">
                <img src={fileTypes[key].icon} alt={key} />
              </div>

              <h4>{key.toUpperCase()}</h4>
              <p>File format</p>
            </label>
          ))}
        </div>
      </div>

      {/* UPLOAD BOX */}
      <div className="upload-section">
        <h3>2. Upload Dataset File</h3>
        <p>Choose your file and we'll process it securely</p>

        <label className="upload-box">
          <input
            type="file"
            accept={selected ? fileTypes[selected].ext : "*"}
            onChange={handleFile}
          />

          <div className="upload-content">
            <div className="upload-icon">⬆️</div>
            <p>Drag and drop your file here</p>
            <span>or click to browse</span>
          </div>
        </label>
      </div>

      {/* FILE INFO */}
      {fileInfo && (
        <div className="file-info-box">
          <h3>Dataset Details</h3>
          <p>Name: {fileInfo.name}</p>
          <p>Type: {fileInfo.type}</p>
          <p>Size: {fileInfo.size}</p>
          <p>Files: {fileInfo.fileCount}</p>
        </div>
      )}

      {/* PREVIEW */}
      <Preview Data={previewData} />

      {/* BUTTON */}
      <div className="start-container">
        {previewData ? (
          <NavLink to="/EDA" className="start-btn">
            Start Exploration
          </NavLink>
        ) : (
          <span className="start-btn disabled">
            Start Exploration
          </span>
        )}
      </div>
    </div>
  );
}

export default Upload;