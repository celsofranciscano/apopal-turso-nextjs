import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const asistencia = await prisma.tbattendances.findMany({
      where: {
        FK_activity: Number(params.PK_activity), // Filtrar por actividad específica
      },
      select: {
        tbpartners: {
          select: {
            code: true, // Código del socio
            firstName: true, // Nombre del socio
            lastName: true, // Apellido del socio
          },
        },
        PK_attendance: true,
        attendanceDate: true, // Fecha y hora de la asistencia
        status: true, // Estado de la asistencia
      },
    });

    // Transformar los datos al formato deseado en español
    const asistenciaEnEspañol = asistencia.map((registro) => ({
      ID: registro.PK_attendance,
      Codigo: registro.tbpartners.code,
      Nombre: registro.tbpartners.firstName,
      Apellido: registro.tbpartners.lastName,
      Control: registro.status,
      Ingreso: registro.attendanceDate
        ? new Date(registro.attendanceDate).toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        : "Nunca",
    }));

    return NextResponse.json(asistenciaEnEspañol);
  } catch (error) {
    console.error("Error al obtener la asistencia:", error);
    return NextResponse.json(
      { error: "Error al obtener la asistencia" },
      { status: 500 }
    );
  }
}

// PATCH: Actualizar la asistencia
export async function PATCH(req, { params }) {
  const { status } = await req.json(); // Obtener los datos enviados en el body
  console.log(status);
  const PK_attendance = params.PK_activity;
  console.log(PK_attendance)
  try {
    // Verificar que se proporcionen los datos requeridos
    if (!status || !PK_attendance) {
      return NextResponse.json(
        { error: "Faltan datos para actualizar la asistencia" },
        { status: 400 }
      );
    }

    // Actualizar la asistencia en la base de datos
    const updatedAttendance = await prisma.tbattendances.update({
      where: {
        PK_attendance: Number(PK_attendance)
      },
      data: {
        status, // Actualizar el estado de la asistencia
        attendanceDate: new Date(), // Actualizar la fecha y hora de la asistencia
      },
    });

    // Si no se encontró ninguna asistencia para actualizar
    if (updatedAttendance.count === 0) {
      return NextResponse.json(
        {
          error:
            "No se encontró asistencia para el socio y actividad especificados",
        },
        { status: 404 }
      );
    }

    // Devolver una respuesta exitosa
    return NextResponse.json({
      message: "Asistencia actualizada exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar la asistencia:", error);
    return NextResponse.json(
      { error: "Error al actualizar la asistencia" },
      { status: 500 }
    );
  }
}
