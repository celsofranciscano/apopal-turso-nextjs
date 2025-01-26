"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "@/context/appContext";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import LinkButton from "@/components/common/buttons/LinkButton";

function DetailPage({ params }) {
  const [partnerData, setPartnerData] = useState(null);
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
    // Cargar datos existentes del socio
    const fetchPartnerData = async () => {
      try {
        const response = await axios.get(
          `/api/dashboard/partners/${params.PK_partner}`
        );
        setPartnerData(response.data);

        // Si hay datos de locación, los establecemos en el formulario
        if (response.data.locations.length > 0) {
          const location = response.data.locations[0]; // Solo usamos la primera locación
          setValue("latitude", location.latitude);
          setValue("longitude", location.longitude);
          setValue("description", location.description);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage(
          error.response?.data?.error ||
            "No se pudo cargar la información del socio"
        );
      }
    };

    fetchPartnerData();
  }, [params, setErrorMessage, setValue]);

  // Manejar el envío del formulario de locación
  const handleLocationSubmit = async (data) => {
    setIsLoading(true);
    setValue("FK_partner", partnerData?.PK_partner);
    console.log(data)
    try {
      // Enviar los datos de la nueva locación
      await axios.post(
        `/api/dashboard/partners/${params.PK_partner}`,
        data
      );
      // Actualizar los datos del socio después de agregar la locación
      const response = await axios.get(
        `/api/dashboard/partners/${params.PK_partner}`
      );
      setPartnerData(response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.error || "Error al guardar la locación"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid gap-4">
      <section className="p-4 bg-white shadow-md grid gap-4 rounded-md">
        <h1 className="font-medium text-2xl pb-4 border-b">
          Detalles del Socio
        </h1>

        {partnerData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-zinc-700">
            {/* Código */}
            <label className="flex flex-col gap-1">
              Código
              <input
                type="text"
                className="input"
                value={partnerData.code}
                disabled
              />
            </label>

            {/* CI */}
            <label className="flex flex-col gap-1">
              CI
              <input
                type="text"
                className="input"
                value={partnerData.CI}
                disabled
              />
            </label>

            {/* Nombre */}
            <label className="flex flex-col gap-1">
              Nombre
              <input
                type="text"
                className="input"
                value={partnerData.firstName}
                disabled
              />
            </label>

            {/* Apellido */}
            <label className="flex flex-col gap-1">
              Apellido
              <input
                type="text"
                className="input"
                value={partnerData.lastName}
                disabled
              />
            </label>

            {/* Fecha de nacimiento */}
            <label className="flex flex-col gap-1">
              Fecha de Nacimiento
              <input
                type="date"
                className="input"
                value={partnerData.birthdate}
                disabled
              />
            </label>

            {/* Teléfono */}
            <label className="flex flex-col gap-1">
              Teléfono
              <input
                type="text"
                className="input"
                value={partnerData.phoneNumber}
                disabled
              />
            </label>

            {/* Si no tiene locaciones */}
            {partnerData.locations.length === 0 ? (
              <div className=" md:col-span-3  mt-4 pt-4 border-t  gap-2">
                <form
                  onSubmit={handleSubmit(handleLocationSubmit)}
                  className="grid md:grid-cols-3 gap-4"
                >
                  <h2 className="text-xl font-medium md:col-span-3">
                    Registrar la ubicacion exacta del socio
                  </h2>
                  <label className="flex flex-col gap-1">
                    Latitud
                    <input
                      type="text"
                      className="input"
                      {...register("latitude", {
                        required: "La latitud es requerida",
                       
                      })}
                    />
                    {errors.latitude && (
                      <span className="text-red-500">
                        {errors.latitude.message}
                      </span>
                    )}
                  </label>

                  <label className="flex flex-col gap-1">
                    Longitud
                    <input
                      type="text"
                      className="input"
                      {...register("longitude", {
                        required: "La longitud es requerida",
                       
                      })}
                    />
                    {errors.longitude && (
                      <span className="text-red-500">
                        {errors.longitude.message}
                      </span>
                    )}
                  </label>

                  <label className="flex flex-col gap-1">
                    Descripción
                    <input
                      type="text"
                      className="input"
                      {...register("description")}
                    />
                  </label>
                  <SubmitButton
                    isLoading={isLoading}
                    name={"Registrar ubicacion"}
                  />
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-2 md:col-span-3">
                <h2 className="text-xl font-medium">Ubicacion del Socio</h2>
                {partnerData.locations.map((location, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <span>{location.description}</span>
                  
                    <LinkButton href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`} name={"Ver en Google Maps"} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p>Cargando datos...</p>
        )}
      </section>
    </section>
  );
}

export default DetailPage;
