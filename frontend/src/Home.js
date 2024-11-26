

 
// export default Home;

import React from "react";

import Chart from "react-google-charts";
 
// Data for Sankey chart (from, to, value)
const data = [
  ["From", "To", "Count", { role: "style" }],
  ["Lead/suspect", "Opportunity Identified", 117, null],
  ["Opportunity Identified", "Proposal submitted", 108, null],
  ["Proposal submitted", "Proposal Shortlisted", 100, null],
  ["Proposal Shortlisted", "Proposal Selected", 83, null],
  ["Proposal Selected", "LOI/SOW", 83, null],
  ["LOI/SOW", "MSA/PO Closed Won", 77, null],
  ["Lead/suspect", "Closed Lost", 9, "color: maroon"],
  ["Opportunity Identified", "Closed Lost", 8, "color: maroon"],
  ["Proposal submitted", "Closed Lost", 17, "color: maroon"],
  ["Proposal Shortlisted", "Closed Lost", 0, "color: maroon"],
  ["Proposal Selected", "Closed Lost", 6, "color: maroon"],
  ["LOI/SOW", "Closed Lost", 12, "color: maroon"]
];
 
// Sankey chart options
const options = {
  sankey: {
    iterations: 0,
    node: {
      labelPadding: 5,
      hide: true,
      nodePadding: 450,
      colors: ['#808080'],
      fontSize: 16 // Increase font size for nodes
    },
    link: {
      colorMode: 'gradient',
      colors: ['#FFCC99', '#FFE0B2', '#FFFF99', '#D1E7D5', '#A8E6CE', '#B2F0D9', '#006400', '#800000'],
      fontSize: 16 // Increase font size for links
    }
  },
  title: 'Sankey Chart Example', // Optional: Set a title for the chart
  titleTextStyle: {
    fontSize: 24 // Increase font size for title
  }
};
 
class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Sankey Chart</h1>
        <div className="chart-container">
          <Chart
            chartType="Sankey"
            width="100%"
            height="750px"
            data={data}
            options={options}
          />
        </div>
      </div>
    );
  }
}
 

 
export default Home;