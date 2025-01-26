// src/middleware.js
import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log("Middleware ejecutado para:", req.nextUrl.pathname); // Para depuración

  // Continuar con la solicitud sin realizar ninguna verificación
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Excluir archivos estáticos y rutas internas de Next.js
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Aplicar middleware a todas las rutas API
    "/(api|trpc)(.*)",
  ],
};
