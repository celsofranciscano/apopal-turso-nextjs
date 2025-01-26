import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Consulta optimizada: selecciona únicamente los campos necesarios
    const users = await prisma.tbusers.findMany({
      include: {
        tbprivileges: {
          select: {
            privilege: true,
          },
        },
      },
    });

    // Transformar los datos para renombrar campos
    const renamedUsers = users.map((user) => ({
      ID: user.PK_user,
      Nombre: user.firstName,
      Apellido: user.lastName,
      Privilegio: user.tbprivileges.privilege,
      Ingreso: user.lastLogin
        ? new Date(user.lastLogin).toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        : "Nunca",

      Estado: user.status,
      Creado: new Date(user.createdAt).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    }));

    return NextResponse.json(renamedUsers);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
