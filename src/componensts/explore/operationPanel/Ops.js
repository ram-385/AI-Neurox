export const numericalOps = [
  { value: "mean", label: "Mean" },
  { value: "median", label: "Median" },
  { value: "mode", label: "Mode" },
  { value: "min", label: "Min" },
  { value: "max", label: "Max" },
  { value: "std", label: "Standard Deviation" },

  // visualization (already in your system)
  { value: "histogram", label: "Histogram" },
  { value: "kde", label: "KDE Plot" },
  { value: "boxplot", label: "Box Plot" },
  { value: "line", label: "Line Plot" },
];

export const categoricalOps = [
  { value: "count", label: "Value Counts" },
  { value: "unique", label: "Unique Count" },
  { value: "mode", label: "Mode" },

  // visualization
  { value: "bar", label: "Bar Chart" },
  { value: "pie", label: "Pie Chart" },
  { value: "donut", label: "Donut Chart" },
];

export const cleaningOps = [
  { value: "fill_mean", label: "Fill Missing (Mean)" },
  { value: "fill_median", label: "Fill Missing (Median)" },
  { value: "fill_mode", label: "Fill Missing (Mode)" },
  { value: "fill_unknown", label: "Fill Missing (Unknown)" },
  { value: "drop_missing", label: "Drop Missing Rows" },

  { value: "remove_duplicates", label: "Remove Duplicates" },
  { value: "show_duplicates", label: "Show Duplicates" },
];

export const viewOps = [
  { value: "head", label: "First Rows" },
  { value: "tail", label: "Last Rows" },
  { value: "sample", label: "Random Sample" },
  { value: "sort_asc", label: "Sort Ascending" },
  { value: "sort_desc", label: "Sort Descending" },
];