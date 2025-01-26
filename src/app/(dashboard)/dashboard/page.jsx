import { auth } from "@/lib/auth/auth";

export default async function Page() {
  // const session = await auth();




  return (
    <div className=" bg-white shadow-md rounded-md p-4">
      {/* <pre>{JSON.stringify(session, null, 2)}</pre>
      h1
      
      */}
      <h1 className="text-xl font-semibold text-center">
        Bienvenido al sistema de APOPAL
      </h1>
    </div>
  );
}
