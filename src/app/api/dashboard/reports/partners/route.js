import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url); // Obtenemos los parámetros de la URL
  const code = searchParams.get("code"); // Si hay un parámetro 'code'
  const name = searchParams.get("name"); // Si hay un parámetro 'name'
  console.log("code", code);
  console.log("name", name);

  if (!code && !name) {
    // Si no hay 'code' ni 'name', devolver error
    return NextResponse.json(
      { error: "Debe proporcionar 'code' o 'name' para buscar." },
      { status: 400 }
    );
  }

  try {
    let partners = [];

    if (code) {
      let text = String(code);
      // Si se proporciona un 'code', realiza la búsqueda por código (findUnique porque es único)
      partners = await prisma.tbpartners.findUnique({
        where: { code: text },
      });
      // Si no se encuentra el partner, devolver un array vacío
      if (!partners) {
        return NextResponse.json({ partners });
      }
      // Si se encuentra, devolver el resultado como un array
      partners = [partners];
    } else if (name) {
      // Si se proporciona un 'name', realiza la búsqueda por nombre (findMany con contains)
      partners = await prisma.tbpartners.findMany({
       
        where: {

          firstName: {
            contains: name.toUpperCase()
          },
        },
      });
      // Si no se encuentran resultados por nombre, devolver un array vacío
      if (partners.length === 0) {
        return NextResponse.json({ partners: [] });
      }
    }

    return NextResponse.json({ partners });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
