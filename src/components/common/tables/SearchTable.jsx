"use client";
import { useState, useEffect } from "react";

function SearchTable({ data, setFilteredData }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar los datos cuando cambie el término de búsqueda
  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        Object.values(item) // Convertir cada objeto en un array de valores
          .join(" ") // Unir todos los valores en un string
          .toLowerCase() // Convertir todo a minúsculas
          .includes(searchTerm.toLowerCase()) // Verificar si contiene el término de búsqueda
    );
    setFilteredData(filtered);
  }, [searchTerm, data, setFilteredData]);

  return (
    <div className="relative">
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar..."
        className="pl-10 input border rounded-md p-2 w-full"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
  );
}

export default SearchTable;
