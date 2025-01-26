"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLinkDashboard({ links }) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-2 border-b  text-zinc-700 bg-white shadow-md px-4 pt-2 rounded-md">
        {links.map((link) => {
          // Verifica si la ruta coincide exactamente con el path o es una subruta
          const isActive = pathname === link.path;

          return (
            <li
              key={link.path}
              className={`pb-2 rounded-t hover:border-b-2 hover:border-blue-500 ${
                isActive ? "border-b-2  border-blue-500 text-blue-500" : ""
              }`}
            >
              <Link
                className=" px-2 py-1 hover:text-blue-500"
                href={link.path}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavLinkDashboard;
