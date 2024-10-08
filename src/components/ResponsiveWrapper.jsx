// ResponsiveWrapper.jsx
import React from "react";
import { useMediaQuery } from "react-responsive";

const ResponsiveWrapper = ({ children }) => {
  // Media query for detecting screens smaller than 768px (tablets and below)
  const isTabletOrBelow = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isTabletOrBelow ? (
        <div style={styles.container}>
          <div style={styles.message}>
            <h2 className="text-slate-600">
              برای تجربه ای بهتر لطفا با لپ تاپ وارد شوید
            </h2>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    padding: "20px",
  },
  message: {
    maxWidth: "90%",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginTop: "20px",
  },
};

export default ResponsiveWrapper;
