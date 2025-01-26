"use client";
import { useAppContext } from "@/context/appContext";
import { useState, useEffect } from "react";

function SuccessAlert() {
  const { successMessage, setSuccessMessage } = useAppContext(); // Accedemos a successMessage y setSuccessMessage
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (successMessage) {
      // Mostrar alerta cuando haya un mensaje de éxito
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setSuccessMessage(null); // Resetear el successMessage después de 6 segundos
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, setSuccessMessage]); // Dependemos de successMessage para mostrar u ocultar la alerta

  const onClose = () => {
    setIsVisible(false);
    setSuccessMessage(null); // Eliminar el mensaje de éxito cuando se cierra la alerta
  };

  if (!isVisible) return null; // No renderizar el componente si no está visible

  return (
    
      <div className="w-full bg-green-100  border-l-4 border-green-500 flex items-center justify-between px-4 py-2 gap-8 shadow-sm rounded-md">
        <div className="flex items-center gap-4">
          <svg
            className="w-6 h-6 text-green-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <h2 className="text-black  font-medium">Éxito</h2>
            <p className="text-sm text-green-500">
              {successMessage}
            </p>
          </div>
        </div>
        <button onClick={onClose}>
          <svg
            className="w-6 h-6 text-green-500"
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

export default SuccessAlert;
