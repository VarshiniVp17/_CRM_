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
  width: ${props => props.collapsed ? '100px' : '300px'};  // Increase collapsed and expanded width
  height: 100vh;
  background-color: #0e1954;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.collapsed ? 'center' : 'flex-start'};
  padding-top: 60px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  transition: width 0.2s ease;
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
          to="/customermanagement/contacts"
          collapsed={isCollapsed}
          isActive={activeTab === '/customermanagement/contacts'}
          onClick={() => {
            handleTabClick('/customermanagement/contacts');
            setcontacts(!contacts);
          }}
>
<TiContacts  style={{ marginRight: '10px' }} /> Contacts

<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={contacts} collapsed={isCollapsed}>

<SubMenuItem
            to="/customermanagement/contacts/new"
            collapsed={isCollapsed}
            isActive={activeTab === '/customermanagement/contacts/new'}
            onClick={() => handleTabClick('/customermanagement/contacts/new')}
>
<FaPlus style={{ marginRight: '10px' }} />New 
</SubMenuItem>
<SubMenuItem
            to="/customermanagement/contacts/manage"
            collapsed={isCollapsed}
            isActive={activeTab === '/customermanagement/contacts/manage'}
            onClick={() => handleTabClick('/customermanagement/contacts/manage')}
>
<FaCogs style={{ marginRight: '10px' }} />Manage  
</SubMenuItem>

<SubMenuItem
            to="/customermanagement/contacts/import-export"
            collapsed={isCollapsed}
            isActive={activeTab === '/customermanagement/contacts/import-export'}
            onClick={() => handleTabClick('/customermanagement/contacts/import-export')}
>
<FaExchangeAlt style={{ marginRight: '10px' }} />Import/ Export 
</SubMenuItem>


</SubMenu>

{/* customermanagement -> organisation */}
<SubMenuItem
          to="/customermanagement/organisation"
          collapsed={isCollapsed}
          isActive={activeTab === '/customermanagement/organisation'}
          onClick={() => {
            handleTabClick('/customermanagement/organisation');
            setorganisation(!organisation);
          }}
>
<BsBuildingsFill  style={{ marginRight: '10px' }} /> Organisation
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={organisation} collapsed={isCollapsed}>
<SubMenuItem
            to="/customermanagement/organisation/new"
            collapsed={isCollapsed}
            isActive={activeTab === '/customermanagement/organisation/new'}
            onClick={() => handleTabClick('/customermanagement/organisation/new')}
>
<FaPlus style={{ marginRight: '10px' }} />New 
</SubMenuItem>

<SubMenuItem
            to="/customermanagement/organisation/view"
            collapsed={isCollapsed}
            isActive={activeTab === '/customermanagement/organisation/view'}
            onClick={() => handleTabClick('/customermanagement/organisation/view')}
>
<FaEye style={{ marginRight: '10px' }} /> View 
</SubMenuItem>

<SubMenuItem
            to="/customermanagement/organisation/import-export"
            collapsed={isCollapsed}
            isActive={activeTab === '/customermanagement/organisation/import-export'}
            onClick={() => handleTabClick('/customermanagement/organisation/import-export')}
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
          to="/prospectus/lead"
          collapsed={isCollapsed}
          isActive={activeTab === '/prospectus/lead'}
          onClick={() => {
            handleTabClick('/prospectus/lead');
            setlead(!lead);
          }}
>
<FaUserTie  style={{ marginRight: '10px' }} /> Lead

<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={lead} collapsed={isCollapsed}>

<SubMenuItem
            to="/prospectus/lead/new"
            collapsed={isCollapsed}
            isActive={activeTab === '/prospectus/lead//new'}
            onClick={() => handleTabClick('/prospectus/lead/new')}
>
<FaPlus style={{ marginRight: '10px' }} />New 
</SubMenuItem>
<SubMenuItem
            to="/prospectus/lead/manage"
            collapsed={isCollapsed}
            isActive={activeTab === '/prospectus/lead/manage'}
            onClick={() => handleTabClick('/prospectus/lead/manage')}
>
<FaCogs style={{ marginRight: '10px' }} />Manage  
</SubMenuItem>

<SubMenuItem
            to="/prospectus/lead/import-export"
            collapsed={isCollapsed}
            isActive={activeTab === '/prospectus/lead/import-export'}
            onClick={() => handleTabClick('/prospectus/lead/import-export')}
>
<FaExchangeAlt style={{ marginRight: '10px' }} />Import/ Export 
</SubMenuItem>


</SubMenu>

{/* Prospectus -> Expo/events */}
<SubMenuItem
          to="/prospectus/expo"
          collapsed={isCollapsed}
          isActive={activeTab === '/prospectus/expo'}
          onClick={() => {
            handleTabClick('/prospectus/expo');
            setexpo(!expo);
          }}
>
<BsBuildingsFill  style={{ marginRight: '10px' }} /> Expo/ Events
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={expo} collapsed={isCollapsed}>
<SubMenuItem
            to="/prospectus/expo/new"
            collapsed={isCollapsed}
            isActive={activeTab === '/prospectus/expo/new'}
            onClick={() => handleTabClick('/prospectus/expo/new')}
>
<FaPlus style={{ marginRight: '10px' }} />New 
</SubMenuItem>

<SubMenuItem
            to="/prospectus/expo/manage"
            collapsed={isCollapsed}
            isActive={activeTab === '/prospectus/expo/manage'}
            onClick={() => handleTabClick('/prospectus/expo/manage')}
>
<FaCogs style={{ marginRight: '10px' }} /> Manage
</SubMenuItem>

<SubMenuItem
            to="/prospectus/expo/import-export"
            collapsed={isCollapsed}
            isActive={activeTab === '/prospectus/expo/import-export'}
            onClick={() => handleTabClick('/prospectus/expo/import-export')}
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
          to="/reports/dashboard"
          collapsed={isCollapsed}
          isActive={activeTab === '/reports/dashboard'}
          onClick={() => {
            handleTabClick('/reports/dashboard');
            setdashboard(!dashboard);
          }}
>
<TbReportAnalytics  style={{ marginRight: '10px' }} />  Dashboard
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={dashboard} collapsed={isCollapsed}>
<SubMenuItem
            to="/reports/dashboard/view"
            collapsed={isCollapsed}
            isActive={activeTab === '/reports/dashboard/view'}
            onClick={() => handleTabClick('/reports/dashboard/view')}
>
<FaEye style={{ marginRight: '10px' }} /> View 
</SubMenuItem>
<SubMenuItem
            to="/reports/dashboard/customize"
            collapsed={isCollapsed}
            isActive={activeTab === '/reports/dashboard/customize'}
            onClick={() => handleTabClick('/reports/dashboard/customize')}
>
<FaCogs style={{ marginRight: '10px' }} />Customize
</SubMenuItem>
<SubMenuItem
            to="/reports/dashboard/schedule"
            collapsed={isCollapsed}
            isActive={activeTab === '/reports/dashboard/schedule'}
            onClick={() => handleTabClick('/reports/dashboard/schedule')}
>
<FaCalendarAlt  style={{ marginRight: '10px' }} />Schedule
</SubMenuItem>
</SubMenu>

{/* Reports & Analytics -> Sales report */}
<SubMenuItem
          to="/reports/sales"
          collapsed={isCollapsed}
          isActive={activeTab === '/reports/sales'}
          onClick={() => {
            handleTabClick('/reports/sales');
            setsalesreport(!salesreport);
          }}
>
<MdPointOfSale  style={{ marginRight: '10px' }} /> Sales
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={salesreport} collapsed={isCollapsed}>
<SubMenuItem
            to="/reports/sales/pipeline"
            collapsed={isCollapsed}
            isActive={activeTab === '/reports/sales/pipeline'}
            onClick={() => handleTabClick('/reports/sales/pipeline')}
>
<FaProjectDiagram style={{ marginRight: '10px' }} /> Pipeline 
</SubMenuItem>
<SubMenuItem
            to="/reports/sales/forecasting"
            collapsed={isCollapsed}
            isActive={activeTab === '/reports/sales/forecasting'}
            onClick={() => handleTabClick('/reports/sales/forecasting')}
>
<FaUser style={{ marginRight: '10px' }} />Forcasting
</SubMenuItem>
<SubMenuItem
            to="reports/sales/closed"
            collapsed={isCollapsed}
            isActive={activeTab === 'reports/sales/closed'}
            onClick={() => handleTabClick('reports/sales/closed')}
>
<FaTimes  style={{ marginRight: '10px' }} />Closed
</SubMenuItem>
<SubMenuItem
            to="/reports/sales/rep"
            collapsed={isCollapsed}
            isActive={activeTab === '/reports/sales/rep'}
            onClick={() => handleTabClick('/reports/sales/rep')}
>
<FaTachometerAlt style={{ marginRight: '10px' }} />Rep Performance
</SubMenuItem>

</SubMenu>

{/* Reports & Analytics -> CustomerReports  */}

<SubMenuItem
          to="/reports/customer"
          collapsed={isCollapsed}
          isActive={activeTab === '/reports/customer'}
          onClick={() => {
            handleTabClick('/reports/customer');
            setcustomerreports(!customerreports);
          }}
>
<RiCustomerServiceLine  style={{ marginRight: '10px' }} /> Customer 
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={customerreports} collapsed={isCollapsed}>
<SubMenuItem
            to="/reports/customer/segment"
            collapsed={isCollapsed}
            isActive={activeTab === '/reports/customer/segment'}
            onClick={() => handleTabClick('/reports/customer/segment')}
>
<FaCogs style={{ marginRight: '10px' }} /> Segmentation
</SubMenuItem>
<SubMenuItem
            to="/reports/customer/growth"
            collapsed={isCollapsed}
            isActive={activeTab === '/reports/customer/growth'}
            onClick={() => handleTabClick('/reports/customer/growth')}
>
<FaArrowUp   style={{ marginRight: '10px' }} />Growth
</SubMenuItem>
<SubMenuItem
            to="/reports/customer/rate"
            collapsed={isCollapsed}
            isActive={activeTab === '/reports/customer/rate'}
            onClick={() => handleTabClick('/reports/customer/rate')}
>
<FaCube style={{ marginRight: '10px' }} />Churn rate
</SubMenuItem>

<SubMenuItem
            to="/reports/customer/history"
            collapsed={isCollapsed}
            isActive={activeTab === '/reports/customer/history'}
            onClick={() => handleTabClick('/reports/customer/history')}
>
<FaHistory style={{ marginRight: '10px' }} />History
</SubMenuItem>
</SubMenu>
{/* Reports & Analytics -> Marketing Reports  */}
<SubMenuItem
          to="/reports/marketing"
          collapsed={isCollapsed}
          isActive={activeTab === '/reports/marketing'}
          onClick={() => {
            handleTabClick('/reports/marketing');
            setmarketingreports(!marketingreports);
          }}
>
<TbReportAnalytics  style={{ marginRight: '10px' }} />  Marketing 
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={marketingreports} collapsed={isCollapsed}>
<SubMenuItem
            to="/reports/marketing/perform"
            collapsed={isCollapsed}
            isActive={activeTab === '/reports/marketing/perform'}
            onClick={() => handleTabClick('/reports/marketing/perform')}
>
<FaTachometerAlt style={{ marginRight: '10px' }} /> Performance 
</SubMenuItem>
<SubMenuItem
            to="/reports/marketing/analysis"
            collapsed={isCollapsed}
            isActive={activeTab === '/reports/marketing/analysis'}
            onClick={() => handleTabClick('/reports/marketing/analysis')}
>
<FaChartLine  style={{ marginRight: '10px' }} />Analysis
</SubMenuItem>
<SubMenuItem
            to="/reports/marketing/roi"
            collapsed={isCollapsed}
            isActive={activeTab === '/reports/marketing/roi'}
            onClick={() => handleTabClick('/reports/marketing/roi')}
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
          to="/settings/integration"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/integration'}
          onClick={() => {
            handleTabClick('/settings/integration');
            setintegration(!integration);
          }}
>
<FaProjectDiagram   style={{ marginRight: '10px' }} /> Integration
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
{/*  Settings & administration -> intergration ->email */}
<SubMenu isOpen={integration} collapsed={isCollapsed}>
<SubMenuItem
          to="/settings/integration/email"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/integration/email'}
          onClick={() => {
            handleTabClick('/settings/integration/email');
            setemailint(!emailint);
          }}
>
<FaPaperPlane   style={{ marginRight: '10px' }} /> Email
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={emailint} collapsed={isCollapsed}>
<SubMenuItem
            to="/settings/integration/email/sync"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/integration/email/sync'}
            onClick={() => handleTabClick('/settings/integration/email/sync')}
>
<FaSync  style={{ marginRight: '10px' }} />Sync
</SubMenuItem>
<SubMenuItem
            to="/settings/integration/email/manage"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/integration/email/manage'}
            onClick={() => handleTabClick('/settings/integration/email/manage')}
>
<FaCogs style={{ marginRight: '10px' }} />Manage
</SubMenuItem>

</SubMenu>
{/*  Settings & administration -> intergration ->tools */}


<SubMenuItem
          to="/settings/integration/tools"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/integration/tools'}
          onClick={() => {
            handleTabClick('/settings/integration/tools');
            settools(!tools);
          }}
>
<FaTools  style={{ marginRight: '10px' }} /> Tools
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={tools} collapsed={isCollapsed}>
<SubMenuItem
            to="/settings/integration/tools/marketing"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/integration/tools/marketing'}
            onClick={() => handleTabClick('/settings/integration/tools/marketing')}
>
<FaUser style={{ marginRight: '10px' }} />Marketing Tools
</SubMenuItem>
<SubMenuItem
            to="/settings/integration/tools/payment"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/integration/tools/payment'}
            onClick={() => handleTabClick('/settings/integration/tools/payment')}
>
<FaCreditCard style={{ marginRight: '10px' }} />Paymemt Gateways
</SubMenuItem>
<SubMenuItem
            to="/settings/integration/tools/api"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/integration/tools/api'}
            onClick={() => handleTabClick('/settings/integration/tools/api')}
>
<FaCogs style={{ marginRight: '10px' }} />API Management
</SubMenuItem>
</SubMenu>


{/*  Settings & administration -> intergration -> export-import */}
<SubMenuItem
          to="/settings/integration/export-import"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/integration/export-import'}
          onClick={() => {
            handleTabClick('/settings/integration/export-import');
            setdata(!data);
          }}
>
<FaExchangeAlt  style={{ marginRight: '10px' }} /> Import/Export
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>


<SubMenu isOpen={data} collapsed={isCollapsed}>
<SubMenuItem
            to="/settings/integration/export-import/import"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/integration/export-import/import'}
            onClick={() => handleTabClick('/settings/integration/export-import/import')}
>
<FaFileImport style={{ marginRight: '10px' }} />Import
</SubMenuItem>
<SubMenuItem
            to="/settings/integration/export-import/export"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/integration/export-import/export'}
            onClick={() => handleTabClick('/settings/integration/export-import/export')}
>
<FaFileExport style={{ marginRight: '10px' }} />Export
</SubMenuItem>
</SubMenu>
</SubMenu>


{/* System & administration -> Support & Service Management */}
<SubMenuItem
          to="/settings/support"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/support'}
          onClick={() => {
            handleTabClick('/settings/support');
            setsupport(!support);
          }}
>
<RiCustomerService2Fill  style={{ marginRight: '10px' }} /> Support
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={support} collapsed={isCollapsed}>
<SubMenuItem
          to="/settings/support/knowledge"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/support/knowledge'}
          onClick={() => {
            handleTabClick('/settings/support/knowledge');
            setbase(!base);
          }}
>
<FaBook  style={{ marginRight: '10px' }} /> Knowledge Base
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>

<SubMenu isOpen={base} collapsed={isCollapsed}>
<SubMenuItem
            to="/settings/support/knowledge/view"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/support/knowledge/view'}
            onClick={() => handleTabClick('/settings/support/knowledge/view')}
>
<FaEye style={{ marginRight: '10px' }} />View
</SubMenuItem>
<SubMenuItem
            to="/settings/support/knowledge/add"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/support/knowledge/add'}
            onClick={() => handleTabClick('/settings/support/knowledge/add')}
>
<FaUser style={{ marginRight: '10px' }} />Add
</SubMenuItem>
<SubMenuItem
            to="/settings/support/knowledge/manage"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/support/knowledge/manage'}
            onClick={() => handleTabClick('/settings/support/knowledge/manage')}
>
<FaCogs style={{ marginRight: '10px' }} />Manage
</SubMenuItem>

</SubMenu>



</SubMenu>

 {/*  Settings & administration -> mobile */}
 <SubMenuItem
          to="/settings/mobile"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/mobile'}
          onClick={() => {
            handleTabClick('/settings/mobile');
            setcrm(!crm);
          }}
>
<FaMobileAlt  style={{ marginRight: '10px' }} /> Mobile App
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
{/*  Settings & administration -> mobile ->quickaccess */}
<SubMenu isOpen={crm} collapsed={isCollapsed}>
<SubMenuItem
          to="/settings/mobile/dahboard"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/mobile/dahboard'}
          onClick={() => {
            handleTabClick('/settings/mobile/dahboard');
            setaccess(!access);
          }}
>
<MdOutlineDashboardCustomize  style={{ marginRight: '10px' }} /> Dashboard
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={access} collapsed={isCollapsed}>
<SubMenuItem
            to="/settings/mobile/dahboard/view"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/mobile/dahboard/View'}
            onClick={() => handleTabClick('/settings/mobile/dahboard/view')}
>
<FaEye style={{ marginRight: '10px' }} />View
</SubMenuItem>
<SubMenuItem
            to="/settings/mobile/dahboard/sync"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/mobile/dahboard/sync'}
            onClick={() => handleTabClick('/settings/mobile/dahboard/sync')}
>
<FaSync  style={{ marginRight: '10px' }} />Sync
</SubMenuItem>

</SubMenu>
{/*  Settings & administration -> mobile ->notification */}


<SubMenuItem
          to="/settings/mobile/notify"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/mobile/notify'}
          onClick={() => {
            handleTabClick('/settings/mobile/notify');
            setnotify(!notify);
          }}
>
<FaBell  style={{ marginRight: '10px' }} /> Notifications
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={notify} collapsed={isCollapsed}>
<SubMenuItem
            to="/settings/mobile/notify/push"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/mobile/notify/push'}
            onClick={() => handleTabClick('/settings/mobile/notify/push')}
>
<FaExclamationCircle style={{ marginRight: '10px' }} />Push Notifications
</SubMenuItem>
</SubMenu>


{/*  Settings & administration -> mobile -> offline */}
<SubMenuItem
          to="/settings/mobile/offline"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/mobile/offline'}
          onClick={() => {
            handleTabClick('/settings/mobile/offline');
            setoffline(!offline);
          }}
>
<FaCloud  style={{ marginRight: '10px' }} /> Offline Access
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>


<SubMenu isOpen={offline} collapsed={isCollapsed}>
<SubMenuItem
            to="/settings/mobile/offline/access"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/mobile/offline/access'}
            onClick={() => handleTabClick('/settings/mobile/offline/access')}
>
<FaUser style={{ marginRight: '10px' }} />Access
</SubMenuItem>
<SubMenuItem
            to="/settings/mobile/offline/sync"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/mobile/offline/sync'}
            onClick={() => handleTabClick('/settings/mobile/offline/sync')}
>
<FaSync  style={{ marginRight: '10px' }} />Sync
</SubMenuItem>
</SubMenu>
</SubMenu>

{/* settings & administration -> admin */}

<SubMenuItem
          to="/settings/admin"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/admin'}
          onClick={() => {
            handleTabClick('/settings/admin');
            setadmin(!admin);
          }}
>
<FaUsers  style={{ marginRight: '10px' }} /> Administration
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
{/*  Settings & administration -> admin ->user */}
<SubMenu isOpen={admin} collapsed={isCollapsed}>
<SubMenuItem
          to="/settings/admin/user"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/admin/user'}
          onClick={() => {
            handleTabClick('/settings/admin/user');
            setuser(!user);
          }}
>
<FaUser  style={{ marginRight: '10px' }} /> User
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={user} collapsed={isCollapsed}>
<SubMenuItem
            to="/settings/admin/user/add"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/admin/user/add'}
            onClick={() => handleTabClick('/settings/admin/user/add')}
>
<FaPlus style={{ marginRight: '10px' }} />Add/Remove
</SubMenuItem>
<SubMenuItem
            to="/settings/admin/user/assign"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/admin/user/assign'}
            onClick={() => handleTabClick('/settings/admin/user/assign')}
>
<FaUserTag style={{ marginRight: '10px' }} />Assign Role
</SubMenuItem>
<SubMenuItem
            to="/settings/admin/user/manage"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/admin/user/manage'}
            onClick={() => handleTabClick('/settings/admin/user/manage')}
>
<FaCogs style={{ marginRight: '10px' }} />Manage Teams
</SubMenuItem>

</SubMenu>
{/*  Settings & administration -> admin ->configuration */}


<SubMenuItem
          to="/settings/admin/config"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/admin/config'}
          onClick={() => {
            handleTabClick('/settings/admin/config');
            setconfig(!config);
          }}
>
<FaCogs  style={{ marginRight: '10px' }} /> Configuration
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>
<SubMenu isOpen={config} collapsed={isCollapsed}>
<SubMenuItem
            to="/settings/admin/config/settings"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/admin/config/settings'}
            onClick={() => handleTabClick('/settings/admin/config/settings')}
>
<FaTools style={{ marginRight: '10px' }} />Settings
</SubMenuItem>
<SubMenuItem
            to="/settings/admin/config/customize"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/admin/config/customize'}
            onClick={() => handleTabClick('/settings/admin/config/customize')}
>
<FaCogs style={{ marginRight: '10px' }} />Customize
</SubMenuItem>
<SubMenuItem
            to="/settings/admin/config/rules"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/admin/config/rules'}
            onClick={() => handleTabClick('/settings/admin/config/rules')}
>
<FaSlidersH style={{ marginRight: '10px' }} />Set-up Rules
</SubMenuItem>
</SubMenu>


{/*  Settings & administration -> admin -> Security */}
<SubMenuItem
          to="/settings/admin/security"
          collapsed={isCollapsed}
          isActive={activeTab === '/settings/admin/security'}
          onClick={() => {
            handleTabClick('/settings/admin/security');
            setsecurity(!security);
          }}
>
<FaLock  style={{ marginRight: '10px' }} /> Security
<FaCaretDown style={{ marginLeft: 'auto' }} />
</SubMenuItem>


<SubMenu isOpen={security} collapsed={isCollapsed}>
<SubMenuItem
            to="/settings/admin/security/configure"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/admin/security/configure'}
            onClick={() => handleTabClick('/settings/admin/security/configure')}
>
<FaUser style={{ marginRight: '10px' }} />Configure
</SubMenuItem>
<SubMenuItem
            to="/settings/admin/security/access"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/admin/security/access'}
            onClick={() => handleTabClick('/settings/admin/security/access')}
>
<FaUserLock style={{ marginRight: '10px' }} />Data Access
</SubMenuItem>

<SubMenuItem
            to="/settings/admin/security/manage"
            collapsed={isCollapsed}
            isActive={activeTab === '/settings/admin/security/manage'}
            onClick={() => handleTabClick('/settings/admin/security/manage')}
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
 