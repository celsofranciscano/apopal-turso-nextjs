"use client";
import React, { createContext, useState, useContext } from "react";

// Creación del contexto
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Estado global de la aplicación
  // mensaje de error
  const [errorMessage, setErrorMessage] = useState(null);
  // mensaje de éxito
  const [successMessage, setSuccessMessage] = useState(null);

  // El contexto proporcionará todo el estado y las funciones necesarias
  const contextValue = {
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAppContext = () => {
  return useContext(AppContext);
};
