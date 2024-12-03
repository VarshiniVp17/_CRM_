import React, { useState, useEffect } from 'react';
import { FaHome, FaChartBar, FaBars, FaCaretDown, FaFunnelDollar, FaCog, FaUser, FaBriefcase, FaInfoCircle, FaBuilding, FaTable, FaFileImport, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './images/logo3.png';

const SideNavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.collapsed ? '60px' : '220px'};
  height: 100vh;
  background-color: #0e1954;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.collapsed ? 'center' : 'flex-start'};
  padding-top: 60px;
  box-sizing: border-box;
  transition: width 0.3s ease;
  z-index: 1000;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  font-weight: bold;
  width: 100%;
  padding: 15px 20px;
  text-decoration: none;
  color: white;
  font-size: 19px;
  box-sizing: border-box;
  background-color: ${props => props.isActive ? '#6c757d' : 'transparent'};
  
  &:hover {
    background-color: #6c757d; /* Hover background color */
  }
`;

const NavIcon = styled.div`
  margin-right: ${props => props.collapsed ? '0' : '15px'};
  font-size: 20px;
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #0e1954;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  z-index: 1;
`;

const SubMenu = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  padding-left: ${props => props.collapsed ? '0' : '30px'};
`;

const SubMenuItem = styled(NavItem)`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${props => props.isActive ? '#6c757d' : 'transparent'};
  
  &:hover {
    background-color: #6c757d; /* Hover background color for sub-menu items */
  }
`;

const LogoContainer = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  background-color: #0e1954;
  box-sizing: border-box;
  text-decoration: none;
`;

const LogoImage = styled.img`
  max-width: ${props => props.collapsed ? '40px' : '100px'};
  height: auto;
  transition: max-width 0.3s ease;
`;

const SideNav = ({ isCollapsed, toggleNav }) => {
  const [isOpportunityOpen, setIsOpportunityOpen] = useState(false);
  const [isChartsOpen, setIsChartsOpen] = useState(false);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('/');
  const navigate = useNavigate();

  useEffect(() => {
    if (isCollapsed) {
      setIsOpportunityOpen(false);
      setIsChartsOpen(false);
      setIsCustomerDetailsOpen(false);
      setIsReportOpen(false);
    }
  }, [isCollapsed]);

  const handleTabClick = (path) => {
    setActiveTab(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authSession');
    navigate('/');
  };

  return (
    <SideNavContainer collapsed={isCollapsed}>
      {/* Clickable Logo */}
      <LogoContainer to="/home">
        <LogoImage src={Logo} alt="Logo" collapsed={isCollapsed} />
      </LogoContainer>

      <ToggleButton onClick={toggleNav}>
        <FaBars />
      </ToggleButton>

      {/* Home */}
      <NavItem 
        to="/home" 
        exact 
        collapsed={isCollapsed} 
        isActive={activeTab === '/home'} 
        onClick={() => handleTabClick('/home')}
      >
        <NavIcon collapsed={isCollapsed}>
          <FaHome />
        </NavIcon>
        {!isCollapsed && 'Home'}
      </NavItem>
      
      {/* Report */}
      <NavItem 
        as="div" 
        onClick={() => {
          handleTabClick('report');
          setIsReportOpen(!isReportOpen);
        }} 
        collapsed={isCollapsed} 
        isActive={activeTab === 'report'}
      >
        <NavIcon collapsed={isCollapsed}>
          <FaFileAlt />
        </NavIcon>
        {!isCollapsed && 'Report'}
        <FaCaretDown style={{ marginLeft: 'auto' }} />
      </NavItem>
      <SubMenu isOpen={isReportOpen} collapsed={isCollapsed}>
        <SubMenuItem 
          to="/report/deals" 
          collapsed={isCollapsed} 
          isActive={activeTab === '/report/deals'} 
          onClick={() => handleTabClick('/report/deals')}
        >
          <FaBriefcase style={{ marginRight: '10px' }} /> Deals
        </SubMenuItem>

        <SubMenuItem 
          to="/report/FinancialYear" 
          collapsed={isCollapsed} 
          isActive={activeTab === '/report/FinancialYear'} 
          onClick={() => handleTabClick('/report/FinancialYear')}
        >
          <FaFileAlt style={{ marginRight: '10px' }} /> Financial Year
        </SubMenuItem>
      </SubMenu>

      {/* Opportunity Creation */}
      <NavItem 
        as="div" 
        onClick={() => {
          handleTabClick('opportunity');
          setIsOpportunityOpen(!isOpportunityOpen);
        }} 
        collapsed={isCollapsed} 
        isActive={activeTab === 'opportunity'}
      >
        <NavIcon collapsed={isCollapsed}>
          <FaFunnelDollar />
        </NavIcon>
        {!isCollapsed && 'Opportunity Creation'}
        <FaCaretDown style={{ marginLeft: 'auto' }} />
      </NavItem>
      <SubMenu isOpen={isOpportunityOpen} collapsed={isCollapsed}>
        <SubMenuItem 
          to="/opportunity/deals-owner" 
          collapsed={isCollapsed} 
          isActive={activeTab === '/opportunity/deals-owner'} 
          onClick={() => handleTabClick('/opportunity/deals-owner')}
        >
          <FaTable style={{ marginRight: '10px' }} /> Deals Owner
        </SubMenuItem>
        <SubMenuItem 
          to="/opportunity/customer-details" 
          collapsed={isCollapsed} 
          isActive={activeTab === '/opportunity/customer-details'} 
          onClick={() => {
            handleTabClick('/opportunity/customer-details');
            setIsCustomerDetailsOpen(!isCustomerDetailsOpen);
          }}
        >
          <FaBuilding style={{ marginRight: '10px' }} /> Customer Details
          <FaCaretDown style={{ marginLeft: 'auto' }} />
        </SubMenuItem>
        <SubMenu isOpen={isCustomerDetailsOpen} collapsed={isCollapsed}>
          <SubMenuItem 
            to="/opportunity/customer-details/organization-details" 
            collapsed={isCollapsed} 
            isActive={activeTab === '/opportunity/customer-details/organization-details'} 
            onClick={() => handleTabClick('/opportunity/customer-details/organization-details')}
          >
            <FaBuilding style={{ marginRight: '10px' }} /> Organization Details
          </SubMenuItem>
          <SubMenuItem 
            to="/opportunity/customer-details/contact-details" 
            collapsed={isCollapsed} 
            isActive={activeTab === '/opportunity/customer-details/contact-details'} 
            onClick={() => handleTabClick('/opportunity/customer-details/contact-details')}
          >
            <FaUser style={{ marginRight: '10px' }} /> Contact Details
          </SubMenuItem>
        </SubMenu>
        <SubMenuItem 
          to="/opportunity/opportunity-details" 
          collapsed={isCollapsed} 
          isActive={activeTab === '/opportunity/opportunity-details'} 
          onClick={() => handleTabClick('/opportunity/opportunity-details')}
        >
          <FaInfoCircle style={{ marginRight: '10px' }} /> Opportunity Details
        </SubMenuItem>
      </SubMenu>

      {/* Charts */}
      <NavItem 
        as="div" 
        onClick={() => {
          handleTabClick('charts');
          setIsChartsOpen(!isChartsOpen);
        }} 
        collapsed={isCollapsed} 
        isActive={activeTab === 'charts'}
      >
        <NavIcon collapsed={isCollapsed}>
          <FaChartBar />
        </NavIcon>
        {!isCollapsed && 'Charts'}
        <FaCaretDown style={{ marginLeft: 'auto' }} />
      </NavItem>
      <SubMenu isOpen={isChartsOpen} collapsed={isCollapsed}>
        <SubMenuItem 
          to="/charts/SalesFunnel" 
          collapsed={isCollapsed} 
          isActive={activeTab === '/charts/SalesFunnel'} 
          onClick={() => handleTabClick('/charts/SalesFunnel')}
        >
          <FaFunnelDollar style={{ marginRight: '10px' }} /> Funnel
        </SubMenuItem>
        <SubMenuItem 
          to="/charts/barchart" 
          collapsed={isCollapsed} 
          isActive={activeTab === '/charts/barchart'} 
          onClick={() => handleTabClick('/charts/barchart')}
        >
          <FaChartBar style={{ marginRight: '10px' }} /> Barchart
        </SubMenuItem>
      </SubMenu>


      {/* Settings */}
      <NavItem 
        to="/settings" 
        collapsed={isCollapsed} 
        isActive={activeTab === '/settings'} 
        onClick={() => handleTabClick('/settings')}
      >
        <NavIcon collapsed={isCollapsed}>
          <FaCog />
        </NavIcon>
        {!isCollapsed && 'Settings'}
      </NavItem>

      {/* Import */}
      <NavItem 
        to="/import" 
        collapsed={isCollapsed} 
        isActive={activeTab === '/import'} 
        onClick={() => handleTabClick('/import')}
      >
        <NavIcon collapsed={isCollapsed}>
          <FaFileImport />
        </NavIcon>
        {!isCollapsed && 'Import'}
      </NavItem>

      {/* Logout as NavItem */}
      <NavItem 
        to="/" 
        collapsed={isCollapsed} 
        onClick={handleLogout}
      >
        <NavIcon collapsed={isCollapsed}>
          <FaSignOutAlt />
        </NavIcon>
        {!isCollapsed && 'Logout'}
      </NavItem>
    </SideNavContainer>
  );
};

export default SideNav;
