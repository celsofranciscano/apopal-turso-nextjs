"use client";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/appContext";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import { useRouter } from "next/navigation";

function CreatePage() {
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
      const response = await axios.post("/api/dashboard/partners", data);
      setSuccessMessage(response.data.message);
      // Esperar 2 segundos antes de redirigir
      reset();
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
        console.log(error)
      setErrorMessage(error.response?.data?.error || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid gap-4">
      <section className="p-4 bg-white shadow-md grid gap-4 rounded-md">
        <h1 className="font-medium text-2xl pb-4 border-b">
          Edita datos del Socio
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-2 text-zinc-700"
        >
          {/* Código */}
          <label className="flex flex-col gap-1">
            Código
            <input
              type="text"
              className="input"
              {...register("code", {
                required: {
                  value: true,
                  message: "Código requerido",
                },
                minLength:{
                    value: 4,
                    message: "El código no puede tener menos de 4 caracteres"
                },
                maxLength: {
                  value: 4,
                  message: "El código no puede tener más de 4 caracteres",
                },
              })}
            />
            {errors.code && (
              <span className="text-sm text-red-500">
                {errors.code.message}
              </span>
            )}
          </label>

          {/* CI */}
          <label className="flex flex-col gap-1">
            CI
            <input
              type="text"
              className="input"
              {...register("CI", {
                required: {
                  value: true,
                  message: "CI requerido",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "El CI solo puede contener números",
                },
                maxLength: {
                  value: 15,
                  message: "El CI no puede tener más de 15 caracteres",
                },
              })}
            />
            {errors.CI && (
              <span className="text-sm text-red-500">{errors.CI.message}</span>
            )}
          </label>

          {/* Nombre */}
          <label className="flex flex-col gap-1">
            Nombre
            <input
              type="text"
              className="input"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "Nombre requerido",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "El nombre solo puede contener letras",
                },
                maxLength: {
                  value: 45,
                  message: "El nombre no puede tener más de 45 caracteres",
                },
              })}
            />
            {errors.firstName && (
              <span className="text-sm text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </label>

          {/* Apellido */}
          <label className="flex flex-col gap-1">
            Apellido
            <input
              type="text"
              className="input"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "Apellido requerido",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "El apellido solo puede contener letras",
                },
                maxLength: {
                  value: 45,
                  message: "El apellido no puede tener más de 45 caracteres",
                },
              })}
            />
            {errors.lastName && (
              <span className="text-sm text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </label>

          {/* Fecha de nacimiento */}
          <label className="flex flex-col gap-1">
            Fecha de Nacimiento
            <input
              type="date"
              className="input"
              {...register("birthdate", {
                required: {
                  value: true,
                  message: "Fecha de nacimiento requerida",
                },
              })}
            />
            {errors.birthdate && (
              <span className="text-sm text-red-500">
                {errors.birthdate.message}
              </span>
            )}
          </label>

          {/* Teléfono */}
          <label className="flex flex-col gap-1">
            Teléfono
            <input
              type="text"
              className="input"
              {...register("phoneNumber", {
                required: {
                  value: true,
                  message: "Número de teléfono requerido",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "El número de teléfono solo puede contener números",
                },
                maxLength: {
                  value: 15,
                  message:
                    "El número de teléfono no puede tener más de 15 caracteres",
                },
              })}
            />
            {errors.phoneNumber && (
              <span className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </span>
            )}
          </label>

          {/* Botón de envío */}
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

export default CreatePage;
