import prisma from "@/lib/db/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.tbusers.findMany();

  return NextResponse.json(users);
}
