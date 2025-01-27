"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function GoogleButton() {
  const router = useRouter();
  const { data: session, status } = useSession(); // Obtiene la sesión y el estado

  // Redirige cuando la sesión está activa
  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
    }
  }, [session, router]);

  // Si la sesión está en proceso de carga, no hace nada
  if (status === "loading") {
    return null;
  }
  return (
    <button
      onClick={() => signIn("google")}
      className="flex  w-full justify-center gap-4 bg-zinc-100 hover:bg-zinc-200 shadow-md  rounded-md py-3 px-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 184 184"
        className="inline-block"
        fill="currentColor"
        height="30"
        width="30"
      >
        <path
          d="M40.778,199.771l-6.4,23.91-23.409.5a92.161,92.161,0,0,1-.677-85.909h.005l20.841,3.821,9.13,20.716a54.906,54.906,0,0,0,.516,36.967Z"
          transform="translate(0 -88.578)"
          fill="#fbbb00"
        ></path>
        <path
          d="M350,208.176a91.965,91.965,0,0,1-32.8,88.932l-.005-.005-26.25-1.339-3.715-23.192a54.831,54.831,0,0,0,23.591-28H261.628v-36.4H350Z"
          transform="translate(-167.605 -133.363)"
          fill="#518ef8"
        ></path>
        <path
          d="M169.136,361.955l.005.005A92.03,92.03,0,0,1,30.509,333.814l29.814-24.405a54.716,54.716,0,0,0,78.847,28.014Z"
          transform="translate(-19.545 -198.215)"
          fill="#28b446"
        ></path>
        <path
          d="M169.061,21.18l-29.8,24.4A54.709,54.709,0,0,0,58.6,74.227L28.629,49.69h-.005A92.019,92.019,0,0,1,169.061,21.18Z"
          transform="translate(-18.337)"
          fill="#f14336"
        ></path>
      </svg>
      <span className="text-lg">Continuar con Google</span>
    </button>
  );
}

export default GoogleButton;
