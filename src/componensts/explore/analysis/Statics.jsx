import React from "react";
import "./Statics.css";

function Statics({ column, type, data }) {
  if (!column || !data) {
    return <div className="stats-box empty">Select a column</div>;
  }

  const values = data
    .map((row) => row[column])
    .filter((v) => v !== undefined && v !== null);

  if (values.length === 0) {
    return <div className="stats-box empty">No data</div>;
  }

  //  Numerical Column
  const getNumericalStats = () => {
    const nums = values.map(Number).filter((v) => !isNaN(v));

    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;

    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    const median =
      sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;

    const min = Math.min(...nums);
    const max = Math.max(...nums);

    return { mean, median, min, max, count: nums.length };
  };

  //Categorical Column
  const getCategoricalStats = () => {
    const freq = {};
    values.forEach((v) => {
      freq[v] = (freq[v] || 0) + 1;
    });

    const entries = Object.entries(freq);

    const mostCommon = entries.sort((a, b) => b[1] - a[1])[0];

    return {
      unique: entries.length,
      top: mostCommon?.[0],
      topCount: mostCommon?.[1],
      count: values.length,
    };
  };

  const stats =
    type === "numerical"
      ? getNumericalStats()
      : getCategoricalStats();

  return (
    <div className="stats-box">
      <h3>{column} Stats</h3>

      {type === "numerical" ? (
        <div className="stats-grid">
          <div className="stat-card">Mean: {stats.mean.toFixed(2)}</div>
          <div className="stat-card">Median: {stats.median}</div>
          <div className="stat-card">Min: {stats.min}</div>
          <div className="stat-card">Max: {stats.max}</div>
          <div className="stat-card">Count: {stats.count}</div>
        </div>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">Unique: {stats.unique}</div>
          <div className="stat-card">Top: {stats.top}</div>
          <div className="stat-card">Top Count: {stats.topCount}</div>
          <div className="stat-card">Total: {stats.count}</div>
        </div>
      )}
    </div>
  );
}

export default Statics;