import React from 'react';
import styled from 'styled-components';
import Logo from './images/logo3.png'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Adjust layout to align logo and title */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background-color: #cccccc; /* Adjust background color if needed */
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoImage = styled.img`
  height: 50px; /* Adjust the height as needed */
`;

const Title = styled.h1`
  font-size: 30px; /* Adjust the font size as needed */
  margin: 0;
  color: #0E1954; /* Adjust text color if needed */
  flex-grow: 1; /* Allows the title to grow and take center position */
  text-align: center; /* Centers the text horizontally */
`;

const LogoutButton = styled.button`
  background-color: #e74c3c; /* Red color for logout */
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 35px; /* Adjust this value to move it left */
 
  &:hover {
    background-color: #c0392b; /* Darker red on hover */
  }
`;

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear session storage or local storage (e.g., auth tokens)
    localStorage.removeItem('authToken'); // Adjust key if necessary
    sessionStorage.removeItem('authSession'); // Example for session-based

    // Navigate back to the login page
    navigate('/');
  };

  return (
    <HeaderContainer>
      <LogoImage src={Logo} alt="Logo" />
      <Title><center>CRM</center></Title>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </HeaderContainer>
  );
};

export default Header;
