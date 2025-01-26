"use client";
import { useRouter } from "next/navigation";
function BackButton() {
  const router = useRouter();
  return (
    <button onClick={()=>router.back()} className=" flex items-center gap-2">
      <svg
        className="w-5 h-5 text-current"
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
          d="m15 19-7-7 7-7"
        />
      </svg>
      <span>Volver</span>
    </button>
  );
}

export default BackButton;
