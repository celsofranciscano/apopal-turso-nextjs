"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import { useAppContext } from "@/context/appContext";

function PartnersSearchPage() {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { setErrorMessage } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.searchValue) {
      setErrorMessage("Por favor ingresa un valor para buscar");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        `/api/dashboard/reports/partners?${data.searchField}=${data.searchValue}`
      );
      setPartners(response.data.partners || []);
      console.log(response.data);
    } catch (error) {
      console.error("Error al buscar socios:", error);
      setPartners([]);
      setErrorMessage(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <div className="bg-white shadow-md rounded-md px-4 py-6 grid gap-4">
          <h1 className="text-2xl font-medium">Búscar Socio</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
            <label className="flex flex-col gap-1">
              Tipo *
              <select
                {...register("searchField", {
                  required: "Este campo es obligatorio",
                })}
                className="input"
              >
                <option value="code">Código</option>
                <option value="name">Nombre</option>
              </select>
              {errors.searchField && (
                <p className="text-red-500 text-sm">
                  {errors.searchField.message}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              Buscar *
              <input
                type="search"
                {...register("searchValue", {
                  required: "Este campo es obligatorio.",
                  validate: (value, context) => {
                    const field = context.searchField;
                    if (field === "code" && !/^\d{4}$/.test(value)) {
                      return "El código debe contener exactamente 4 dígitos.";
                    }
                    if (
                      field === "name" &&
                      (!/^[A-Za-z\s]+$/.test(value) ||
                        value.length < 3 ||
                        value.length > 15)
                    ) {
                      return "El nombre solo debe contener letras y espacios, con entre 3 y 15 caracteres.";
                    }
                    return true;
                  },
                })}
                placeholder="Ingresa el valor de búsqueda"
                className="input"
              />
              {errors.searchValue && (
                <p className="text-red-500 text-sm">
                  {errors.searchValue.message}
                </p>
              )}
            </label>
            <SubmitButton isLoading={isLoading} name="Buscar" />
          </form>
        </div>
      </div>

      <div className="bg-white shadow-md    lg:col-span-2 px-4 py-6">
        <h1 className="text-2xl font-medium pb-4">Resultado </h1>
        <section className="  overflow-x-auto  rounded-md ">
          <table className="w-full text-sm text-left text-zinc-500 bg-zinc-100 rounded-md">
            <thead className="text-xs uppercase bg-zinc-200">
              <tr>
                <th className="px-4 py-3 text-black hover:cursor-pointer">
                  Código
                </th>
                <th className="px-4 py-3 text-black hover:cursor-pointer">
                  Nombre
                </th>
                <th className="px-4 py-3 text-black hover:cursor-pointer">
                  Apellido
                </th>
                <th className="px-4 py-3 text-black hover:cursor-pointer">
                  Teléfono
                </th>
                <th className="px-4 py-3 text-black hover:cursor-pointer">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {partners.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-2 border-b">
                    No se encontraron socios.
                  </td>
                </tr>
              ) : (
                <>
                  {partners.map((partner) => (
                    <tr
                      key={partner.code}
                      className="border-b border   text-zinc-500"
                    >
                      <td className="px-4 ">{partner.code}</td>
                      <td className="px-4 ">{partner.firstName}</td>
                      <td className="px-4 ">{partner.lastName}</td>
                      <td className="px-4 ">{partner.phoneNumber}</td>
                      <td className="px-4 py-2 border-b">ver detalles</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </section>
  );
}

export default PartnersSearchPage;
