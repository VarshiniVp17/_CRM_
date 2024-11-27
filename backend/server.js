require('dotenv').config();  
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ldapjs = require('ldapjs');  
const mysql = require('mysql2');


 
const app = express();
const port = 3006;
 
 
app.use(cors("*"));
app.use(bodyParser.json());
app.use(express.json());
 
const ldapServerUrl = process.env.LDAP_SERVER || 'ldap://172.16.0.13:389'; 
const ldapPort = process.env.LDAP_PORT || 389;
 
const connection = mysql.createConnection({  
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'combined_database1'
});
 
 
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});
 
// New `/upload` endpoint logic
app.post('/upload', async (req, res) => {
  const { data, filename } = req.body;
 
  if (!data || !filename) {
    return res.status(400).json({ message: 'Invalid data or filename' });
  }
 
  const tableName = 'crm_data';
 
  try {
    // Ensure the table exists
    const createTableQuery = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (${Object.keys(data[0]).map(key => `\`${key}\` TEXT`).join(', ')})`;
    await connection.execute(createTableQuery);
 
    // Insert data
    const insertQuery = `INSERT INTO \`${tableName}\` (${Object.keys(data[0]).map(key => `\`${key}\``).join(', ')}) VALUES (${Object.keys(data[0]).map(() => '?').join(', ')})`;
 
    for (const row of data) {
      await connection.execute(insertQuery, Object.values(row));
    }
 
    res.status(200).json({ message: 'Data uploaded successfully' });
  } catch (error) {
    console.error('Error handling upload:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
 
});
 
// Route to fetch data from `sample` table
app.get('/api/funnelingdatas', (req, res) => {
  const query = 'SELECT *, REGEXP_REPLACE(Account_Name, "[^a-zA-Z\s.,]", "") AS Account_Name  FROM crm_data;';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});
 
 
 
// Endpoint to fetch sales data with optional BU filter
app.get('/api/sales-data', (req, res) => {
  const bu = req.query.bu || '%'; // Default to '%' if no BU is provided
 
  const query = `
    WITH CumulativeCounts AS (
      SELECT Stage, COUNT(*) AS count,
             SUM(COUNT(*)) OVER (ORDER BY FIELD(Stage, 'L0 - MSA / PO - Closed Won', 'L1 - LOI/SOW', 'L2 - Proposal Selected', 'L3', 'L4 - Proposal Submitted', 'L5 - Opportunity Identified', 'L6 - Lead / Suspect') ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_count
      FROM funnelingdatas_updated
      WHERE Stage IN ('L0 - MSA / PO - Closed Won', 'L1 - LOI/SOW', 'L2 - Proposal Selected', 'L3', 'L4 - Proposal Submitted', 'L5 - Opportunity Identified', 'L6 - Lead / Suspect') AND bu LIKE ?
      GROUP BY Stage
    )
    SELECT Stage, cumulative_count
    FROM CumulativeCounts
    ORDER BY cumulative_count DESC
  `;
 
  connection.query(query, [bu], (error, results) => {
    if (error) {
      console.error('SQL Error:', error.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});
 
// Endpoint to fetch detailed report for a specific stage with optional BU filter
app.get('/api/report/:stage', (req, res) => {
  const stage = req.params.stage;
  const bu = req.query.bu || '%'; // Default to '%' if no BU is provided
 
  const query = `
    SELECT * FROM sample
    WHERE Stage = ? AND bu LIKE ?
  `;
 
  connection.query(query, [stage, bu], (error, results) => {
    if (error) {
      console.error('SQL Error:', error.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});
 
 
// API endpoint to insert form data into the database
app.post('/api/opportunity', (req, res) => {
  const {
      no,
      dealIdNo,
      createdOn,
      accountName,
      opportunity,
      dealsOwner,
      dealValue,
      bu,
      financialQuarter,
      plannedRevenueInQUsd,
      stage,
      closurePeriod,
      closingDate,
      aging,
      businessType,
      region,
      dealValueIn,
      plannedRevenueInQInr
  } = req.body;
 
  const query = `
      INSERT INTO Opportunities (
          No,
          Deal_ID_No,
          Created_On,
          Account_Name,
          Opportunity,
          Deals_Owner,
          Deal_Value,
          BU,
          Financial_Quarter,
          Planned_Revenue_in_Q_USD,
          Stage,
          Closure_Period,
          Closing_Date,
          Aging,
          Business_Type,
          Region,
          Deal_Value_IN,
          Planned_Revenue_in_Q_INR
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
 
  const values = [
      no,
      dealIdNo,
      createdOn,
      accountName,
      opportunity,
      dealsOwner,
      dealValue,
      bu,
      financialQuarter,
      plannedRevenueInQUsd,
      stage,
      closurePeriod,
      closingDate,
      aging,
      businessType,
      region,
      dealValueIn,
      plannedRevenueInQInr
  ];
 
  connection.query(query, values, (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ error: 'Failed to insert data' });
      } else {
          res.status(200).json({ message: 'Data saved successfully', id: result.insertId });
      }
  });
});
 
 
// Route to insert form data into `personalcontacts` table
app.post('/api/form', (req, res) => {
  const {
    firstName,
    lastName,
    displayName,
    reportingManager,
    department,
    designation,
    role,
    address,
    city,
    state,
    country,
    zipcode,
    email,
    mobileNo
  } = req.body;
 
  const query = 'INSERT INTO personalcontacts SET ?';
  const values = {
    firstName,
    lastName,
    displayName,
    reportingManager,
    department,
    designation,
    role,
    address,
    city,
    state,
    country,
    zipcode,
    email,
    mobileNo
  };
 
  connection.query(query, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Form data inserted successfully', id: result.insertId });
  });
});
 
// Route to insert organization data into `organizationdeatil` table
app.post('/api/organization', (req, res) => {
  const {
    coreBusiness,
    sector,
    industryType,
    turnover,
    hqAddress,
    hqCity,
    hqState,
    hqCountry,
    hqZipcode,
    contactPerson,
    email,
    mobileNo
  } = req.body;
 
  const query = 'INSERT INTO organizationdeatil SET ?';
  const values = {
    coreBusiness,
    sector,
    industryType,
    turnover,
    hqAddress,
    hqCity,
    hqState,
    hqCountry,
    hqZipcode,
    contactPerson,
    email,
    mobileNo
  };
 
  connection.query(query, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Organization data inserted successfully', id: result.insertId });
  });
});
 
// Endpoint to fetch report data
app.get('/reportdata', async (req, res) => {
  const { bu } = req.query; // Get the BU from query parameters
 
  if (!bu) {
      return res.status(400).json({ error: 'BU parameter is required' });
  }
 
  try {
      // Combined query to fetch and aggregate data for 'L0', 'L5-L6', 'L3-L4', and 'L1-L2'
      const query = `
          SELECT
              'L5-L6' AS StageGroup,
              SUM(CASE WHEN \`Financial_Quarter\` IN ('FY 23-24 Q1', 'FY 23-24 Q2', 'FY 23-24 Q3', 'FY 23-24 Q4')
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 23-24 USD',
              SUM(CASE WHEN \`Financial_Quarter\` IN ('FY 23-24 Q1', 'FY 23-24 Q2', 'FY 23-24 Q3', 'FY 23-24 Q4')
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 23-24 INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q1'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q1) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q1'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q1) INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q2'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q2) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q2'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q2) INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q3'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q3) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q3'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q3) INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q4'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q4) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q4'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q4) INR'
          FROM funnelingdatas_updated
          WHERE \`Stage\` IN ('L5 - Opportunity Identified', 'L6 - Lead / Suspect')
          AND \`BU\` = ?
 
          UNION ALL
 
          SELECT
              'L0' AS StageGroup,
              SUM(CASE WHEN \`Financial_Quarter\` IN ('FY 23-24 Q1', 'FY 23-24 Q2', 'FY 23-24 Q3', 'FY 23-24 Q4')
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 23-24 USD',
              SUM(CASE WHEN \`Financial_Quarter\` IN ('FY 23-24 Q1', 'FY 23-24 Q2', 'FY 23-24 Q3', 'FY 23-24 Q4')
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 23-24 INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q1'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q1) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q1'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q1) INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q2'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q2) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q2'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q2) INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q3'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q3) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q3'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q3) INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q4'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q4) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q4'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q4) INR'
          FROM funnelingdatas_updated
          WHERE \`Stage\` = 'L0 - MSA / PO - Closed Won'
          AND \`BU\` = ?
 
          UNION ALL
 
          SELECT
              'L3-L4' AS StageGroup,
              SUM(CASE WHEN \`Financial_Quarter\` IN ('FY 23-24 Q1', 'FY 23-24 Q2', 'FY 23-24 Q3', 'FY 23-24 Q4')
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 23-24 USD',
              SUM(CASE WHEN \`Financial_Quarter\` IN ('FY 23-24 Q1', 'FY 23-24 Q2', 'FY 23-24 Q3', 'FY 23-24 Q4')
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 23-24 INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q1'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q1) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q1'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q1) INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q2'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q2) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q2'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q2) INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q3'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q3) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q3'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q3) INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q4'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q4) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q4'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q4) INR'
          FROM funnelingdatas_updated
          WHERE \`Stage\` IN ('L3 - Proposal Submitted', 'L4 - Closed Lost')
          AND \`BU\` = ?
 
          UNION ALL
 
          SELECT
              'L1-L2' AS StageGroup,
              SUM(CASE WHEN \`Financial_Quarter\` IN ('FY 23-24 Q1', 'FY 23-24 Q2', 'FY 23-24 Q3', 'FY 23-24 Q4')
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 23-24 USD',
              SUM(CASE WHEN \`Financial_Quarter\` IN ('FY 23-24 Q1', 'FY 23-24 Q2', 'FY 23-24 Q3', 'FY 23-24 Q4')
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 23-24 INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q1'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q1) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q1'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q1) INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q2'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q2) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q2'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q2) INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q3'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q3) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q3'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q3) INR',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q4'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) ELSE 0 END) AS 'FY 24-25 (Q4) USD',
              SUM(CASE WHEN \`Financial_Quarter\` = 'FY 24-25 Q4'
                       THEN CAST(REPLACE(REPLACE(\`Deal_Value\`, ',', ''), '$', '') AS DECIMAL(15, 2)) * 80 ELSE 0 END) AS 'FY 24-25 (Q4) INR'
          FROM funnelingdatas_updated
          WHERE \`Stage\` IN ('L1 - LOI/SOW', 'L2 - Proposal Selected')
          AND \`BU\` = ?
      `;
 
      // Execute the query with parameters
      connection.query(query, [bu, bu, bu, bu], (error, results) => {
          if (error) {
              console.error('Query error:', error); // Log the error details
              return res.status(500).json({ error: 'Error fetching report data' });
          }
          res.json(results);
      });
  } catch (error) {
      console.error('Server error:', error); // Log the server-side error
      res.status(500).json({ error: 'Server error' });
  }
});
 
 
 
// Route to fetch deal value and probability from the new table with SBU filter
app.get('/api/deals-probability', (req, res) => {
  const { sbu } = req.query;  // Get the SBU from the query parameters
  let query = 'SELECT `Deal Value` AS amount, `Probability%` AS probability FROM ExcelData';
 
  if (sbu) {
      query += ` WHERE BU = ?`; // Adjust your column name if needed
  }
 
  connection.query(query, [sbu], (err, results) => {
      if (err) {
          console.error('Error fetching data:', err);
          res.status(500).send('Server error');
          return;
      }
      res.status(200).json(results);
  });
});
 
// POST request for login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = ldapjs.createClient({ url: ldapServerUrl });

    await new Promise((resolve, reject) => {
      client.bind(username, password, (err) => {
        if (err) {
          reject(err); 
        } else {
          resolve(); 
        }
      });
    });

    console.log('LDAP authentication successful');
    client.unbind();  

    return res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('LDAP authentication failed:', error);
    return res.json({ success: false, message: 'Invalid credentials' });
  }
});
 
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});