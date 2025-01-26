"use client";

import { useState, useEffect, useRef } from "react";
import Tooltip from "@/components/common/tooltip/Tooltip";
import PDFgenerate from "./PDFGenerate";
import CSVgenerate from "./CSVGenerate";

function ExportTable({ filteredData }) {
  const [showOptions, setShowOptions] = useState(false);
  const cardRef = useRef(null); // Referencia para el contenedor del menú

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    // Verifica si el clic ocurrió fuera del cardRef
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    // Agregar un listener al evento "click" en el documento
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el listener cuando se desmonta el componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={cardRef}>
      <Tooltip content="Exportar" position="top">
        <button
          className="hover:bg-zinc-200 rounded-md shadow-md p-2"
          onClick={toggleOptions}
        >
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
              d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
            />
          </svg>
        </button>
      </Tooltip>

      <div
        className={`absolute grid top-full mt-2 bg-white p-2 w-40 shadow-2xl rounded-md ${
          showOptions ? "block" : "hidden"
        }`}
      >
        <p className="text-sm text-zinc-600 pb-2">Descargar en formato:</p>
        <PDFgenerate filteredData={filteredData} />
        <CSVgenerate filteredData={filteredData} />
      </div>
    </div>
  );
}

export default ExportTable;
