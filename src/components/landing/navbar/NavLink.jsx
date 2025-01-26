"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ name, href, sublinks, children,isSidebarOpen,setIsSidebarOpen }) {
  const pathname = usePathname();
  const normalizePath = (path) => path.replace(/\/$/, "");
  const isActive =
    normalizePath(pathname) === normalizePath(href) ||
    (sublinks &&
      sublinks.some(
        (sublink) => normalizePath(pathname) === normalizePath(sublink.href)
      ));

  return (
    <li className="relative group">
      <Link
      onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
        href={href}
        className={`hover:bg-zinc-200 md:hover:bg-transparent rounded-md flex justify-between gap-2 items-center py-2 px-4 font-medium hover:text-blue-500 ${
          isActive ? "text-blue-500 bg-zinc-200 md:bg-transparent" : "text-zinc-700"
        }`}
      >
        <div className="flex items-center gap-2">
          {children}
          <span>{name}</span>
        </div>
        {sublinks && (
          <svg
            className="w-5 h-5  text-current group-hover:rotate-180 transition-transform"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="m19 9-7 7-7-7"
            />
          </svg>
        )}
      </Link>

      {sublinks && (
        <ul className="md:absolute bg-white  left-0 hidden group-hover:flex flex-col  rounded-md md:w-48 p-4">
          {sublinks.map((sublink, index) => {
            const isSubActive =
              normalizePath(pathname) === normalizePath(sublink.href);
            return (
              <li key={index} className="flex flex-col">
                <Link
                onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
                  href={sublink.href}
                  className={`hover:bg-zinc-200 rounded-md py-2 px-4 ${
                    isSubActive ? "text-black bg-zinc-200" : "text-zinc-700"
                  } hover:text-black`}
                >
                  {sublink.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default NavLink;
