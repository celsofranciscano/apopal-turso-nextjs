"use client";
import { useAppContext } from "@/context/appContext";
import { useState, useEffect } from "react";

function DangerAlert() {
  const { errorMessage, setErrorMessage } = useAppContext(); // Accedemos a errorMessage y setErrorMessage
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      // Mostrar alerta cuando haya un mensaje de error
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setErrorMessage(null); // Resetear el errorMessage después de 6 segundos
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, setErrorMessage]); // Dependemos de errorMessage para mostrar u ocultar la alerta

  const onClose = () => {
    setIsVisible(false);
    setErrorMessage(null); // Eliminar el mensaje de error cuando se cierra la alerta
  };

  if (!isVisible) return null; // No renderizar el componente si no está visible

  return (
 
      <div className="w-full bg-red-100 border-l-4 text-red-500 border-red-500 flex items-center justify-between px-4 py-2 gap-8 shadow-sm rounded-md">
        <div className="flex items-center gap-4">
          <svg
            className="w-6 h-6 text-red-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <h2 className="text-black font-medium">Error</h2>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        </div>
        <button onClick={onClose}>
          <svg
            className="w-6 h-6 text-current"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            ></path>
          </svg>
        </button>
      </div>

  );
}

export default DangerAlert;
