import React, { useState } from "react";
import ProviderSettings from "./ProviderSettings";
import ProviderMessages from "./ProviderMessages";
import ProviderTickets from "./ProviderTickets";
import ResetPassword from "./ResetPassword";
import { useNavigate } from "react-router-dom";

const ProviderProfile = () => {
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "security":
        return <ResetPassword />;
      case "settings":
        return <ProviderSettings />;
      case "messages":
        return <ProviderMessages />;
      case "ticket":
        return <ProviderTickets />;
      default:
        return <ProviderSettings />;
    }
  };

  return (
    <div className=" mx-auto p-4 h-screen overflow-hidden">
      <button
        onClick={() => navigate("/")}
        className="absolute border top-2 left-2 z-50 bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded"
      >
        بازگشت
      </button>
      <div className="bg-white shadow-xl rounded-lg my-5">
        <div className="flex border-b border-gray-200 ">
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "settings"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            تنظیمات
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "messages"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("messages")}
          >
            پیام ها
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "security"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("security")}
          >
            رمز عبور
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "ticket"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("ticket")}
          >
            تیکت{" "}
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
