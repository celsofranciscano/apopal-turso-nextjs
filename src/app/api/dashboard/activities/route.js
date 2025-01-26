import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Obtener todas las actividades
    const activities = await prisma.tbactivities.findMany({
      include: {
        tbactivitytypes: true, // Incluir información del tipo de actividad (si lo deseas)
      },
    });

    // Transformar los datos si es necesario
    const renamedActivities = activities.map((activity) => ({
      ID: activity.PK_activity,
      Actividad: activity.activityName,
      Fecha: new Date(activity.activityDate).toLocaleDateString(
        "es-ES",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      ),
      Inicio: activity.startTime,
      Fin: activity.endTime,
      Ubicacion: activity.location || "-",
      Descripcion: activity.description || "-",
      Tipo: activity.tbactivitytypes.activityType, // Relación con el tipo de actividad
    }));

    return NextResponse.json(renamedActivities);
  } catch (error) {
    console.error("Error al obtener las actividades:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}











export async function POST(request) {
  try {
    const {
      FK_activityType,
      activityName,
      activityDate,
      startTime,
      endTime,
      location,
      description,
    } = await request.json();

    const activityDateTime = new Date(`${activityDate}T${startTime}:00`);
    const startTimeC = new Date(`${activityDate}T${startTime}:00Z`);
    const endTimeC = new Date(`${activityDate}T${endTime}:00Z`);

    // Crear la nueva actividad
    const newActivity = await prisma.tbactivities.create({
      data: {
        FK_activityType: Number(FK_activityType),
        activityName,
        activityDate: activityDateTime,
        startTime: startTimeC,
        endTime: endTimeC,
        location: location || null,
        description: description || null,
      },
    });

    // Obtener todos los socios activos
    const allPartners = await prisma.tbpartners.findMany({
      where: { status: true }, // Considerando que status indica si el socio está activo
      select: { PK_partner: true },
    });

    // Crear registros de asistencia predeterminados como "Falta"
    const attendanceRecords = allPartners.map((partner) => ({
      FK_partner: partner.PK_partner,
      FK_activity: newActivity.PK_activity,
      status: "Falta", // Estado por defecto
    }));

    // Insertar registros en tbattendances
    await prisma.tbattendances.createMany({
      data: attendanceRecords,
    });

    return NextResponse.json({
      message: "Actividad creada exitosamente y socios registrados como falta",
      activity: newActivity,
    });
  } catch (error) {
    console.error("Error al crear la actividad:", error);
    return NextResponse.json(
      { error: "Hubo un error al crear el recurso en el servidor" },
      { status: 500 }
    );
  }
}