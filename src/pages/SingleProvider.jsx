import React, { useEffect, useState } from "react";
import { single_product_url as url } from "../utils/constants";
import { useParams } from "react-router-dom";
import About from "../components/providerComponents/About";
import Products from "../components/providerComponents/Products";
import Contact from "../components/providerComponents/Contact";
import { useNavigate } from "react-router-dom";

const SingleProvider = () => {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeComponent, setActiveComponent] = useState("Home");
  const navigate = useNavigate();

  const components = {
    Home: <About />,
    Contact: <Contact />,
    Products: <Products provider={provider} />,
  };
  let { id } = useParams();
  useEffect(() => {
    const fetchProvider = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}/materialProvider/${id}`);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setProvider(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    if (id) {
      fetchProvider();
    }
  }, [id]); // Dependency array
  return (
    <div class="bg-white dark:bg-gray-800">
      <button
        onClick={() => navigate(-1)}
        className="absolute border top-2 left-2 z-50 bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded"
      >
        بازگشت
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {provider && (
        <div className="flex h-screen py-10">
          <div className="w-fit h-full shadow-md bg-white px-1">
            <ul className="space-y-2 text-sm p-10">
              <li className="border border-black rounded">
                <button
                  className={`block w-full p-4 hover:bg-gray-100 ${
                    activeComponent === "Home" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setActiveComponent("Home")}
                >
                  About
                </button>
              </li>
              <li className="border border-black rounded">
                <button
                  className={`block w-full p-4 hover:bg-gray-100 ${
                    activeComponent === "Profile" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setActiveComponent("Contact")}
                >
                  Contact
                </button>
              </li>
              <li className="border border-black rounded">
                <button
                  className={`block w-full p-4 hover:bg-gray-100 ${
                    activeComponent === "Messages" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setActiveComponent("Products")}
                >
                  Providers
                </button>
              </li>
            </ul>
          </div>
          <div className="flex-grow ">
            <div className="p-10 bg-slate-100">
              {components[activeComponent]}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProvider;
