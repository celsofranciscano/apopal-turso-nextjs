import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

// Obtener datos de un tipo de actividad por PK_activityType (GET)
export async function GET(req, { params }) {
  const { PK_activityType } = params;

  try {
    // Buscar el tipo de actividad en la base de datos
    const activityType = await prisma.tbactivitytypes.findUnique({
      where: { PK_activityType: parseInt(PK_activityType) },
    });

    if (!activityType) {
      return NextResponse.json(
        { error: "Tipo de actividad no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(activityType);
  } catch (error) {
    console.error("Error al obtener el tipo de actividad:", error);
    return NextResponse.json(
      { error: "Error al obtener el tipo de actividad" },
      { status: 500 }
    );
  }
}





// Actualizar datos de un tipo de actividad por PK_activityType (PATCH)
export async function PATCH(req, { params }) {
  const { PK_activityType } = params;
  const data = await req.json(); // Los datos enviados desde el cliente

  try {
    // Verificar si el tipo de actividad existe
    const existingActivityType = await prisma.tbactivitytypes.findUnique({
      where: { PK_activityType: parseInt(PK_activityType) },
    });

    if (!existingActivityType) {
      return NextResponse.json(
        { error: "Tipo de actividad no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar el tipo de actividad
    const updatedActivityType = await prisma.tbactivitytypes.update({
      where: { PK_activityType: parseInt(PK_activityType) },
      data,
    });

    return NextResponse.json({
      message: "Tipo de actividad actualizado correctamente",
      activityType: updatedActivityType,
    });
  } catch (error) {
    console.error("Error al actualizar el tipo de actividad:", error);
    return NextResponse.json(
      { error: "Error al actualizar el tipo de actividad" },
      { status: 500 }
    );
  }
}
