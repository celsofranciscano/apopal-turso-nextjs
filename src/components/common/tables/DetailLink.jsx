'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
function DetailLink({ id }) {
  const pathname = usePathname()
  return (
    <Link href={`${pathname}/${id}`}>
      <svg
        className="w-6 h-6 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6z" />
        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      </svg>
    </Link>
  );
}

export default DetailLink;
