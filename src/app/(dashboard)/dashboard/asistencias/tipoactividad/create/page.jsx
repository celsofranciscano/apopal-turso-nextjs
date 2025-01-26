"use client";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/appContext";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import { useRouter } from "next/navigation";

function CreateActivityTypePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { setErrorMessage, setSuccessMessage } = useAppContext();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/dashboard/activitytypes", data);
      setSuccessMessage(response.data.message);
      // Esperar 2 segundos antes de redirigir
      reset();
      setTimeout(() => {
        router.back();
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
        <h1 className="font-medium text-2xl pb-4 border-b">Crear Tipo de Actividad</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-2 text-zinc-700"
        >
          {/* Tipo de Actividad */}
          <label className="flex flex-col gap-1">
            Tipo de Actividad
            <input
              type="text"
              className="input"
              {...register("activityType", {
                required: {
                  value: true,
                  message: "Tipo de actividad requerido",
                },
                maxLength: {
                  value: 100,
                  message: "El tipo de actividad no puede tener más de 100 caracteres",
                },
              })}
            />
            {errors.activityType && (
              <span className="text-sm text-red-500">
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
              {...register("description", {
                maxLength: {
                  value: 250,
                  message: "La descripción no puede tener más de 250 caracteres",
                },
              })}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </label>

          {/* Botón de Envío */}
          <section className="md:col-span-3 flex flex-col md:flex-row mt-4 items-center justify-between border-t pt-4 gap-4">
            <p className="text-zinc-500">
              Revisa la información antes de continuar.
            </p>
            <SubmitButton isLoading={isLoading} name="Registrar" />
          </section>
        </form>
      </section>
    </section>
  );
}

export default CreateActivityTypePage;
