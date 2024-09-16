import React, { useState } from "react";
const TabPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`w-1/2 py-2 text-center text-lg font-semibold ${
            activeTab === 1
              ? "border-b-4 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Tab 1
        </button>
        <button
          className={`w-1/2 py-2 text-center text-lg font-semibold ${
            activeTab === 2
              ? "border-b-4 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Tab 2
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white p-6 shadow-lg rounded-lg mt-4">
        {activeTab === 1 ? <FormComponentOne /> : <FormComponentTwo />}
      </div>
    </div>
  );
};

export default TabPage;
