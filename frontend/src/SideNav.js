import React, { useState, useEffect } from 'react';
import { FaBars, FaCaretDown, FaUser, FaEye, FaPlus,FaExchangeAlt,FaCogs,FaHistory ,FaTimes,FaCalendarAlt,
  FaSync, FaExclamationCircle, FaCircleNotch, FaBell , FaPaperPlane, FaTachometerAlt, FaProjectDiagram, FaArrowUp , FaCube, FaChartLine, FaBalanceScale ,
  FaTools, FaBook, FaFileImport,FaFileExport, FaCreditCard, FaMobileAlt, FaSignOutAlt, FaCloud,FaUserTag,FaSlidersH,FaLock,FaUserLock, FaUsers, FaUserTie , FaFilePdf
  } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './images/logo3.png';
 
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { TiContacts } from "react-icons/ti";
import { BsBuildingsFill } from "react-icons/bs";
import { IoFunnelOutline } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { PiQuotesBold } from "react-icons/pi";
import { MdAutoAwesomeMotion } from "react-icons/md";
import { MdCampaign } from "react-icons/md";
import { RiFileList3Fill } from "react-icons/ri";
import { MdMarkEmailUnread } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { LiaCalendarAlt } from "react-icons/lia";
import { FcTodoList } from "react-icons/fc";
import { PiAlarmBold } from "react-icons/pi";
import { DiGoogleAnalytics } from "react-icons/di";
import { MdPointOfSale } from "react-icons/md";
import { RiCustomerServiceLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
 
// Styled-components
const SideNavContainer = styled.div`
  position: fixed;
  top: 3;
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
  const[customer,setcustomer]= useState(false);
  const[organisation,setorganisation]= useState(false);
  const[contacts,setcontacts]= useState(false);
  const[opportunity,setopportunity]= useState(false);
  const[prospects,setprospects]= useState(false);
  const[lead,setlead]= useState(false);
  const[expo,setexpo]= useState(false);
  const[sales,setsales]= useState(false);
  const[quotes,setquotes]= useState(false);
  const[marketing,setmarketing]= useState(false);
  const[campaign,setcampaign]= useState(false);
  //const[marketinglist,setmarketinglist]= useState(false);
  const[email,setemail]= useState(false);
  const[support,setsupport]= useState(false);
  const[base,setbase]= useState(false);
  const[task,settask]= useState(false);
  const[calendar,setcalendar]= useState(false);
  const[list,setlist]= useState(false);
  const[reminders,setreminders]= useState(false);
  const[analytics,setanalytics]= useState(false);
  const[dashboard,setdashboard]= useState(false);
  const[salesreport,setsalesreport]= useState(false);
  const[customerreports,setcustomerreports]= useState(false);
  const[marketingreports,setmarketingreports]= useState(false);
  const[integration,setintegration]= useState(false);
  const[emailint,setemailint]= useState(false);
  const[tools,settools]= useState(false);
  const[data,setdata]= useState(false);
  const[setting,setsetting]= useState(false);
  const[user,setuser]= useState(false);
  const[config,setconfig]= useState(false);
  const[security,setsecurity]= useState(false);
  const[crm,setcrm]= useState(false);
  const[access,setaccess]= useState(false);
  const[notify,setnotify]= useState(false);
  const[offline,setoffline]= useState(false);
  const[admin,setadmin]= useState(false);
  const[handleLogout,sethandleLogout]= useState(false);
  const [activeTab, setActiveTab] = useState('/');
 
  useEffect(() => {
    if (isCollapsed) {  
      setcustomer(false);
      setorganisation(false);
      setcontacts(false);
      setopportunity(false);
      setprospects(false);
      setlead(false);
      setexpo(false);
      setsales(false);
      setquotes(false);
      setmarketing(false);
      setcampaign(false);
      //setmarketinglist(false);
      setemail(false);
      setsupport(false);
      setbase(false);
      settask(false);
      setcalendar(false);
      setlist(false);
      setreminders(false);
      setanalytics(false);
      setdashboard(false);
      setsalesreport(false);
      setcustomerreports(false);
      setmarketingreports(false);
      setintegration(false);
      setemailint(false);
      settools(false);
      setdata(false);
      setsetting(false);
      setuser(false);
      setconfig(false);
      setsecurity(false);
      setcrm(false);
      setaccess(false);
      setnotify(false);
      setoffline(false);
      setadmin(false);
      sethandleLogout(false);
 
    }
  }, [isCollapsed]);
 
  const handleTabClick = (path) => {
    setActiveTab(path);
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
     
          {/* Dashboard */}
    <NavItem
            to="/home"
            exact
            collapsed={isCollapsed}
            isActive={activeTab === '/'}
            onClick={() => handleTabClick('/')}
    >
    <NavIcon collapsed={isCollapsed}>
    {/* <FaHome /> */} <MdOutlineDashboardCustomize />
    </NavIcon>
            {!isCollapsed && 'Dashboard'}
    </NavItem>
   
    {/* customer management */}
   
    <NavItem
            as="div"
            onClick={() => {
              handleTabClick('Customer');
              setcustomer(!customer);
            }}
            collapsed={isCollapsed}
            isActive={activeTab === 'Customer'}
    >
    <NavIcon collapsed={isCollapsed}>
    <RiCustomerService2Fill />
    </NavIcon>
            {!isCollapsed && 'Customer'}
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </NavItem>
    <SubMenu isOpen={customer} collapsed={isCollapsed}>
   
   
    {/* customermanagement -> contacts */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setcontacts(!contacts);
              }}
    >
    <TiContacts  style={{ marginRight: '10px' }} /> Contacts
   
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={contacts} collapsed={isCollapsed}>
   
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaPlus style={{ marginRight: '10px' }} />New
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCogs style={{ marginRight: '10px' }} />Manage  
    </SubMenuItem>
   
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaExchangeAlt style={{ marginRight: '10px' }} />Import/ Export
    </SubMenuItem>
   
   
    </SubMenu>
   
    {/* customermanagement -> organisation */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setorganisation(!organisation);
              }}
    >
    <BsBuildingsFill  style={{ marginRight: '10px' }} /> Organisation
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={organisation} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaPlus style={{ marginRight: '10px' }} />New
    </SubMenuItem>
   
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaEye style={{ marginRight: '10px' }} /> View
    </SubMenuItem>
   
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaExchangeAlt style={{ marginRight: '10px' }} />Export/Import
    </SubMenuItem>
   
    </SubMenu>
   
    {/* customermanagement -> interaction history  phase 2*/}
   
    </SubMenu>
    {/* Prospectus  */}
   
   
    <NavItem
            as="div"
            onClick={() => {
              handleTabClick('Prospects');
              setprospects(!prospects);
            }}
            collapsed={isCollapsed}
            isActive={activeTab === 'Prospects'}
    >
    <NavIcon collapsed={isCollapsed}>
    < FaFilePdf  />
    </NavIcon>
            {!isCollapsed && 'Prospects'}
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </NavItem>
    <SubMenu isOpen={prospects} collapsed={isCollapsed}>
   
   
    {/* Prospectus -> Lead */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setlead(!lead);
              }}
    >
    <FaUserTie  style={{ marginRight: '10px' }} /> Lead
   
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={lead} collapsed={isCollapsed}>
   
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaPlus style={{ marginRight: '10px' }} />New
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCogs style={{ marginRight: '10px' }} />Manage  
    </SubMenuItem>
   
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaExchangeAlt style={{ marginRight: '10px' }} />Import/ Export
    </SubMenuItem>
   
   
    </SubMenu>
   
    {/* Prospectus -> Expo/events */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setexpo(!expo);
              }}
    >
    <BsBuildingsFill  style={{ marginRight: '10px' }} /> Expo/ Events
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={expo} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaPlus style={{ marginRight: '10px' }} />New
    </SubMenuItem>
   
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCogs style={{ marginRight: '10px' }} /> Manage
    </SubMenuItem>
   
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaExchangeAlt style={{ marginRight: '10px' }} />Export/Import
    </SubMenuItem>
   
    </SubMenu>
   
    </SubMenu>
   
   
   
    {/* opportunity management  */}
    <NavItem
            as="div"
            onClick={() => {
              handleTabClick('Opportunity');
              setopportunity(!opportunity);
            }}
            collapsed={isCollapsed}
            isActive={activeTab === 'Opportunity'}
    >
    <NavIcon collapsed={isCollapsed}>
    <IoFunnelOutline />
    </NavIcon>
            {!isCollapsed && 'Opportunity '}
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </NavItem>
    <SubMenu isOpen={opportunity} collapsed={isCollapsed}>
   
    <SubMenuItem
                to="/opportunitymanagement/new"
                collapsed={isCollapsed}
                isActive={activeTab === '/opportunitymanagement/new'}
                onClick={() => handleTabClick('/opportunitymanagement/new')}
    >
    <FaPlus style={{ marginRight: '10px' }} />New
    </SubMenuItem>
   
    <SubMenuItem
                to="/report/deals"
                collapsed={isCollapsed}
                isActive={activeTab === '/report/deals'}
                onClick={() => handleTabClick('/report/deals')}
    >
    <FaCogs style={{ marginRight: '10px' }} />Manage  
    </SubMenuItem>
   
    <SubMenuItem
                to="/import"
                collapsed={isCollapsed}
                isActive={activeTab === '/import'}
                onClick={() => handleTabClick('/import')}
    >
    <FaExchangeAlt style={{ marginRight: '10px' }} />Import
    </SubMenuItem>
   
   
   
   
    </SubMenu>
   
    {/* Task and Activity Management */}
   
    <NavItem
            as="div"
            onClick={() => {
              handleTabClick('Task');
              settask(!task);
            }}
            collapsed={isCollapsed}
            isActive={activeTab === 'Task'}
    >
    <NavIcon collapsed={isCollapsed}>
    <BiTask />
    </NavIcon>
            {!isCollapsed && 'Task '}
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </NavItem>
    <SubMenu isOpen={task} collapsed={isCollapsed}>
   
   
    {/* Task and Activity Management -> calendar*/}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setcalendar(!calendar);
              }}
    >
    <LiaCalendarAlt  style={{ marginRight: '10px' }} /> calendar
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={calendar} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaEye style={{ marginRight: '10px' }} /> View
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCalendarAlt  style={{ marginRight: '10px' }} />Schedule
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaSync   style={{ marginRight: '10px' }} />Sync
    </SubMenuItem>
    </SubMenu>
   
    {/* Task and Activity Management -> To Do List */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setlist(!list);
              }}
    >
    <FcTodoList  style={{ marginRight: '10px' }} /> To Do List
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={list} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaEye style={{ marginRight: '10px' }} /> View
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaPlus style={{ marginRight: '10px' }} /> New
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaExclamationCircle style={{ marginRight: '10px' }} />Set Priorities
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCircleNotch style={{ marginRight: '10px' }} />Track Progress
    </SubMenuItem>
   
    </SubMenu>
   
    {/* Task and Activity Management -> Reminders*/}
   
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setreminders(!reminders);
              }}
    >
    <PiAlarmBold  style={{ marginRight: '10px' }} /> Reminders
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={reminders} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaBell   style={{ marginRight: '10px' }} /> Set Reminders
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaEye style={{ marginRight: '10px' }} />View  Reminders
    </SubMenuItem>
    </SubMenu>
    </SubMenu>
   
   
    {/* Sales management */}
    <NavItem
            as="div"
            onClick={() => {
              handleTabClick('Sales');
              setsales(!sales);
            }}
            collapsed={isCollapsed}
            isActive={activeTab === 'Sales'}
    >
    <NavIcon collapsed={isCollapsed}>
    <FaMoneyBillTrendUp />
    </NavIcon>
            {!isCollapsed && 'Sales '}
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </NavItem>
    <SubMenu isOpen={sales} collapsed={isCollapsed}>
   
   
    {/* Sales Management -> Quotes and Proposals*/}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setquotes(!quotes);
              }}
    >
    <PiQuotesBold  style={{ marginRight: '10px' }} /> Quotes
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={quotes} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaPlus style={{ marginRight: '10px' }} /> New
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaEye style={{ marginRight: '10px' }} /> View
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaPaperPlane style={{ marginRight: '10px' }} />Send
    </SubMenuItem>
    </SubMenu>
    </SubMenu>
   
    {/* Marketing Automation */}
   
    <NavItem
            as="div"
            onClick={() => {
              handleTabClick('Marketing ');
              setmarketing(!marketing);
            }}
            collapsed={isCollapsed}
            isActive={activeTab === 'Marketing '}
    >
    <NavIcon collapsed={isCollapsed}>
    <MdAutoAwesomeMotion />
    </NavIcon>
            {!isCollapsed && 'Marketing '}
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </NavItem>
    <SubMenu isOpen={marketing} collapsed={isCollapsed}>
   
   
    {/* Marketing Automation -> Campaign Management */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setcampaign(!campaign);
              }}
    >
    <MdCampaign  style={{ marginRight: '10px' }} /> Campaign
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={campaign} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaEye style={{ marginRight: '10px' }} /> View  
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaPlus style={{ marginRight: '10px' }} /> New
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCalendarAlt  style={{ marginRight: '10px' }} />Schedule
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaTachometerAlt style={{ marginRight: '10px' }} />  Performance
    </SubMenuItem>
   
    </SubMenu>
   
    {/* Marketing Automation -> Markeeting List */}
    <SubMenuItem
              to="'/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setlist(!list);
              }}
    >
    <RiFileList3Fill  style={{ marginRight: '10px' }} /> Marketing List
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={list} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCogs style={{ marginRight: '10px' }} /> Create and Manage  
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaExchangeAlt style={{ marginRight: '10px' }} />Import/Export  
    </SubMenuItem>
    </SubMenu>
   
    {/* Marketing Automation ->Email Marketing */}
   
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setemail(!email);
              }}
    >
    <MdMarkEmailUnread  style={{ marginRight: '10px' }} /> Email Marketing
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={email} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaPlus style={{ marginRight: '10px' }} />Create
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaPaperPlane style={{ marginRight: '10px' }} /> Send  
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaEye style={{ marginRight: '10px' }} /> View  
    </SubMenuItem>
    </SubMenu>
    </SubMenu>
   
   
   
   
    {/* Reports & Analytics */}
   
    <NavItem
            as="div"
            onClick={() => {
              handleTabClick('Reports & Analytics');
              setanalytics(!analytics);
            }}
            collapsed={isCollapsed}
            isActive={activeTab === 'Reports & Analytics'}
    >
    <NavIcon collapsed={isCollapsed}>
    <DiGoogleAnalytics />
    </NavIcon>
            {!isCollapsed && 'Reports'}
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </NavItem>
    <SubMenu isOpen={analytics} collapsed={isCollapsed}>
   
   
    {/* Reports & Analytics -> Reports dashboard */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setdashboard(!dashboard);
              }}
    >
    <TbReportAnalytics  style={{ marginRight: '10px' }} />  Dashboard
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={dashboard} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaEye style={{ marginRight: '10px' }} /> View
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCogs style={{ marginRight: '10px' }} />Customize
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCalendarAlt  style={{ marginRight: '10px' }} />Schedule
    </SubMenuItem>
    </SubMenu>
    {/* Reports & Analytics -> Sales report */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setsalesreport(!salesreport);
              }}
    >
    <MdPointOfSale  style={{ marginRight: '10px' }} /> Sales
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={salesreport} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaProjectDiagram style={{ marginRight: '10px' }} /> Pipeline
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaUser style={{ marginRight: '10px' }} />Forcasting
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaTimes  style={{ marginRight: '10px' }} />Closed
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaTachometerAlt style={{ marginRight: '10px' }} />Rep Performance
    </SubMenuItem>
   
    </SubMenu>
   
    {/* Reports & Analytics -> CustomerReports  */}
   
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setcustomerreports(!customerreports);
              }}
    >
    <RiCustomerServiceLine  style={{ marginRight: '10px' }} /> Customer
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={customerreports} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCogs style={{ marginRight: '10px' }} /> Segmentation
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaArrowUp   style={{ marginRight: '10px' }} />Growth
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCube style={{ marginRight: '10px' }} />Churn rate
    </SubMenuItem>
   
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaHistory style={{ marginRight: '10px' }} />History
    </SubMenuItem>
    </SubMenu>
    {/* Reports & Analytics -> Marketing Reports  */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setmarketingreports(!marketingreports);
              }}
    >
    <TbReportAnalytics  style={{ marginRight: '10px' }} />  Marketing
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={marketingreports} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaTachometerAlt style={{ marginRight: '10px' }} /> Performance
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaChartLine  style={{ marginRight: '10px' }} />Analysis
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaBalanceScale  style={{ marginRight: '10px' }} />ROI
    </SubMenuItem>
    </SubMenu>
   
   
    </SubMenu>
   
   
   
   
   
    {/* Settings & administration */}
   
    <NavItem
            as="div"
            onClick={() => {
              handleTabClick('Settings & Administration');
              setsetting(!setting);
            }}
            collapsed={isCollapsed}
            isActive={activeTab === 'Settings & Administration'}
    >
    <NavIcon collapsed={isCollapsed}>
    <MdOutlineSupportAgent />
    </NavIcon>
            {!isCollapsed && 'Settings & Administration'}
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </NavItem>
    <SubMenu isOpen={setting} collapsed={isCollapsed}>
     {/*  Settings & administration -> intergration */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setintegration(!integration);
              }}
    >
    <FaProjectDiagram   style={{ marginRight: '10px' }} /> Integration
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    {/*  Settings & administration -> intergration ->email */}
    <SubMenu isOpen={integration} collapsed={isCollapsed}>
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setemailint(!emailint);
              }}
    >
    <FaPaperPlane   style={{ marginRight: '10px' }} /> Email
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={emailint} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaSync  style={{ marginRight: '10px' }} />Sync
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCogs style={{ marginRight: '10px' }} />Manage
    </SubMenuItem>
   
    </SubMenu>
    {/*  Settings & administration -> intergration ->tools */}
   
   
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                settools(!tools);
              }}
    >
    <FaTools  style={{ marginRight: '10px' }} /> Tools
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={tools} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaUser style={{ marginRight: '10px' }} />Marketing Tools
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCreditCard style={{ marginRight: '10px' }} />Paymemt Gateways
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCogs style={{ marginRight: '10px' }} />API Management
    </SubMenuItem>
    </SubMenu>
   
   
    {/*  Settings & administration -> intergration -> export-import */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setdata(!data);
              }}
    >
    <FaExchangeAlt  style={{ marginRight: '10px' }} /> Import/Export
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
   
   
    <SubMenu isOpen={data} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaFileImport style={{ marginRight: '10px' }} />Import
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaFileExport style={{ marginRight: '10px' }} />Export
    </SubMenuItem>
    </SubMenu>
    </SubMenu>
   
   
    {/* System & administration -> Support & Service Management */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setsupport(!support);
              }}
    >
    <RiCustomerService2Fill  style={{ marginRight: '10px' }} /> Support
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={support} collapsed={isCollapsed}>
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setbase(!base);
              }}
    >
    <FaBook  style={{ marginRight: '10px' }} /> Knowledge Base
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
   
    <SubMenu isOpen={base} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaEye style={{ marginRight: '10px' }} />View
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaUser style={{ marginRight: '10px' }} />Add
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCogs style={{ marginRight: '10px' }} />Manage
    </SubMenuItem>
   
    </SubMenu>
   
   
   
    </SubMenu>
   
     {/*  Settings & administration -> mobile */}
     <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setcrm(!crm);
              }}
    >
    <FaMobileAlt  style={{ marginRight: '10px' }} /> Mobile App
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    {/*  Settings & administration -> mobile ->quickaccess */}
    <SubMenu isOpen={crm} collapsed={isCollapsed}>
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setaccess(!access);
              }}
    >
    <MdOutlineDashboardCustomize  style={{ marginRight: '10px' }} /> Dashboard
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={access} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaEye style={{ marginRight: '10px' }} />View
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaSync  style={{ marginRight: '10px' }} />Sync
    </SubMenuItem>
   
    </SubMenu>
    {/*  Settings & administration -> mobile ->notification */}
   
   
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setnotify(!notify);
              }}
    >
    <FaBell  style={{ marginRight: '10px' }} /> Notifications
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={notify} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaExclamationCircle style={{ marginRight: '10px' }} />Push Notifications
    </SubMenuItem>
    </SubMenu>
   
   
    {/*  Settings & administration -> mobile -> offline */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setoffline(!offline);
              }}
    >
    <FaCloud  style={{ marginRight: '10px' }} /> Offline Access
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
   
   
    <SubMenu isOpen={offline} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaUser style={{ marginRight: '10px' }} />Access
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaSync  style={{ marginRight: '10px' }} />Sync
    </SubMenuItem>
    </SubMenu>
    </SubMenu>
   
    {/* settings & administration -> admin */}
   
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setadmin(!admin);
              }}
    >
    <FaUsers  style={{ marginRight: '10px' }} /> Administration
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    {/*  Settings & administration -> admin ->user */}
    <SubMenu isOpen={admin} collapsed={isCollapsed}>
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setuser(!user);
              }}
    >
    <FaUser  style={{ marginRight: '10px' }} /> User
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={user} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaPlus style={{ marginRight: '10px' }} />Add/Remove
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaUserTag style={{ marginRight: '10px' }} />Assign Role
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCogs style={{ marginRight: '10px' }} />Manage Teams
    </SubMenuItem>
   
    </SubMenu>
    {/*  Settings & administration -> admin ->configuration */}
   
   
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setconfig(!config);
              }}
    >
    <FaCogs  style={{ marginRight: '10px' }} /> Configuration
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
    <SubMenu isOpen={config} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaTools style={{ marginRight: '10px' }} />Settings
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCogs style={{ marginRight: '10px' }} />Customize
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaSlidersH style={{ marginRight: '10px' }} />Set-up Rules
    </SubMenuItem>
    </SubMenu>
   
   
    {/*  Settings & administration -> admin -> Security */}
    <SubMenuItem
              to="/underconstruction"
              collapsed={isCollapsed}
              isActive={activeTab === '/underconstruction'}
              onClick={() => {
                handleTabClick('/underconstruction');
                setsecurity(!security);
              }}
    >
    <FaLock  style={{ marginRight: '10px' }} /> Security
    <FaCaretDown style={{ marginLeft: 'auto' }} />
    </SubMenuItem>
   
   
    <SubMenu isOpen={security} collapsed={isCollapsed}>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaUser style={{ marginRight: '10px' }} />Configure
    </SubMenuItem>
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaUserLock style={{ marginRight: '10px' }} />Data Access
    </SubMenuItem>
   
    <SubMenuItem
                to="/underconstruction"
                collapsed={isCollapsed}
                isActive={activeTab === '/underconstruction'}
                onClick={() => handleTabClick('/underconstruction')}
    >
    <FaCogs style={{ marginRight: '10px' }} />Manage
    </SubMenuItem>
    </SubMenu>
    </SubMenu>
   
    </SubMenu>
   
   
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