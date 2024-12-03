import React, { useState } from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { baseUrl2 } from './API';
 
 
const ImportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
`;
 
const Title = styled.h1`
  color: #0e1954;
  margin-bottom: 20px;
`;
 
const FileInput = styled.input`
  margin-bottom: 20px;
`;
 
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Center buttons */
  gap: 10px; /* Space between buttons */
  width: 100%; /* Make the container full width */
`;
 
const Button = styled.button`
  background-color: #0e1954; /* Blue color */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
 
  &:hover {
    background-color: #1a3d8f; /* Darker blue on hover */
  }
`;
 
const TableContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto;
  width: 100%;
`;
 
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
`;
 
const TableRow = styled.tr`
&:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
 
const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
 
 
const Import = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [viewMessage, setViewMessage] = useState(''); // New state for view message
 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
 
  const formatDate = (value, columnName) => {
    if (columnName === "Created Date" || columnName === "Closing Date") {
      if (typeof value === 'number') {
        const date = XLSX.SSF.parse_date_code(value);
        if (date) {
          return `${String(date.d).padStart(2, '0')}-${String(date.m).padStart(2, '0')}-${date.y}`;
        }
      } else if (typeof value === 'string' && !isNaN(Date.parse(value))) {
        const date = new Date(value);
        return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
      }
    }
    return value; 
  };
 
  const handleFileParse = (file) => {
    const reader = new FileReader();
 
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
 
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
 
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
 
      if (jsonData.length === 0) {
        setMessage('The file is empty.');
        setError(true);
        return;
      }
 
      const headers = jsonData[0]; // First row is headers
      const rows = jsonData.slice(1); // Remaining rows are data
 
      const formattedData = rows.map((row) =>
        row.reduce((acc, cell, index) => {
          const columnName = headers[index] || `Column${index + 1}`;
          acc[columnName] = formatDate(cell, columnName);
          return acc;
        }, {})
      );
 
      setData(formattedData);
      setMessage('File parsed successfully.');
      setError(false);
    };
 
    reader.readAsBinaryString(file);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (!file) {
      setMessage('Please select a file.');
      setError(true);
      return;
    }
 
    setMessage('');
    setError(false);
    handleFileParse(file);
    setViewMessage('Data is Viewed'); // Set view message when data is parsed
  };
 
  const handleUpload = async () => {
    if (data.length === 0) {
      setMessage('No data to upload.');
      setError(true);
      return;
    }
 
    try {
      const filename = file.name;
      await axios.post(`${baseUrl2}/upload`, { data, filename });
      setMessage('Data uploaded successfully!');
      setError(false);
      setViewMessage(''); // Clear view message after upload
    } catch (error) {
      setMessage('Error uploading data: ' + error.message);
      setError(true);
    }
  };
 
  return (
<ImportContainer>
<Title>Import Files</Title>
<form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
<FileInput
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
        />
<ButtonContainer>
<Button type="submit">View</Button>
<Button type="button" onClick={handleUpload}>Upload to Database</Button>
</ButtonContainer>
</form>
      {message && <p style={{ color: error ? 'red' : 'green' }}>{message}</p>}
      {viewMessage && <p style={{ color: 'green' }}>{viewMessage}</p>} {/* Display view message */}
 
      {data.length > 0 && (
<TableContainer>
<Table>
<thead>
<TableRow>
                {Object.keys(data[0]).map((header, index) => (
<TableCell key={index}>{header}</TableCell>
                ))}
</TableRow>
</thead>
<tbody>
              {data.map((row, rowIndex) => (
<TableRow key={rowIndex}>
                  {Object.values(row).map((cell, cellIndex) => (
<TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
</TableRow>
              ))}
</tbody>
</Table>
</TableContainer>
      )}
</ImportContainer>
  );
};
 
export default Import;