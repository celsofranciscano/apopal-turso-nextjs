import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
export async function GET() {
  try {
    const newUser = await prisma.tbusers.findMany();

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Hubo un error al crear el recurso en el servidor."
      },
      { status: 500 }
    );
  }
}
