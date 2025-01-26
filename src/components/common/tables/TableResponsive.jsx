"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EditLink from "./EditLink";
import DetailLink from "./DetailLink";

function Table({ url, name, title }) {
  const [data, setData] = useState([]);

  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/${url}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [url]);

  const columns = data.length > 0 ? Object.keys(data[0]) : []; 
  return (
    <section className="grid gap-4 shadow-md rounded-md bg-white py-6 p-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-medium">{title}</h1>
        <Link
          href={`${pathname}/create`}
          className="flex gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
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

      {/* Tabla */}
      <section className="overflow-x-auto  rounded-md ">
        <table className="w-full text-sm text-left text-zinc-500 bg-zinc-100 rounded-md">
          <thead className="text-xs uppercase bg-zinc-200">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-3 text-black">
                  {column}
                </th>
              ))}
                <th className="px-6 py-3 text-black">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border">
                {columns.map((column, colIndex) => (
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
                  <EditLink href={"/"} />
                  <DetailLink href={"/"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default Table;
