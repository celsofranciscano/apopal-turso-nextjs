"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Tooltip from "@/components/common/tooltip/Tooltip";
import SubmitButton from "../buttons/SubmitButton";
import { useAppContext } from "@/context/appContext";

function CardAsistencia({ params, id }) {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attendance, setAttendance] = useState(null);
  const { setErrorMessage, setSuccessMessage } = useAppContext();

  const FK_activity  = params.PK_activity;
  const PK_partner = id;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const cardRef = useRef(null);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  // Fetch asistencia data
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `/api/attendance/${PK_partner}/${FK_activity}`
        );
        setAttendance(response.data);
        reset(response.data); // Reset form with fetched data
        setValue("PK_partner", PK_partner); // Set PK_partner in the form
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    if (PK_partner && FK_activity) {
      fetchAttendance();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [PK_partner, FK_activity, reset, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Include PK_partner in the data when updating
     const response= await axios.patch(`/api/dashboard/activities/${id}/asistencia`, data);
      setSuccessMessage(response.data.message);

      setShowOptions(false);
    } catch (error) {
      console.error("Error updating attendance:", error);
      setErrorMessage(error.response?.data?.error || "Ocurrió un error");

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="inline-block" ref={cardRef}>
      <Tooltip content="Marcar asistencia" position="top">
        <button
          className="hover:bg-zinc-200 rounded-md shadow-md p-2"
          onClick={toggleOptions}
        >
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
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </Tooltip>

      {showOptions && (
        <>
          {/* Fondo translúcido */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowOptions(false)}
          ></div>

          {/* Modal centrado */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 w-full max-w-md shadow-2xl rounded-md z-50 py-8">
            <h1 className="text-2xl text-black font-medium pb-4 text-center ">
              Marcar asistencia
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Estado */}
              <div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Presente"
                      {...register("status", {
                        required: "Estado es requerido",
                      })}
                      className="hidden peer"
                    />
                    <span className="px-4 py-2 rounded-md border-2 border-gray-400 text-gray-700 peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-green-500 transition-colors duration-300 cursor-pointer">
                      Presente
                    </span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Retraso"
                      {...register("status", {
                        required: "Estado es requerido",
                      })}
                      className="hidden peer"
                    />
                    <span className="px-4 py-2 rounded-md border-2 border-gray-400 text-gray-700 peer-checked:bg-yellow-500 peer-checked:text-white peer-checked:border-yellow-500 transition-colors duration-300 cursor-pointer">
                      Retraso
                    </span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Falta"
                      {...register("status", {
                        required: "Estado es requerido",
                      })}
                      className="hidden peer"
                    />
                    <span className="px-4 py-2 rounded-md border-2 border-gray-400 text-gray-700 peer-checked:bg-red-500 peer-checked:text-white peer-checked:border-red-500 transition-colors duration-300 cursor-pointer">
                      Falta
                    </span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Permiso"
                      {...register("status", {
                        required: "Estado es requerido",
                      })}
                      className="hidden peer"
                    />
                    <span className="px-4 py-2 rounded-md border-2 border-gray-400 text-gray-700 peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500 transition-colors duration-300 cursor-pointer">
                      Permiso
                    </span>
                  </label>
                </div>
                {errors.status && (
                  <p className="text-sm text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </div>

              {/* Botón de Enviar */}
              <div className="flex items-center justify-between gap-4 mt-4">
                <button
                  type="button"
                  className="text-sm text-black bg-zinc-200 px-4 py-2 rounded-md"
                  onClick={() => setShowOptions(false)}
                >
                  Cancelar
                </button>
                <SubmitButton
                  isLoading={isLoading}
                  name={"Actualizar Asistencia"}
                />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default CardAsistencia;
