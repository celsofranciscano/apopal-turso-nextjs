"use client";
import { useState } from "react";
import LogoutButton from "@/components/common/buttons/LogoutButton";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

function ProfileCard() {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const { data: session } = useSession();
  const vari = process.env.AUTH_GOOGLE_SECRET;
  console.log(session?.user);

  const now = new Date();
  const expirationDate = new Date(session?.expires);

  if (now < expirationDate) {
    // console.log("Vigente")
    // console.log("Fecha actual: "+ now)
  } else {
  }

  const toggleCardVisibility = () => {
    setIsCardVisible((prevState) => !prevState);
  };

  return (
    <>
      {session?.user?.image ? (
        <Image
          onClick={toggleCardVisibility}
          className="w-9 h-9 rounded-full cursor-pointer"
          src={session.user.image}
          width={24}
          height={24}
          alt="perfil"
        />
      ) : (
        <div
          onClick={toggleCardVisibility}
          className="w-9 h-9 text-zinc-700 rounded-full cursor-pointer bg-zinc-200  flex items-center justify-center"
        >
          <h1 className="text-center text-xl">
            {(session?.user?.name?.[0] || "").toUpperCase()}
          </h1>
        </div>
      )}

      {isCardVisible && (
        <div className="fixed w-fit h-fit bg-white text-zinc-700 text-sm   border  rounded-b-md top-16 right-4  md:right-10 shadow-md ">
          <div className="flex items-center border-b  p-4">
            {session?.user?.image ? (
              <Image
                width={40}
                height={40}
                className="w-10 m-auto h-10 rounded-full"
                src={session.user.image}
                alt="profile image"
              />
            ) : (
              <div className="w-12 h-12 rounded-full cursor-pointer bg-zinc-200 text-2xl  flex items-center justify-center">
                {session?.user?.name?.charAt(0)?.toUpperCase() || ""}
              </div>
            )}

            <p className="p-2 text-lg">{session?.user?.name}</p>
            
          </div>

          <ul className="grid gap-2 p-4" onClick={toggleCardVisibility}>
            <li>
              <Link
                onClick={toggleCardVisibility}
                href="/dashboard"
                className="flex items-center"
              >
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
                    strokeWidth="2"
                    d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>
            <p>{session?.privilege}</p>
            {/* <li>
              <Link
                onClick={toggleCardVisibility}
                href="/dashboard/profile"
                className="flex items-center"
              >
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
                    strokeWidth="2"
                    d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span>Tu perfil</span>
              </Link>
            </li> */}
          </ul>
          <div className="border-t p-4 ">
            <LogoutButton />
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileCard;
