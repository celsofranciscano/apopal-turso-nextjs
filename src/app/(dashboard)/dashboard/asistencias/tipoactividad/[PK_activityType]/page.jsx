"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "@/context/appContext";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/common/buttons/SubmitButton";

function DetailPageActivity({ params }) {
  const [activityTypeData, setActivityTypeData] = useState(null);
  const { setErrorMessage } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  // useForm hook para manejar la validación y los formularios
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Cargar datos existentes del tipo de actividad
    const fetchActivityTypeData = async () => {
      try {
        const response = await axios.get(
          `/api/dashboard/activitytypes/${params.PK_activityType}`
        );
        setActivityTypeData(response.data);
      } catch (error) {
        console.log(error);
        setErrorMessage(
          error.response?.data?.error ||
            "No se pudo cargar la información del tipo de actividad"
        );
      }
    };

    fetchActivityTypeData();
  }, [params, setErrorMessage, setValue]);

  return (
    <section className="grid gap-4">
      <section className="p-4 bg-white shadow-md grid gap-4 rounded-md">
        <h1 className="font-medium text-2xl pb-4 border-b">
          Detalles del Tipo de Actividad
        </h1>

        {activityTypeData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-zinc-700">
            {/* Código */}
            <label className="flex flex-col gap-1">
              ID
              <input
                type="text"
                className="input"
                value={activityTypeData.PK_activityType}
                disabled
              />
            </label>

            {/* Tipo de Actividad */}
            <label className="flex flex-col gap-1">
              Tipo de Actividad
              <input
                type="text"
                className="input"
                value={activityTypeData.activityType}
                disabled
              />
              {errors.activityType && (
                <span className="text-red-500">
                  {errors.activityType.message}
                </span>
              )}
            </label>

            {/* Descripción */}
            <label className="flex flex-col gap-1">
              Descripción
              <input
                type="text"
                className="input"
                value={activityTypeData.description}
                disabled
              />
            </label>
          </div>
        ) : (
          <p>Cargando datos...</p>
        )}
      </section>
    </section>
  );
}

export default DetailPageActivity;
