import prisma from "@/lib/db/prisma"; 
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Obtener los tipos de actividad
    const activityTypes = await prisma.tbactivitytypes.findMany();

    // Transformar los datos para renombrar campos
    const renamedActivityTypes = activityTypes.map((activityType) => ({
      ID: activityType.PK_activityType,
      TipoActividad: activityType.activityType,
      Descripcion: activityType.description ? activityType.description : "-",
      Creacion: new Date(activityType.createdAt).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    
    }));

    // Devolver la respuesta con los datos transformados
    return NextResponse.json(renamedActivityTypes);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}




export async function POST(request) {
  try {
    const { activityType, description } = await request.json();


    // Crear el nuevo tipo de actividad
    const newActivityType = await prisma.tbactivitytypes.create({
      data: {
        activityType,
        description: description ? description : null,
      },
    });

    return NextResponse.json({
      message: "Tipo de actividad creado exitosamente",
      status: 201,
      data: newActivityType,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Hubo un error al crear el recurso en el servidor.",
      },
      {
        status: 500,
      }
    );
  }
}
