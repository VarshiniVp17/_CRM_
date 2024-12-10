import React, { useState } from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { baseUrl2 } from './API';

// Styled Components
const ImportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align content to the top */
  height: 100vh;
  width: 100vw;
  background-color: #f4f7fc;
  padding: 40px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  color: #0e1954;
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 1700px; /* Increased max-width */
  min-height: 700px; /* Set minimum height to ensure proper space */
  overflow-y: auto; /* Allow scrolling if content overflows */
`;

const ChooseFileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #0e1954;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 200px;
  text-align: center;

  &:hover {
    background-color: #1a3d8f;
  }

  &:disabled {
    background-color: #c4c4c4;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  color: ${({ isError }) => (isError ? 'red' : 'green')};
  font-size: 16px;
  margin-top: 20px;
  font-weight: 600;
  text-align: center;
`;

const TableContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 1700px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: auto;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
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
  const [viewMessage, setViewMessage] = useState('');

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

    reader.readAsArrayBuffer(file); // Updated to use readAsArrayBuffer
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
    setViewMessage('Data is Ready to View'); // Set view message when data is parsed
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
      <FormContainer>
        {/* Choose File Container */}
        <ChooseFileContainer>
          <FileInput
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
        </ChooseFileContainer>
        
        {/* Form Buttons */}
        <ButtonContainer>
          <Button type="submit" onClick={handleSubmit}>View</Button>
          <Button type="button" onClick={handleUpload}>Upload to Database</Button>
        </ButtonContainer>

        {/* Messages */}
        {message && <Message isError={error}>{message}</Message>}
        {viewMessage && <Message isError={false}>{viewMessage}</Message>}

        {/* Table */}
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
      </FormContainer>
    </ImportContainer>
  );
};

export default Import;
