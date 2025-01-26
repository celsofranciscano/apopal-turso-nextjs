'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
function CreateLink({name,href}) {
  const pathname = usePathname()
  return (
    <Link
      href={`${pathname}/create`}
      className=" flex gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
    >
      <span>Agregar {name}</span>

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
          d="M5 12h14m-7 7V5"
        />
      </svg>
    </Link>
  );
}

export default CreateLink;
