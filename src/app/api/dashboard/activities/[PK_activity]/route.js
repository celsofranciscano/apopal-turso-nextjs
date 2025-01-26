import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { PK_activity } = params;

  try {
    // Buscar la actividad en la base de datos
    const activity = await prisma.tbactivities.findUnique({
      where: { PK_activity: parseInt(PK_activity) },
      include: {
        tbactivitytypes: true, // Incluir el tipo de actividad relacionado
      },
    });

    if (!activity) {
      return NextResponse.json(
        { error: "Actividad no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    console.error("Error al obtener la actividad:", error);
    return NextResponse.json(
      { error: "Error al obtener la actividad" },
      { status: 500 }
    );
  }
}






export async function PATCH(req, { params }) {
  const { PK_activity } = params;
  const { } = await req.json(); // Los datos enviados desde el cliente

  try {
    // Verificar si la actividad existe
    const existingActivity = await prisma.tbactivities.findUnique({
      where: { PK_activity: parseInt(PK_activity) },
    });

    if (!existingActivity) {
      return NextResponse.json(
        { error: "Actividad no encontrada" },
        { status: 404 }
      );
    }

    // Actualizar la actividad
    const updatedActivity = await prisma.tbactivities.update({
      where: { PK_activity: parseInt(PK_activity) },
      data,
    });

    return NextResponse.json({
      message: "Actividad actualizada correctamente",
      activity: updatedActivity,
    });
  } catch (error) {
    console.error("Error al actualizar la actividad:", error);
    return NextResponse.json(
      { error: "Error al actualizar la actividad" },
      { status: 500 }
    );
  }
}
