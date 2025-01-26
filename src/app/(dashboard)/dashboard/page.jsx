import { auth } from "@/lib/auth/auth";

export default async function Page() {
  const session = await auth();



  if (!session) {
    return <div className="bg-zinc-950 text-white">No iniciaste sesion</div>;
  }

  return (
    <div className=" bg-white shadow-md rounded-md p-4">
      <pre>{JSON.stringify(session, null, 2)}</pre>
     
    </div>
  );
}
