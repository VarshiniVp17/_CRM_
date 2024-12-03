import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DropdownWithCheckbox from './DropdownWithCheckbox';
import './Report.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';  // Import CSVLink for exporting CSV
 
function Deals() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'No', direction: 'ascending' });
  const [owners, setOwners] = useState([]);
  const [stages, setStages] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [sbus, setSbus] = useState([]); // SBU options  
  const [closurePeriods, setClosurePeriods] = useState([]); // New state for closure periods
  const [regions, setRegions] = useState([]); // New state for Region
  const [typesEE_EN_NN, setTypesEE_EN_NN] = useState([]); // New state for "Type-EE_EN_NN"
  const [selectedOwners, setSelectedOwners] = useState(['ALL']);
  const [selectedStages, setSelectedStages] = useState(['ALL']);
  const [selectedQuarters, setSelectedQuarters] = useState(['ALL']);
  const [selectedAccounts, setSelectedAccounts] = useState(['ALL']);
const [selectedSbus, setSelectedSbus] = useState(['ALL']); // Selected SBUs
const [selectedClosurePeriods, setSelectedClosurePeriods] = useState(['ALL']); // Selected closure periods
const [selectedRegions, setSelectedRegions] = useState(['ALL']); // Selected Regions
const [selectedTypesEE_EN_NN, setSelectedTypesEE_EN_NN] = useState(['ALL']); // New state for selected "Type-EE_EN_NN"
 

// Pagination states
const [currentPage, setCurrentPage] = useState(1); // Tracks the current page number
const itemsPerPage = 50; // Set items per page to 50

// Function to reset filters
const resetFilters = () => {
  setSelectedOwners(['ALL']);
  setSelectedStages(['ALL']);
  setSelectedQuarters(['ALL']);
  setSelectedAccounts(['ALL']);
  setSelectedSbus(['ALL']);
  setSelectedClosurePeriods(['ALL']);
  setSelectedRegions(['ALL']);
  setSelectedTypesEE_EN_NN(['ALL']);
};
 
  const [totalDealValue, setTotalDealValue] = useState(0);
  const [totalPlannedRevenue, setTotalPlannedRevenue] = useState(0);
  const [totalDealValueINR, setTotalDealValueINR] = useState(0); // New INR total state
  const [totalPlannedRevenueINR, setTotalPlannedRevenueINR] = useState(0); // New INR total state
 
  const formatToShortNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + ' B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + ' M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + ' K';
    }
    return num; // No formatting for numbers below 1,000
  };
 
  const formatToShortNumberINR = (num) => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + ' Cr'; // Crore
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2) + ' L'; // Lakh
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + ' K';
    }
    return num; // No formatting for numbers below 1,000
  };
 
    const reportData = filteredData.map(item => ({
    Deal_ID_No:item.Deal_ID_No,
    Account_Name: item.Account_Name,
    Opportunity:item.Opportunity,
    Deals_Owner: item.Deals_Owner,
    Deal_Value: item.Deal_Value,
    Financial_Quarter: item.Financial_Quarter,
    Planned_Revenue_in_Q_USD: item.Planned_Revenue_in_Q_USD,
    Stage: item.Stage,
    Aging:item.Aging,
    Closure_Period: item.Closure_Period,
    Region: item.Region,
    Business_Type: item.Business_Type,
    BU:item.BU,
 
    }));
 
    const headers = [
    { label: "Deal ID No", key: "Deal_ID_No" },
    { label: "Created On", key: "Created_On" },
    { label: "Account Name", key: "Account_Name" },
    { label: "Opportunity", key: "Opportunity" },
    { label: "Deal Owner", key: "Deals_Owner" },
    { label: "Deal Value", key: "Deal_Value" },
    { label: "Financial Quarter", key: "Financial_Quarter" },
    { label: "Planned Revenue in Q USD", key: "Planned_Revenue_in_Q_USD" },
    { label: "Stage", key: "Stage" },
    { label: "Closing Date", key: "Closing_Date" },
    { label: "Aging", key: "Aging" },
    { label: "Closure Period", key: "Closure_Period" },
    { label: "Region", key: "Region" },
    { label: "Business Type", key: "Business_Type" },
    { label: "BU", key: "BU" },
  ];
 
  const conversionRateUSDToINR = 80;
 
  useEffect(() => {
    //localStorage.get("buUnits")
    var storedUnits = localStorage.getItem("bu_unit");
    console.log("Stored Unit SBU:", storedUnits);
   
    axios.get('http://172.16.3.154:3006/api/funnelingdatas?buUnit='+storedUnits)

      .then(response => {
        const data = response.data;
        setData(data);
        setFilteredData(data);
        setLoading(false);
 
        const uniqueOwners = ["ALL", ...new Set(data.map(item => item.Deals_Owner))];
        const uniqueStages = ["ALL", ...new Set(data.map(item => item.Stage))];
        const uniqueQuarters = ["ALL", ...Array.from(new Set(data.map(item => item.Financial_Quarter))).filter(q => q.trim() !== '')];
        const uniqueAccounts = ["ALL", ...new Set(data.map(item => item.Account_Name))];
        const uniqueSbus = ["ALL", ...new Set(data.map(item => item.BU))]; // SBU options
        const uniqueClosurePeriods = ["ALL", ...new Set(data.map(item => item.Closure_Period))]; // Extract unique closure periods  
        const uniqueRegions = ["ALL", ...new Set(data.map(item => item.Region))]; // Extract unique Regions
        const uniqueTypesEE_EN_NN = ["ALL", ...new Set(data.map(item => item.Business_Type))]; // Extract unique "Type-EE_EN_NN" values
 
        setOwners(uniqueOwners);
        setStages(uniqueStages);
        setQuarters(uniqueQuarters);
        setAccounts(uniqueAccounts);
        setSbus(uniqueSbus); // Set SBU options
        setClosurePeriods(uniqueClosurePeriods); // Set closure periods
        setRegions(uniqueRegions); // Set Regions
        setTypesEE_EN_NN(uniqueTypesEE_EN_NN); // Set "Type-EE_EN_NN" filter options
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to render pagination controls
  const renderPaginationControls = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

 
  useEffect(() => {
    const filterData = () => {
      let result = [...data];
 
      if (!selectedOwners.includes('ALL')) {
        result = result.filter(item => selectedOwners.includes(item.Deals_Owner));
      }
 
      if (!selectedStages.includes('ALL')) {
        result = result.filter(item => selectedStages.includes(item.Stage));
      }
 
      if (!selectedQuarters.includes('ALL')) {
        result = result.filter(item => selectedQuarters.includes(item.Financial_Quarter));
      }
 
      if (!selectedAccounts.includes('ALL')) {
        result = result.filter(item => selectedAccounts.includes(item.Account_Name));
      }
 
         if (!selectedSbus.includes('ALL')) {
           result = result.filter(item => selectedSbus.includes(item.BU));
        }
        if (!selectedClosurePeriods.includes('ALL')) {
          result = result.filter(item => selectedClosurePeriods.includes(item.Closure_Period));
        }
        if (!selectedRegions.includes('ALL')) {
          result = result.filter(item => selectedRegions.includes(item.Region)); // Filter by Region
        }
        if (!selectedTypesEE_EN_NN.includes('ALL')) { // Filter by "Type-EE_EN_NN"
          result = result.filter(item => selectedTypesEE_EN_NN.includes(item.Business_Type));
        }
 
 
      setFilteredData(result);
      calculateTotals(result);
    };
 
    filterData();
  }, [selectedOwners, selectedStages, selectedQuarters, selectedAccounts,selectedSbus,selectedClosurePeriods, selectedRegions,selectedTypesEE_EN_NN, data]);
 
  const calculateTotals = (filteredData) => {
    const formatNumber = (value) => {
      if (typeof value !== 'string') return 0;
      return parseFloat(value.replace(/[^0-9.-]/g, '')) || 0;
    };
 
    const totalDealValue = filteredData.reduce((sum, item) => sum + formatNumber(item.Deal_Value), 0);
    const totalPlannedRevenue = filteredData.reduce((sum, item) => sum + formatNumber(item.Planned_Revenue_in_Q_USD), 0);
 
        // Calculate INR totals
    const totalDealValueINR = totalDealValue * conversionRateUSDToINR;
    const totalPlannedRevenueINR = totalPlannedRevenue * conversionRateUSDToINR;
   
 
    setTotalDealValue(totalDealValue.toFixed(0)); // No decimal
    setTotalPlannedRevenue(totalPlannedRevenue.toFixed(0)); // No decimal
 
    setTotalDealValueINR(totalDealValueINR.toFixed(0)); // INR total
    setTotalPlannedRevenueINR(totalPlannedRevenueINR.toFixed(0)); // INR total
  };
 
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
 
    const sortedData = [...filteredData].sort((a, b) => {
      let valueA, valueB;
 
      if (key === 'Deal_Value' || key === 'Planned_Revenue_in_Q_USD') {
        valueA = parseFloat(a[key].replace(/[^0-9.-]/g, ''));
        valueB = parseFloat(b[key].replace(/[^0-9.-]/g, ''));
      } else if (key === 'Deal_Value_INR') {
        valueA = parseFloat(a.Deal_Value.replace(/[^0-9.-]/g, '')) * conversionRateUSDToINR;
        valueB = parseFloat(b.Deal_Value.replace(/[^0-9.-]/g, '')) * conversionRateUSDToINR;
      } else if (key === 'Planned_Revenue_in_Q_INR') {
        // Calculate Planned Revenue in INR for sorting
        valueA = parseFloat(a.Planned_Revenue_in_Q_USD.replace(/[^0-9.-]/g, '')) * conversionRateUSDToINR;
        valueB = parseFloat(b.Planned_Revenue_in_Q_USD.replace(/[^0-9.-]/g, '')) * conversionRateUSDToINR;
      } else if (key === 'Created_Date') {
        valueA = a[key];
        valueB = b[key];
      } else {
        valueA = a[key];
        valueB = b[key];
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }
      }
 
      if (valueA < valueB) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
 
    setFilteredData(sortedData);
  };
 
  const handleChange = (value, setSelectedFunc) => {
    if (value === "ALL") {
      setSelectedFunc(["ALL"]);
    } else {
      setSelectedFunc(prev =>
        prev.includes(value)
          ? prev.filter(item => item !== value)
          : [...prev.filter(item => item !== "ALL"), value]
      );
    }
  };
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
 
 
    // Function to export data to PDF
  const exportToPDF = (filteredData) => {
    const doc = new jsPDF();
 
    const tableColumn = ['Deal ID No', 'Created On', 'Account Name', 'Opportunity', 'Deals Owner', 'Deal Value','Financial Quarter','Planned Revenue USD','Stage', 'Closing Date','Aging','Closure_Period','Region','Business_Type','BU'];
   
    const tableRows = filteredData.map(deal => [
      deal.Deal_ID_No,
      formatDate(deal.Created_On),
      deal.Account_Name,
      deal.Opportunity,
      deal.Deals_Owner,
      deal.Deal_Value,
      deal.Financial_Quarter,
      deal.Planned_Revenue_in_Q_USD,
      deal.Stage,
      formatDate(deal.Closing_Date),
      deal.Aging,
      deal.Closure_Period,
      deal.Region,
      deal.Business_Type,
      deal.BU
  ]);
 
  function formatDate(dateString) {
      if (!dateString) return ''; // Handle null or undefined dates
 
      // Try parsing the date directly
      const date = new Date(dateString);
 
      // If date is invalid, try parsing manually
      if (isNaN(date.getTime())) {
          // Example for a custom date format (e.g., 'DD-MM-YYYY')
          const parts = dateString.split('-');
          if (parts.length === 3) {
              const year = parts[2];
              const month = parts[1] - 1; // Months are zero-based
              const day = parts[0];
              return new Date(year, month, day).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
              });
          }
          return 'Invalid Date'; // Handle unexpected formats
      }
 
      return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
      });
  }
 
    doc.autoTable({
      head: [tableColumn],  // Table headers
      body: tableRows,      // Table rows
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 10 },
        2: { cellWidth: 15 },
        3: { cellWidth: 15 },
        4: { cellWidth: 15 },
        5: { cellWidth: 15 },
        6: { cellWidth: 10 },
        7: { cellWidth: 20 },
        8: { cellWidth: 15 },
        9: { cellWidth: 15 },
        10: { cellWidth: 5 },
        11: { cellWidth: 15 },
        12: { cellWidth: 10 },
        13: { cellWidth: 10 },
        14: { cellWidth: 10 }
     
      },
      styles: {
        cellPadding: 0,           // Remove padding
        lineHeight: 0.001,        // Minimize line height
        minCellHeight: 0.01,      // Set minimum cell height to a very low value
        fontSize: 5,              // Reduce font size for body
        halign: 'center',          // Center text in body
        valign: 'middle',          // Center align text vertically in body
      },
      headStyles: {
        fillColor: [14, 25, 84],  // Set the background color for header cells (#0e1954)
        textColor: [255, 255, 255], // Set the text color for header cells (white)
        fontSize: 5,               // Font size for header
        halign: 'center',          // Center align header text
        valign: 'middle',          // Center align header text vertically
      },
      didParseCell: function (data) {
        if (data.cell.section === 'body') {
          data.cell.styles.minCellHeight = 0.01; // Ensure rows are extremely compact
          data.cell.styles.fontSize = 4;          // Adjust font size in body cells
        }
      },
    });
   
    doc.save('deals_report.pdf');
  };
 
 
  return (
    <div className="App">
      <h1>Deals Report</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
        {/* CSVLink for exporting the report data */}
        <CSVLink
          data={reportData}
          headers={headers}
          filename="report.csv"
          target="_blank"
        >
          <button style={{
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: '#0E1954',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer' // Change cursor to pointer
          }}>
          <b>Export CSV</b>
          </button>
        </CSVLink>
       
        <button onClick={() => exportToPDF(filteredData)}><b>Export PDF</b></button>
 
      </div>
      <button className="reset-button" onClick={resetFilters}>
        Reset
      </button>
      <div className="filters">
      <DropdownWithCheckbox
            label="SBU" // Added SBU filter
            options={sbus}
selectedOptions={selectedSbus}
onChange={value => handleChange(value, setSelectedSbus)}
/>
        <DropdownWithCheckbox
          label="Deals Owner"
          options={owners}
          selectedOptions={selectedOwners}
          onChange={value => handleChange(value, setSelectedOwners)}
        />
        <DropdownWithCheckbox
          label="Deals Stage"
          options={stages}
          selectedOptions={selectedStages}
          onChange={value => handleChange(value, setSelectedStages)}
        />
        <DropdownWithCheckbox
          label="Financial Quarter"
          options={quarters}
          selectedOptions={selectedQuarters}
          onChange={value => handleChange(value, setSelectedQuarters)}
        />
        <DropdownWithCheckbox
          label="Account Name"
          options={accounts}
          selectedOptions={selectedAccounts}
          onChange={value => handleChange(value, setSelectedAccounts)}
        />
              <DropdownWithCheckbox
            label="Closure Period" // New Closure Period filter
            options={closurePeriods}
            selectedOptions={selectedClosurePeriods}
            onChange={value => handleChange(value, setSelectedClosurePeriods)}
        />
               <DropdownWithCheckbox
          label="Region" // New dropdown for Region
          options={regions}
          selectedOptions={selectedRegions}
          onChange={value => handleChange(value, setSelectedRegions)}
        />
            <DropdownWithCheckbox
          label="Business Type"
          options={typesEE_EN_NN} // New dropdown for "Type-EE_EN_NN"
          selectedOptions={selectedTypesEE_EN_NN}
          onChange={value => handleChange(value, setSelectedTypesEE_EN_NN)}
        />
       </div>
 
    <table>
 
        <thead>
        <tr>
          {/* ID */}
  <th className='cell'  style={{ width: '100px' }}>  
  </th>
  {/* created on */}
  <th className='cell' style={{ width: '100px' }} >
  </th>
  {/* Account name */}
  <th className='cell' style={{ width: '300px' }}>
  </th>
  {/* Opportunity */}
  <th className='cell' style={{ width: '300px' }} >
  </th>
  {/* Deal owner */}
  <th className='cell' style={{ width: '130px' }}>
  </th>
  {/* <th className='cell' style={{ width: '120px' }}>
  </th> */}
  {/* Deal value USD */}
  <th className='value'  style={{ width: '100px' }} >
  SUM: $ {formatToShortNumber(totalDealValue)}
  </th>
  {/* Deal value INR */}
  <th className='value' style={{ width: '110px' }}>
  SUM: ₹ {formatToShortNumberINR(totalDealValueINR)}
  </th>
  {/* Financial_Quarter */}
  <th className='cell'style={{ width: '110px' }} >
  </th>
  {/* Planned_Revenue_USD */}
  <th className='cell' style={{ width: '120px' }} >
  </th>
  {/* Planned_Revenue_INR */}
  <th className='value' style={{ width: '110px' }}>
  SUM: $ {formatToShortNumber(totalPlannedRevenue)}
  </th>
  {/* Stage */}
  <th className='value' style={{ width: '150px' }}>
  SUM: ₹ {formatToShortNumberINR(totalPlannedRevenueINR)}
  </th>
  {/* <th className='cell' style={{ width: '129px' }}>
  </th> */}
  <th className='cell' onClick={() => handleSort('Closure_Period')}style={{ width: '114px' }}>
  </th>
  {/* aging */}
  <th className='cell' style={{ width: '109px' }}>
  </th>
  <th className='cell' style={{ width: '10px' }}>
  </th>
  <th className='cell' style={{ width: '10px' }}>
  </th>
</tr>
<tr>
  <th onClick={() => handleSort('Deal_ID_No')} style={{ width: '50px' }} >
    ID
    {sortConfig.key === 'Deal_ID_No' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th>
  <th onClick={() => handleSort('Created_On')}style={{ width: '90px' }} >
    Created On
    {sortConfig.key === 'Created_On' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th>
  <th onClick={() => handleSort('Account_Name')}style={{ width: '350px' }} >
    Account Name
    {sortConfig.key === 'Account_Name' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th>
  <th onClick={() => handleSort('Opportunity')} style={{ width: '250px' }} >
    Opportunity
    {sortConfig.key === 'Opportunity' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th>
  <th onClick={() => handleSort('Deals_Owner')} style={{ width: '130px' }} >
    Deals Owner
    {sortConfig.key === 'Deals_Owner' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th>
  {/* <th onClick={() => handleSort('Business_Type')} style={{width: '120px'}}>
    Business Type
    {sortConfig.key === 'Business_Type' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th> */}
  <th onClick={() => handleSort('Deal_Value')} style={{ width: '100px' }} >
    Deal Value $
    {sortConfig.key === 'Deal_Value' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th>
  <th onClick={() => handleSort('Deal_Value_INR')} style={{ width: '100px' }} >
    Deal Value ₹
    {sortConfig.key === 'Deal_Value_INR' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th>
  {/* <th onClick={() => handleSort('BU')} style={{ width: '40px' }} >
    BU
    {sortConfig.key === 'BU' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th> */}
  <th onClick={() => handleSort('Financial_Quarter')}style={{ width: '99px' }} >
    Financial Qtr
    {sortConfig.key === 'Financial_Quarter' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th>
  <th onClick={() => handleSort('Planned_Revenue_in_Q_USD')} style={{ width: '110px' }}>
    Planned Rev $
    {sortConfig.key === 'Planned_Revenue_in_Q_USD' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th>
  <th onClick={() => handleSort('Planned_Revenue_in_Q_INR')}style={{ width: '109px' }}>
    Planned Rev ₹
    {sortConfig.key === 'Planned_Revenue_in_Q_INR' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th>
  <th onClick={() => handleSort('Stage')}>
    Stage
    {sortConfig.key === 'Stage' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th>
  {/* <th onClick={() => handleSort('Closure_Period')}style={{ width: '112px' }}>
    Closure Period
    {sortConfig.key === 'Closure_Period' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th> */}
  <th onClick={() => handleSort('Closing_Date')}style={{ width: '99px' }}>
    Closing Date
    {sortConfig.key === 'Closing_Date' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th>
  {/* <th onClick={() => handleSort('Region')}style={{ width: '80px' }}>
    Region
    {sortConfig.key === 'Region' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th> */}
  <th onClick={() => handleSort('Aging')}style={{ width: '57px' }}>
    Aging
    {sortConfig.key === 'Aging' ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : ' 🔽'}
  </th>
</tr>
 
        </thead>
        <tbody>
          {currentItems.map((item, index) => {
            // Convert USD to INR with precise rounding
            const dealValueUSD = parseFloat(item.Deal_Value.replace(/[^0-9.-]/g, '')) || 0;
            const dealValueINR = dealValueUSD * conversionRateUSDToINR;
            const formattedDealValueINR = Math.round(dealValueINR).toLocaleString('en-IN');
 
            // Calculate planned revenue in INR for each item
            const plannedRevenueUSD = parseFloat(item.Planned_Revenue_in_Q_USD.replace(/[^0-9.-]/g, '')) || 0;
            const plannedRevenueINR = plannedRevenueUSD * conversionRateUSDToINR;
            const formattedPlannedRevenueINR = Math.round(plannedRevenueINR).toLocaleString('en-IN');
 
            return (
              <tr key={index}>
                <td>{item.Deal_ID_No}</td>
                <td>{item.Created_On}</td> {/* Format the date */}
                <td>{item.Account_Name}</td>
                <td>{item.Opportunity}</td>
                <td>{item.Deals_Owner}</td>
                {/* <td>{item.Business_Type}</td> */}
                <td>{item.Deal_Value}</td>
                <td>{formattedDealValueINR}</td>
                {/* <td>{item.BU}</td> */}
                <td>{item.Financial_Quarter}</td>
                <td>{item.Planned_Revenue_in_Q_USD}</td>
                <td>{formattedPlannedRevenueINR}</td>
                <td>{item.Stage}</td>
                {/* <td>{item.Closure_Period}</td> */}
                <td>{item.Closing_Date}</td> {/* Format the date */}
                {/* <td>{item.Region}</td> */}
                <td>{item.Aging}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
   {/* Render pagination controls */}
   {renderPaginationControls()}
 
    </div>
  );
}
 
export default Deals;