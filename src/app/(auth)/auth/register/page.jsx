"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/appContext";
import GoogleButton from "@/components/common/auth/GoogleButton";


function CreatePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setErrorMessage, setSuccessMessage } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm();



  return (
    <div className=" flex flex-col  items-center justify-center ">
       <div className="md:w-1/2  flex flex-col items-center justify-center p-4 rounded-md  gap-8">
        <h1 className="text-2xl font-medium my-4 text-center">Crear cuenta</h1>

        <GoogleButton />
      
        <p className="text-sm">* Al ingresar aceptas los Términos y condiciones</p>

        <p className="text-center flex gap-1 items-center justify-center">
        <span> ¿Ya tienes cuenta?</span>
        <Link className="text-blue-500" href="/auth/login">
          Iniciar sesión
        </Link>
      </p>
      </div>
  
    </div>
  );
}

export default CreatePage;
