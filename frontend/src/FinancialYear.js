


import React, { useState, useEffect } from 'react';
import './ReportScreen.css'; // Add CSS for styling
import { baseUrl2 } from './API';
 
const FinancialYear = () => {
    const [reportData, setReportData] = useState([]);
    const [selectedBU, setSelectedBU] = useState('SBU2'); // Default value
    const [headerText, setHeaderText] = useState('Financial Year Report'); // Default header text
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchBU = selectedBU === 'SBU4' || selectedBU === 'SBU5' ? 'SBU3' : selectedBU;
                const response = await fetch(`${baseUrl2}/reportdata?bu=${fetchBU}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Debugging line
                setReportData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
 
        fetchData();
    }, [selectedBU]); // Re-fetch data when selectedBU changes
 
    useEffect(() => {
        // Update the header text based on the selectedBU value
        setHeaderText(`${selectedBU} Financial Year Report`);
    }, [selectedBU]); // Update header text whenever selectedBU changes
 
    const stages = ['Target', 'L0', 'L1-L2', 'L3-L4', 'L5-L6']; // List of stages
    const financialYears = ['FY 23-24', 'FY 24-25 (Q1)', 'FY 24-25 (Q2)', 'FY 24-25 (Q3)', 'FY 24-25 (Q4)'];
 
    // Mapping target values for each SBU
    const targetValues = {
        SBU1: { USD: '0.51', INR: '4.08' },
        SBU2: { USD: '0.50', INR: '4.00' },
        SBU3: { USD: '0.53', INR: '4.24' },
        SBU4: { USD: '0.54', INR: '4.32' },
        SBU5: { USD: '0.55', INR: '4.40' },
    };
 
    // Helper function to format values to two decimal places and convert to millions
    const formatValueToMillions = (value, isINR = false) => {
        const number = parseFloat(value || 0);
        if (isINR) {
            const croreValue = number / 10000000; // Convert to crore
            return croreValue.toFixed(2); // Format to 2 decimal places for INR
        }
        const millionValue = number / 1000000; // Convert to millions
        return millionValue.toFixed(2); // Format to 2 decimal places for USD
    };
 
    // Helper function to calculate GAP
    const calculateGAP = (l0USD, l0INR) => {
        const targetUSD = 0.5; // Target in million USD
        const targetINR = 4; // Target in crore INR
 
        const gapUSD = (l0USD - targetUSD).toFixed(2); // Calculate GAP in million USD
        const gapINR = (l0INR - targetINR).toFixed(2); // Calculate GAP in crore INR
 
        return { USD: gapUSD, INR: gapINR };
    };
 
    const aggregateData = () => {
        const data = stages.map(stage => {
            const stageData = financialYears.reduce((acc, year) => {
                const filteredData = reportData.find(item => item.StageGroup === stage);
 
                if (filteredData) {
                    acc[`${year} USD`] = formatValueToMillions(filteredData[`${year} USD`]);
                    acc[`${year} INR`] = formatValueToMillions(filteredData[`${year} INR`], true); // Pass true for INR formatting
                } else {
                    acc[`${year} USD`] = formatValueToMillions(0);
                    acc[`${year} INR`] = formatValueToMillions(0, true); // Pass true for INR formatting
                }
 
                return acc;
            }, { stage });
 
            // Set values for the Target row from the targetValues mapping
            if (stage === 'Target') {
                stageData[`${financialYears[0]} USD`] = targetValues[selectedBU].USD;
                stageData[`${financialYears[0]} INR`] = targetValues[selectedBU].INR;
                financialYears.slice(1).forEach(year => {
                    stageData[`${year} USD`] = targetValues[selectedBU].USD; // Use same target for all financial years
                    stageData[`${year} INR`] = targetValues[selectedBU].INR; // Use same target for all financial years
                });
            }
 
            return stageData;
        });
 
        const l0 = data.find(item => item.stage === 'L0') || {};
        const target = data.find(item => item.stage === 'Target') || {};
 
        const gap = financialYears.reduce((acc, year) => {
            const l0USD = parseFloat(l0[`${year} USD`] || '0');
            const l0INR = parseFloat(l0[`${year} INR`] || '0');
            const { USD, INR } = calculateGAP(l0USD, l0INR);
            acc[`${year} USD`] = USD;
            acc[`${year} INR`] = INR;
            return acc;
        }, { stage: 'GAP' });
 
        const finalData = [];
        data.forEach(item => {
            finalData.push(item);
            if (item.stage === 'L0') {
                finalData.push(gap); // Add GAP row after L0
            }
        });
 
        console.log('Aggregated data:', finalData); // Debugging line
        return finalData;
    };
 
    return (
<div className="report-container">
<div className="title-container">
<h1>{headerText}</h1> {/* Display dynamic header text */}
</div>
<div className="dropdown-container">
<h1>SELECT BU</h1>
<select onChange={(e) => setSelectedBU(e.target.value)} value={selectedBU}>
<option value="SBU1">SBU1</option>
<option value="SBU2">SBU2</option>
<option value="SBU3">SBU3</option>
<option value="SBU4">SBU4</option>
<option value="SBU5">SBU5</option>
</select>
</div>
<table className="report-table">
<thead>
<tr>
<th rowSpan="2">04-01-2024</th>
                        {financialYears.map(year => (
<React.Fragment key={year}>
<th colSpan="2">{year}</th>
</React.Fragment>
                        ))}
</tr>
<tr>
                        {financialYears.map(year => (
<React.Fragment key={year}>
<th>$Mn</th>
<th>Rs in Crs</th>
</React.Fragment>
                        ))}
</tr>
</thead>
<tbody>
                    {aggregateData().length === 0 ? (
<tr>
<td colSpan={financialYears.length * 2 + 1}>No data available</td>
</tr>
                    ) : (
                        aggregateData().map((item, index) => (
<tr key={index}>
<td className="stage-column">{item.stage}</td>
                                {financialYears.map(year => (
<React.Fragment key={year}>
<td>{item[`${year} USD`]}</td>
<td>{item[`${year} INR`]}</td>
</React.Fragment>
                                ))}
</tr>
                        ))
                    )}
</tbody>
</table>
</div>
    );
};
 
export default FinancialYear;