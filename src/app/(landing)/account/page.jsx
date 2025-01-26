import { auth } from "@/lib/auth/auth";
async function AccountPage() {
  const session = await auth();
  if (!session) {
    return (
      <div className="bg-zinc-950 text-white">
        No iniciaste sesion en cuenta de Cliente
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 text-white rounded-md p-4">
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

export default AccountPage;
