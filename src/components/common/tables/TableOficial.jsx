"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import FilterTable from "./FilterTable";
import ExportTable from "./ExportTable";
import SortTable from "./SortTable";
import ConfigTable from "./ConfigTable";
import SearchTable from "./SearchTable";
import EditLink from "./EditLink";
import DetailLink from "./DetailLink";
import CreateLink from "./CreateLink";
import PaginationTable from "./PaginationTable";

function Table({ url, columns, name, title }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

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

  return (
    <section className="grid gap-4 shadow-md rounded-md bg-white py-6 p-4">
      {/* Barra de búsqueda y filtro */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-medium">{title}</h1>
        <CreateLink name={name} href={"/"} />
      </div>

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
          <FilterTable />
          <ExportTable filteredData={filteredData} />
          <SortTable />
          <ConfigTable />
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
              console.log(row); // Esto te ayudará a inspeccionar el objeto
              return (
                <tr key={index} className="border-b border">
                  {columns?.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 text-zinc-500">
                      {column === "Estado" ? (
                        row[column] ? (
                          <span className="px-2 py-1 rounded-md bg-blue-500 text-white">
                            Activo
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-md bg-red-500 text-white">
                            Inactivo
                          </span>
                        )
                      ) : (
                        row[column]
                      )}
                    </td>
                  ))}
                  <td className="flex items-center py-3 justify-center">
                    <EditLink id={row.ID} />
                    <DetailLink id={row.ID} />
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

export default Table;
