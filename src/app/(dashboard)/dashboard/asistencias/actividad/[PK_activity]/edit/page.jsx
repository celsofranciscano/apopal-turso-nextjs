"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "@/context/appContext";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/common/buttons/SubmitButton";

function EditPageActivity({ params }) {
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

        // Llenar los campos del formulario con los datos existentes
        setValue("activityName", response.data.activityName);
        setValue("activityType", response.data.activityType);
        setValue("activityDate", response.data.activityDate);
        setValue("startTime", response.data.startTime);
        setValue("endTime", response.data.endTime);
        setValue("location", response.data.location || "");
        setValue("description", response.data.description || "");
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

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.patch(
        `/api/dashboard/activities/${params.PK_activity}`,
        {
          ...data,
        }
      );
      // Aquí podrías agregar una lógica de redirección o mostrar un mensaje de éxito
      console.log("Actividad actualizada con éxito:", response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.error || "Hubo un error al actualizar la actividad"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid gap-4">
      <section className="p-4 bg-white shadow-md grid gap-4 rounded-md">
        <h1 className="font-medium text-2xl pb-4 border-b">
          Editar Actividad
        </h1>

        {activityData ? (
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-zinc-700">
              {/* Nombre de la Actividad */}
              <label className="flex flex-col gap-1">
                Nombre de la Actividad
                <input
                  type="text"
                  className="input"
                  {...register("activityName", { required: "Este campo es obligatorio" })}
                />
                {errors.activityName && (
                  <span className="text-red-500">
                    {errors.activityName.message}
                  </span>
                )}
              </label>

              {/* Tipo de Actividad */}
              <label className="flex flex-col gap-1">
                Tipo de Actividad
                <input
                  type="number"
                  className="input"
                  {...register("activityType", { required: "Este campo es obligatorio" })}
                />
                {errors.activityType && (
                  <span className="text-red-500">
                    {errors.activityType.message}
                  </span>
                )}
              </label>

              {/* Fecha de Actividad */}
              <label className="flex flex-col gap-1">
                Fecha de Actividad
                <input
                  type="datetime-local"
                  className="input"
                  {...register("activityDate", { required: "Este campo es obligatorio" })}
                />
                {errors.activityDate && (
                  <span className="text-red-500">
                    {errors.activityDate.message}
                  </span>
                )}
              </label>

              {/* Hora de Inicio */}
              <label className="flex flex-col gap-1">
                Hora de Inicio
                <input
                  type="datetime-local"
                  className="input"
                  {...register("startTime", { required: "Este campo es obligatorio" })}
                />
                {errors.startTime && (
                  <span className="text-red-500">
                    {errors.startTime.message}
                  </span>
                )}
              </label>

              {/* Hora de Fin */}
              <label className="flex flex-col gap-1">
                Hora de Fin
                <input
                  type="datetime-local"
                  className="input"
                  {...register("endTime", { required: "Este campo es obligatorio" })}
                />
                {errors.endTime && (
                  <span className="text-red-500">
                    {errors.endTime.message}
                  </span>
                )}
              </label>

              {/* Ubicación */}
              <label className="flex flex-col gap-1">
                Ubicación
                <input
                  type="text"
                  className="input"
                  {...register("location")}
                />
              </label>

              {/* Descripción */}
              <label className="flex flex-col gap-1">
                Descripción
                <textarea
                  className="input"
                  {...register("description")}
                />
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <SubmitButton isLoading={isLoading} name={"Actualizar actividad"} />
            </div>
          </form>
        ) : (
          <p>Cargando datos...</p>
        )}
      </section>
    </section>
  );
}

export default EditPageActivity;
