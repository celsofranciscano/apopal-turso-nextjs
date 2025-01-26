import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Obtener los partners
    const partners = await prisma.tbpartners.findMany();

    // Transformar los datos para renombrar campos
    const renamedPartners = partners.map((partner) => ({
      ID: partner.PK_partner,
      Codigo: partner.code,
      CI: partner.CI,
      Nombre: partner.firstName,
      Apellido: partner.lastName,
      FechaNacimiento: partner.birthdate
        ? new Date(partner.birthdate).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "-", // Si birthdate es null, poner "No disponible",
      Telefono: partner.phoneNumber ? partner.phoneNumber : "-", // Si phoneNumber es null, poner "No disponible"
      Estado: partner.status,
      Registro: new Date(partner.createdAt).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    }));

    // Devolver la respuesta con los datos transformados
    return NextResponse.json(renamedPartners);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}





export async function POST(request) {
  try {
    const { code, CI, firstName, lastName, birthdate, phoneNumber } = await request.json();

    // Verificar si el código ya existe
    const codeFound = await prisma.tbpartners.findUnique({
      where: {
        code,
      },
    });

    if (codeFound) {
      return NextResponse.json(
        {
          error: "El código ya existe",
        },
        {
          status: 400,
        }
      );
    }


    // Crear el nuevo socio
    const newPartner = await prisma.tbpartners.create({
      data: {
        code,
        CI,
        firstName,
        lastName,
        birthdate: birthdate ? new Date(birthdate) : null,
        phoneNumber,
      },
    });

    return NextResponse.json({
      message: "Socio creado exitosamente",
      status: 201,
      data: newPartner,
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
