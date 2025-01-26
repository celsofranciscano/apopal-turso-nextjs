import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

// Obtener datos de un socio por PK_partner (GET) y sus locaciones
export async function GET(req, { params }) {
  const { PK_partner } = params;

  try {
    // Buscar el socio en la base de datos junto con sus locaciones
    const partner = await prisma.tbpartners.findUnique({
      where: { PK_partner: parseInt(PK_partner) },
      include: {
        tblocations: {
          select: {
            latitude: true,
            longitude: true,
            description: true,
          },
        },
      },
    });

    if (!partner) {
      return NextResponse.json(
        { error: "Socio no encontrado" },
        { status: 404 }
      );
    }

    // Si no hay locaciones, agregar un mensaje o un array vacío
    const locations =
      partner.tblocations.length > 0
        ? partner.tblocations.map((location) => ({
            latitude: location.latitude,
            longitude: location.longitude,
            description: location.description,
          }))
        : []; // Si no hay locaciones, retornar un array vacío

    const partnerData = {
      ...partner,
      locations,
    };

    // Eliminar el campo tblocations original
    delete partnerData.tblocations;

    return NextResponse.json(partnerData);
  } catch (error) {
    console.error("Error al obtener el socio:", error);
    return NextResponse.json(
      { error: "Error al obtener el socio" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const { PK_partner } = params;
  const data = await req.json(); // Los datos del formulario enviados desde el cliente

  // Verifica que la fecha birthdate esté en el formato correcto
  if (data.birthdate) {
    data.birthdate = new Date(data.birthdate).toISOString(); // Convertir a formato ISO si es necesario
  }
  try {
    // ValPK_partnerar si el socio existe
    const existingPartner = await prisma.tbpartners.findUnique({
      where: { PK_partner: parseInt(PK_partner) },
    });

    if (!existingPartner) {
      return NextResponse.json(
        { error: "Socio no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar datos del socio
    const updatedPartner = await prisma.tbpartners.update({
      where: { PK_partner: parseInt(PK_partner) },
      data,
    });

    return NextResponse.json({
      message: "Socio actualizado correctamente",
      partner: updatedPartner,
    });
  } catch (error) {
    console.error("Error al actualizar el socio:", error);
    return NextResponse.json(
      { error: "Error al actualizar el socio" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { FK_partner, latitude, longitude, description } = await req.json();

    const data = req.json();

    console.log(data);

    // Verificar que los datos requeridos estén presentes
    if (!FK_partner || !latitude || !longitude) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    // Crear un nuevo registro en la tabla tblocations
    const location = await prisma.tblocations.create({
      data: {
        FK_partner: Number(FK_partner),
        latitude: parseFloat(latitude),

        longitude: parseFloat(longitude),
        description,
      },
    });

    // Responder con el objeto creado
    return new Response(
      JSON.stringify({
        message: "Ubicación creada con éxito",
        location,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Ocurrió un error al crear la ubicación" }),
      { status: 500 }
    );
  }
}
