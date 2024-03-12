import React from "react";
import "./TabNavigation.css";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tab-navigation">
      <button
        className={`tab-button ${activeTab === "info" ? "active" : ""}`}
        onClick={() => handleTabChange("info")}
      >
        Info
      </button>
      <button
        className={`tab-button ${activeTab === "evolution" ? "active" : ""}`}
        onClick={() => handleTabChange("evolution")}
      >
        Evolution
      </button>
    </div>
  );
};

export default TabNavigation;
