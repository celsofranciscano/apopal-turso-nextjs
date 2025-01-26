"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "@/context/appContext";
import { useForm } from "react-hook-form";
import Asistencia from "@/components/dashboard/tables/Asistencia";

function DetailPageActivity({ params }) {
  const [activityData, setActivityData] = useState(null);
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
    // Cargar datos existentes de la actividad
    const fetchActivityData = async () => {
      try {
        const response = await axios.get(
          `/api/dashboard/activities/${params.PK_activity}`
        );
        setActivityData(response.data);
      } catch (error) {
        console.log(error);
        setErrorMessage(
          error.response?.data?.error ||
            "No se pudo cargar la información de la actividad"
        );
      }
    };

    fetchActivityData();
  }, [params, setErrorMessage, setValue]);

  return (
    <section className="grid gap-4">
      <section className="p-4 bg-white shadow-md grid gap-4 rounded-md">
        <h1 className="font-medium text-2xl pb-4 border-b">
          Detalles de la Actividad
        </h1>

        {activityData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-zinc-700">
            {/* ID de la Actividad */}
            <label className="flex flex-col gap-1">
              ID de Actividad
              <input
                type="text"
                className="input"
                value={activityData.PK_activity}
                disabled
              />
            </label>

            {/* Nombre de la Actividad */}
            <label className="flex flex-col gap-1">
              Nombre de la Actividad
              <input
                type="text"
                className="input"
                value={activityData.activityName}
                disabled
              />
            </label>

            {/* Tipo de Actividad */}
            <label className="flex flex-col gap-1">
              Tipo de Actividad
              <input
                type="text"
                className="input"
                value={activityData.activityType}
                disabled
              />
            </label>

            {/* Fecha de Actividad */}
            <label className="flex flex-col gap-1">
              Fecha de Actividad
              <input
                type="datetime-local"
                className="input"
                value={activityData.activityDate}
                disabled
              />
            </label>

            {/* Hora de Inicio */}
            <label className="flex flex-col gap-1">
              Hora de Inicio
              <input
                type="datetime-local"
                className="input"
                value={activityData.startTime}
                disabled
              />
            </label>

            {/* Hora de Fin */}
            <label className="flex flex-col gap-1">
              Hora de Fin
              <input
                type="datetime-local"
                className="input"
                value={activityData.endTime}
                disabled
              />
            </label>

            {/* Ubicación */}
            <label className="flex flex-col gap-1">
              Ubicación
              <input
                type="text"
                className="input"
                value={activityData.location || "No especificada"}
                disabled
              />
            </label>

            {/* Descripción */}
            <label className="flex flex-col gap-1">
              Descripción
              <textarea
                className="input"
                value={activityData.description || "No disponible"}
                disabled
              />
            </label>
          </div>
        ) : (
          <p>Cargando datos...</p>
        )}
      </section>
      <section>
        <Asistencia params={params} />
      </section>
    </section>
  );
}

export default DetailPageActivity;
