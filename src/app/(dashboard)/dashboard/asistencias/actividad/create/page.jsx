"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/appContext";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import { useRouter } from "next/navigation";

function CreateActivityPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activityTypes, setActivityTypes] = useState([]);
  const { setErrorMessage, setSuccessMessage } = useAppContext();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch tipos de actividad desde la API
  useEffect(() => {
    const fetchActivityTypes = async () => {
      try {
        const response = await axios.get("/api/dashboard/activitytypes"); // Aquí se hace la llamada a la API
        setActivityTypes(response.data || []);
      } catch (error) {
        setErrorMessage("No se pudieron cargar los tipos de actividad");
      }
    };

    fetchActivityTypes();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Realizar el POST a la API para crear la actividad
      const response = await axios.post("/api/dashboard/activities", {
        FK_activityType: data.FK_activityType,
        activityName: data.activityName,
        activityDate: data.activityDate,
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
        description: data.description,
      });

      setSuccessMessage(response.data.message);
      // Esperar 2 segundos antes de redirigir
      reset();
      setTimeout(() => {
        router.back() // Redirige a la lista de actividades (ajusta esta ruta según tus necesidades)
      }, 2000);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.error || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid gap-4">
      <section className="p-4 bg-white shadow-md grid gap-4 rounded-md">
        <h1 className="font-medium text-2xl pb-4 border-b">Crear Actividad</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-2 text-zinc-700"
        >
          {/* Tipo de Actividad */}
          <label className="flex flex-col gap-1">
            Tipo de Actividad
            <select
              className="input"
              {...register("FK_activityType", {
                required: {
                  value: true,
                  message: "Tipo de actividad requerido",
                },
              })}
            >
              <option value="">Seleccione un tipo de actividad</option>
              {activityTypes.map((type) => (
                <option key={type.ID} value={type.ID}>
                  {type.TipoActividad} {/* Asumiendo que 'id' y 'name' son los campos de cada tipo */}
                </option>
              ))}
            </select>
            {errors.FK_activityType && (
              <span className="text-sm text-red-500">
                {errors.FK_activityType.message}
              </span>
            )}
          </label>

          {/* Nombre de la Actividad */}
          <label className="flex flex-col gap-1">
            Nombre de la Actividad
            <input
              type="text"
              className="input"
              {...register("activityName", {
                required: {
                  value: true,
                  message: "Nombre de la actividad requerido",
                },
                maxLength: {
                  value: 100,
                  message: "El nombre no puede tener más de 100 caracteres",
                },
              })}
            />
            {errors.activityName && (
              <span className="text-sm text-red-500">
                {errors.activityName.message}
              </span>
            )}
          </label>

          {/* Fecha de la Actividad */}
          <label className="flex flex-col gap-1">
            Fecha de la Actividad
            <input
              type="date"
              className="input"
              {...register("activityDate", {
                required: {
                  value: true,
                  message: "Fecha de actividad requerida",
                },
              })}
            />
            {errors.activityDate && (
              <span className="text-sm text-red-500">
                {errors.activityDate.message}
              </span>
            )}
          </label>

          {/* Hora de Inicio */}
          <label className="flex flex-col gap-1">
            Hora de Inicio
            <input
              type="time"
              className="input"
              {...register("startTime", {
                required: {
                  value: true,
                  message: "Hora de inicio requerida",
                },
              })}
            />
            {errors.startTime && (
              <span className="text-sm text-red-500">
                {errors.startTime.message}
              </span>
            )}
          </label>

          {/* Hora de Fin */}
          <label className="flex flex-col gap-1">
            Hora de Fin
            <input
              type="time"
              className="input"
              {...register("endTime", {
                required: {
                  value: true,
                  message: "Hora de fin requerida",
                },
              })}
            />
            {errors.endTime && (
              <span className="text-sm text-red-500">
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
            <input
              type="text"
              className="input"
              {...register("description")}
            />
          </label>

          {/* Botón de Envío */}
          <section className="md:col-span-3 flex flex-col md:flex-row mt-4 items-center justify-between border-t pt-4 gap-4">
            <p className="text-zinc-500">Revisa la información antes de continuar.</p>
            <SubmitButton isLoading={isLoading} name="Registrar" />
          </section>
        </form>
      </section>
    </section>
  );
}

export default CreateActivityPage;
