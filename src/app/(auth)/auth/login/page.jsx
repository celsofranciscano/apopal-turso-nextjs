"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppContext } from "@/context/appContext";
import GoogleButton from "@/components/common/auth/GoogleButton";

function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { setErrorMessage, setSuccessMessage } = useAppContext();

  return (
    <div className="flex flex-col items-center  justify-center">
      <div className="md:w-1/2  flex flex-col items-center justify-center p-4 rounded-md  gap-8">
        <h1 className="text-2xl font-medium my-4 text-center">Inicia Sesión</h1>

        <GoogleButton />
  
      
      </div>
    </div>
  );
}

export default LoginPage;
