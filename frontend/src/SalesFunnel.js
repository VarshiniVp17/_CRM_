import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import './SalesFunnel.css';
import { baseurl } from './API';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SalesFunnel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataPoints: [],
      isLoading: true,
      error: null,
      clickedStageData: [],
      selectedBU: 'SBU1', // Default BU
      buOptions: ['SBU1', 'SBU2', 'SBU3'], // Add other BUs as needed
      colors: ['#FF0000', '#FF4C4C', '#FF8C00', '#FFA500', '#FFFF00', '#90EE90', '#32CD32', '#008000'] // Define color scheme
    };
  }

  componentDidMount() {
    this.fetchData(this.state.selectedBU);
  }

  // Fetch sales data based on the selected BU
  fetchData = (bu) => {
    fetch(`${baseurl}/sales-data?bu=${bu}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const dataPoints = data.map((stageData, index) => ({
          y: parseInt(stageData.cumulative_count, 10),
          label: stageData.Stage,
          color: this.createGradientColor(index) // Use the gradient color function
        }));

        this.setState({ dataPoints, isLoading: false });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.setState({ error, isLoading: false });
      });
  };

  // Function to create a gradient color for each funnel stage
  createGradientColor(index) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Define gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, this.state.colors[index % this.state.colors.length]);
    gradient.addColorStop(1, this.state.colors[(index + 1) % this.state.colors.length]);

    return gradient;
  }

  // Handle click event on a funnel stage
  handleItemClick = (e) => {
    const clickedStage = e.dataPoint.label;
    console.log(`Clicked on stage: ${clickedStage}`);

    // Properly encode the clickedStage to handle spaces and special characters
    const encodedStage = encodeURIComponent(clickedStage);

    fetch(`${baseurl}/report/${encodedStage}?bu=${this.state.selectedBU}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Detailed report:', data);
        this.setState({ clickedStageData: data });
      })
      .catch(error => {
        console.error('Error fetching detailed report:', error);
      });
  };

  // Handle BU selection change
  handleBUChange = (event) => {
    const selectedBU = event.target.value;
    this.setState({ selectedBU, isLoading: true }, () => {
      this.fetchData(selectedBU);
    });
  };

  render() {
    const { dataPoints, isLoading, error, clickedStageData, buOptions, selectedBU } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    const total = dataPoints[0]?.y || 1;
    const dataPointsWithPercentage = dataPoints.map((point, index) => ({
      ...point,
      percentage: index === 0 ? 100 : ((point.y / total) * 100).toFixed(2)
    }));

    const options = {
      animationEnabled: true,
      title: {
        text: "Sales Analysis"
      },
      data: [{
        type: "funnel",
        toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
        indexLabelPlacement: "inside",
        indexLabel: "{label} ({percentage}%)",
        dataPoints: dataPointsWithPercentage,
        click: this.handleItemClick
      }]
    };

    return (
      <div>
        <div>
          <label>Select BU:</label>
          <select value={selectedBU} onChange={this.handleBUChange}>
            {buOptions.map(bu => (
              <option key={bu} value={bu}>{bu}</option>
            ))}
          </select>
        </div>

        <CanvasJSChart options={options} onRef={ref => this.chart = ref} />

        {clickedStageData.length > 0 && (
          <div>
            <h3>Report for {clickedStageData[0].Stage}</h3>
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead>
                <tr>
                  <th>Deal_ID_No</th>
                  <th>Created_On</th>
                  <th>Account_Name</th>
                  <th>Opportunity</th>
                  <th>Deals_Owner</th>
                  <th>Deal_Value</th>
                  <th>Financial_Quarter</th>
                  <th>Planned_Revenue_in_Q_USD</th>
                  <th>Stage</th>
                  <th>Closure_Period</th>
                  <th>Closing_Date</th>
                  <th>Aging</th>
                  <th>BU</th>
                </tr>
              </thead>
              <tbody>
                {clickedStageData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Deal_ID_No}</td>
                    <td>{new Date(item.Created_On).toLocaleDateString()}</td>
                    <td>{item.Account_Name}</td>
                    <td>{item.Opportunity}</td>
                    <td>{item.Deals_Owner}</td>
                    <td>{item.Deal_Value}</td>
                    <td>{item.Financial_Quarter}</td>
                    <td>{item.Planned_Revenue_in_Q_USD}</td>
                    <td>{item.Stage}</td>
                    <td>{item.Closure_Period}</td>
                    <td>{new Date(item.Closing_Date).toLocaleDateString()}</td>
                    <td>{item.Aging}</td>
                    <td>{item.BU}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default SalesFunnel;
