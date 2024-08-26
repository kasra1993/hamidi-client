import React, { useState } from "react";

const ProviderProfile = () => {
  const [activeTab, setActiveTab] = useState("details");

  const renderContent = () => {
    switch (activeTab) {
      case "details":
        return <DetailsTab />;
      case "settings":
        return <SettingsTab />;
      case "history":
        return <HistoryTab />;
      default:
        return <DetailsTab />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg h-screen">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "details"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "settings"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "history"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("history")}
          >
            Contact Us
          </button>
        </div>
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

const DetailsTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Profile Details</h2>
    {/* Your profile details form or data here */}
    <p>Details content...</p>
  </div>
);

const SettingsTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
    {/* Your profile settings form or data here */}
    <p>Settings content...</p>
  </div>
);

const HistoryTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-4">Profile History</h2>
    {/* Your profile history form or data here */}
    <p>History content...</p>
  </div>
);

export default ProviderProfile;
