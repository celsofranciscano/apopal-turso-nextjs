"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import SearchTable from "./SearchTable";
import PaginationTable from "./PaginationTable";
import CardAsistencia from "./CardAsistencia";

function AsistenciaTable({ url, columns, name, title, params }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  // Contadores de Controls
  const [counts, setCounts] = useState({
    Presente: 0,
    Falta: 0,
    Retraso: 0,
    Permiso: 0,
  });

  // Función para obtener los datos
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/${url}`);
      const fetchedData = response.data;

      setData(fetchedData);
      setFilteredData(fetchedData);

      // Contabiliza los Controls
      const counts = fetchedData.reduce(
        (acc, row) => {
          if (row.Control === "Presente") acc.Presente++;
          else if (row.Control === "Falta") acc.Falta++;
          else if (row.Control === "Retraso") acc.Retraso++;
          else if (row.Control === "Permiso") acc.Permiso++;
          return acc;
        },
        { Presente: 0, Falta: 0, Retraso: 0, Permiso: 0 }
      );

      setCounts(counts);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reinicia la paginación
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Función para refrescar los datos al hacer clic en el botón de refresh
  const handleRefresh = () => {
    fetchData(); // Vuelve a cargar los datos
  };

  return (
    <section className="grid gap-4 shadow-md rounded-md bg-white py-6 p-4">
      {/* Barra de búsqueda y filtro */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-medium">{title}</h1>
      </div>

      {/* Contadores */}
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 rounded-md bg-blue-500 text-white">
          Presente: {counts.Presente}
        </div>
        <div className="px-4 py-2 rounded-md bg-red-500 text-white">
          Falta: {counts.Falta}
        </div>
        <div className="px-4 py-2 rounded-md bg-yellow-500 text-black">
          Retraso: {counts.Retraso}
        </div>
        <div className="px-4 py-2 rounded-md bg-green-500 text-white">
          Permiso: {counts.Permiso}
        </div>
      </div>

      {/* Opciones de paginación y búsqueda */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>Mostrar</span>
          <select
            className="input"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
          <span>registros</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Botón de refresh */}
          <button 
            onClick={handleRefresh} 
            className="flex items-center gap-2 bg-zinc-200 px-4 py-2 rounded-md"
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
                d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
              />
            </svg>
            Refresh
          </button>

          <SearchTable data={data} setFilteredData={setFilteredData} />
        </div>
      </div>

      {/* Tabla */}
      <section className="overflow-x-auto rounded-md">
        <table className="w-full text-sm text-left text-zinc-500 bg-zinc-100 rounded-md">
          <thead className="text-xs uppercase bg-zinc-200">
            <tr>
              {columns?.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-black hover:cursor-pointer"
                >
                  {column}
                </th>
              ))}
              <th className="px-6 py-3 text-black">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => {
              return (
                <tr key={index} className="border-b border">
                  {columns?.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 text-zinc-500">
                      {column === "Control" ? ( // Verifica si la columna es "Control"
                        row[column] === "Falta" ? (
                          <span className="px-2 py-1 rounded-md bg-red-500 text-white">
                            Falta
                          </span>
                        ) : row[column] === "Presente" ? (
                          <span className="px-2 py-1 rounded-md bg-blue-500 text-white">
                            Presente
                          </span>
                        ) : row[column] === "Retraso" ? (
                          <span className="px-2 py-1 rounded-md bg-yellow-500 text-black">
                            Retraso
                          </span>
                        ) : row[column] === "Permiso" ? (
                          <span className="px-2 py-1 rounded-md bg-green-500 text-white">
                            Permiso
                          </span>
                        ) : (
                          row[column] // Si no coincide con ninguno, muestra el valor tal cual
                        )
                      ) : (
                        row[column] // Para otras columnas, muestra el contenido sin cambios
                      )}
                    </td>
                  ))}
                  <td className="flex items-center py-3 justify-center">
                    <CardAsistencia id={row.ID} params={params} />
                    <p>{row.ID}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Paginación */}
      <PaginationTable
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </section>
  );
}

export default AsistenciaTable;
