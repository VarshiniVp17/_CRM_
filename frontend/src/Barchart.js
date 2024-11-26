import React, { useEffect, useState } from "react";
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import axios from "axios";
import "./Barchart.css"; // External CSS file
import { baseurl } from "./API";

const Barchart = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedSBU, setSelectedSBU] = useState(""); // State to hold selected SBU

  const handleSBUChange = (event) => {
    const newSBU = event.target.value;
    setSelectedSBU(newSBU);
    fetchChartData(newSBU); // Fetch data based on the selected SBU
  };

  const fetchChartData = (sbu) => {
    axios
      .get(`${baseurl}/deals-probability?sbu=${sbu}`)
      .then((response) => {
        const groupedData = response.data.reduce((acc, item) => {
          const probability = Number(item.probability.replace("%", ""));
          const amount = Number(item.amount.replace(/[^0-9.-]+/g, "")); // Remove '$' and convert to number

          // Group data by probability and accumulate deal values and occurrences
          if (!acc[probability]) {
            acc[probability] = {
              probability,
              totalDealValue: 0,
              occurrence: 0,
            };
          }
          acc[probability].totalDealValue += amount;
          acc[probability].occurrence += 1;

          return acc;
        }, {});

        // Convert the grouped object to an array
        const formattedData = Object.values(groupedData);
        setChartData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchChartData(selectedSBU); // Fetch data on initial load
  }, [selectedSBU]); // Add selectedSBU as a dependency

  return (
    <div className="chart-container">
      <h2>
        <b>
          <center>Deal Analysis</center>
        </b>
      </h2>
      <div className="select-container">
        <select value={selectedSBU} onChange={handleSBUChange}>
          <option value="">Select SBU</option>
          <option value="SBU1">SBU1</option>
          <option value="SBU2">SBU2</option>
          <option value="SBU3">SBU3</option>
          <option value="SBU4">SBU4</option>
          <option value="SBU5">SBU5</option>
        </select>
      </div>
      <ResponsiveContainer width="70%" height={500}>
        <ComposedChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* Adjusted X-Axis label */}
          <XAxis
            dataKey="probability"
            label={{
              value: "Probability (%)",
              position: "insideBottom",
              offset: -10, // Adjust label position
              fontWeight: "bold",
            }}
          />

          {/* Adjust Y-Axis labels to be equally spaced */}
          <YAxis
            yAxisId="left"
            orientation="left"
            domain={[0, "dataMax + 1000"]}
            label={{
              value: "Total Deal Value",
              angle: -90,
              dx: -30, // Horizontal alignment
              dy: 0, // Adjust vertical position to match the right Y-axis label
              fontWeight: "bold",
            }}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, "dataMax + 1"]}
            label={{
              value: "Occurrences",
              angle: -90,
              dx: 5, // Horizontal alignment (same as left Y-axis label)
              dy: 0, // Ensure vertical alignment matches the left Y-axis label
              fontWeight: "bold",
            }}
          />

          <Tooltip />
          <Legend
            wrapperStyle={{
              position: "relative",
              marginTop: "-3px",
              fontWeight: "bold",
            }}
          />
          <Bar
            yAxisId="left"
            dataKey="totalDealValue"
            barSize={95}
            fill="#5555ff"
            name="Total Deal Value"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="occurrence"
            stroke="#ff7300"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            name="Occurrences"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
