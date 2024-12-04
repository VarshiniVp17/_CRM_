import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import SideNav from "./SideNav";
import Home from "./Home";
import Deals from "./Deals";
import OpportunityForm from "./OpportunityForm";
import PersonalContacts from "./PersonalContacts";
import OrganizationForm from "./OrganizationForm";
import SalesFunnel from "./SalesFunnel";
import FinancialYear from "./FinancialYear";
import BarChart from "./Barchart";
import Import from "./Import";
import Login from "./Login"; // Import the Login component
import UnderConstruction from './UnderConstruction'; // Import the UnderConstruction component
import "./App.css";

// Styled Components
const AppContainer = styled.div`
  padding-top: 0; /* Remove header padding */
  display: flex;
`;

const ContentContainer = styled.div`
  margin-left: ${(props) => (props.isCollapsed ? "60px" : "220px")};
  padding: 20px;
  flex: 1;
`;

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // Get the current location (route)

  const toggleNav = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Check if the current page is the login page
  const isLoginPage = location.pathname === "/";

  return (
    <AppContainer>
      {/* Show SideNav only if not on the login page */}
      {!isLoginPage && (
        <SideNav isCollapsed={isCollapsed} toggleNav={toggleNav} />
      )}
      <ContentContainer isCollapsed={!isLoginPage && isCollapsed}>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Add Login page route */}
          <Route path="/home" element={<Home />} />{" "}
          {/* Dashboard after login */}
          <Route path="/report/deals" element={<Deals />} />
          <Route path="/report/FinancialYear" element={<FinancialYear />} />
          <Route
            path="/opportunity/opportunity-details"
            element={<OpportunityForm />}
          />
          <Route
            path="/opportunity/customer-details/contact-details"
            element={<PersonalContacts />}
          />
          <Route
            path="/opportunity/customer-details/organization-details"
            element={<OrganizationForm />}
          />
          <Route path="/charts/SalesFunnel" element={<SalesFunnel />} />
          <Route path="/charts/barchart" element={<BarChart />} />
          <Route path="/import" element={<Import />} />
          
          {/* Add Under Construction route */}
          <Route path="/Settings" element={<UnderConstruction />} />
        </Routes>
      </ContentContainer>
    </AppContainer>
  );
}

// Wrap App with Router
function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
