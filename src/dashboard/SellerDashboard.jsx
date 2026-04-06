import React from "react";
import PhysicalDashboard from "./PhysicalDashboard";
import DigitalDashboard from "./DigitalDashboard";
import HybridDashboard from "./HybridDashboard";
import './Dashboard.css';

const SellerDashboard = ({ sellerType }) => {
  if (sellerType === "physical") return <PhysicalDashboard />;
  if (sellerType === "digital") return <DigitalDashboard />;
  if (sellerType === "hybrid") return <HybridDashboard />;

  return <div className="p-4 text-center text-secondary">Select Seller Type</div>;
};

export default SellerDashboard;
