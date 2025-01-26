import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db/prisma";


export async function POST(request) {
  try {
    const { firstName, lastName, email, password } = await request.json();
    const emailFound = await prisma.tbusers.findUnique({
      where: {
        email: email,
      },
    });
    if (emailFound) {
      return NextResponse.json(
        {
          error: "Ya existe el email",
        },
        {
          status: 400,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.tbusers.create({
      data: {
        FK_privilege: 1,
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "Usuario creado exitosamente",
      status: 201,
    });
  } catch (error) {
    console.log(error);
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
