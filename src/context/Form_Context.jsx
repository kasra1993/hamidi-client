import React, { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <FormContext.Provider
      value={{ currentStep, setCurrentStep, formData, setFormData }}
    >
      {children}
    </FormContext.Provider>
  );
};
