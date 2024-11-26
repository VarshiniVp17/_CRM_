import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
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
import "./App.css";

const AppContainer = styled.div`
  padding-top: 60px;
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

  // Conditionally render the header and side navigation only if not on the login page*
  const shouldShowNavAndHeader = location.pathname !== "/";

  return (
    <AppContainer>
      {shouldShowNavAndHeader && <Header />}
      {shouldShowNavAndHeader && (
        <SideNav isCollapsed={isCollapsed} toggleNav={toggleNav} />
      )}
      <ContentContainer isCollapsed={isCollapsed}>
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