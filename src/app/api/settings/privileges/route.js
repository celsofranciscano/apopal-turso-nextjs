import prisma from "@/lib/db/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const privileges = await prisma.tbprivileges.findMany();

    return NextResponse.json(privileges);
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
