"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSession } from "next-auth/react";
import FilterTable from "./FilterTable";
import ExportTable from "./ExportTable";
import SortTable from "./SortTable";
import ConfigTable from "./ConfigTable";
import SearchTable from "./SearchTable";

function Table({ url, columns, rows, name }) {
  const { data: session } = useSession();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Número de filas por página
  const [filterStatus, setFilterStatus] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/${url}`);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [url]);

  //   const columns = data.length > 0 ? [...Object.keys(data[0]), "Acciones"] : []; // Obtener las claves dinámicamente y agregar "Acciones"

  // Búsqueda
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = data.filter((row) =>
      rows.some((key) => String(row[key]).toLowerCase().includes(value))
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reinicia la paginación al buscar
  };

  // Filtrado por estado (activo/inactivo)
  const handleFilterStatus = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
    const filtered = data.filter((row) =>
      status === "" ? true : row.status === (status === "Activos")
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reinicia la paginación al filtrar
  };

  // Ordenar
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    sortData(key, direction);
  };

  const sortData = (key, direction) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (typeof a[key] === "string") {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
    });
    setFilteredData(sortedData);
  };

  // Paginación
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Cambiar el número de filas por página
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reinicia la paginación
  };

  return (
    <section className=" grid gap-4 shadow-md rounded-md bg-white py-6 p-4 ">
      {/* Barra de búsqueda y filtro */}

      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl  font-medium">Administradores</h1>

        <Link
          href={`${pathname}/create`}
          className=" flex gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          <span>Agregar {name}</span>

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
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </Link>
      </div>

      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <span>Mostrar</span>
          <select
            className="input"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>registros</span>
        </div>

        <div className="flex items-center gap-4">
          <FilterTable />
          <ExportTable />
          <SortTable />
          <ConfigTable />
          <SearchTable />
        </div>
      </div>

      {/* Tabla */}
      <section className="overflow-x-auto  rounded-md ">
        <table className="w-full text-sm text-left text-zinc-500 bg-zinc-100 rounded-md">
          <thead className="text-xs uppercase bg-zinc-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-blanck hover:cursor-pointer"
                  // Evitamos el onClick y el icono en las columnas "Estado" y "Acciones"
                  onClick={() =>
                    column !== "Estado" && column !== "Acciones"
                      ? requestSort(rows[index])
                      : null
                  }
                >
                  {column}
                  {column !== "Estado" && column !== "Acciones" && (
                    <svg
                      className="inline h-5 w-5 ml-1"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 10l4-6 4 6H8zm8 4l-4 6-4-6h8z" />
                    </svg>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index} className="border-b border">
                {rows.map((rowField, rowIndex) => (
                  <td key={rowIndex} className="px-6 py-4 text-zinc-500">
                    {rowField === "status" ? (
                      row.status ? (
                        <span className="px-2 py-1 rounded-md bg-blue-500 text-white">
                          Activo
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-md bg-red-500 text-white">
                          Inactivo
                        </span>
                      )
                    ) : (
                      row[rowField]
                    )}
                  </td>
                ))}
                <td className="flex items-center py-3 justify-center text-blue-500">
                  <Link href={`${pathname}/${row[rows[0]]}`}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6z" />
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Paginación */}
      <div className="flex items-center justify-between mt-4 space-x-2">
        {/* Cantidad que se ve en la pagina */}
        <div className="mb-4">
          <span className="text-gray-600">
            {indexOfFirstRow + 1} a{" "}
            {Math.min(indexOfLastRow, filteredData.length)} de{" "}
            {filteredData.length} Registros
          </span>
        </div>

        <div className="flex items-center bg-zinc-200 rounded-md text-xs py-2 px-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-black ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {Array.from(
            { length: Math.ceil(filteredData.length / rowsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-white text-black"
                    : " text-zinc-400"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage >= Math.ceil(filteredData.length / rowsPerPage)
            }
            className={`px-3 py-1 text-black ${
              currentPage >= Math.ceil(filteredData.length / rowsPerPage)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Table;
