import React from "react";
import "./TabNavigation.css";
import { Button } from "@mui/material";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tab-navigation">
      <Button
        type="submit"
        variant="primary"
        size="small"
        style={{ color: "Black" }}
        className={`tab-button ${activeTab === "info" ? "active" : ""}`}
        onClick={() => handleTabChange("info")}
      >
        Type
      </Button>
      <Button
        type="submit"
        variant="primary"
        size="small"
        style={{ color: "black" }}
        className={`tab-button ${activeTab === "evolution" ? "active" : ""}`}
        onClick={() => handleTabChange("evolution")}
      >
        Family
      </Button>
      <Button
        type="submit"
        variant="primary"
        size="small"
        style={{ color: "black" }}
        className={`tab-button ${activeTab === "summary" ? "active" : ""}`}
        onClick={() => handleTabChange("summary")}
      >
        Summary
      </Button>
    </div>
  );
};

export default TabNavigation;
