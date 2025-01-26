// src/middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Configuración de las rutas protegidas con roles específicos
const routePermissions = [
  { route: "/dashboard/settings/*", roles: ["Superadministrador"] },
  { route: "/dashboard/*", roles: ["Administrador", "Superadministrador"] },
  { route: "/account/*", roles: ["Cliente", "Superadministrador", "Administrador", "Invitado"] },
  { route: "/api/dashboard/*", roles: [ "Superadministrador", "Administrador", "Invitado"] },
  { route: "/api/settings/*", roles: [ "Superadministrador", "Administrador", "Invitado"] },
];

// Función para convertir rutas dinámicas a expresiones regulares
const convertToRegex = (route) =>
  new RegExp("^" + route.replace(/:[a-zA-Z0-9]+/g, "([^/]+)") + "(?:/.*)?$");

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const secret = process.env.AUTH_SECRET;

  // Obtén el token de la cookie de sesión
  const token = await getToken({ req, secret });
  const isLoggedIn = !!token;
  // PK_partner(token)

  // Si el usuario no está autenticado y la ruta no es protegida, continuar
  if (!isLoggedIn && !routePermissions.some(({ route }) => convertToRegex(route).test(pathname))) {
    return NextResponse.next();
  }

  // Si el usuario no está autenticado y la ruta es protegida, redirigir al login
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Si el usuario está autenticado, comprobar los privilegios
  for (const { route, roles } of routePermissions) {
    const routeRegex = convertToRegex(route);

    // Si la ruta coincide y el usuario no tiene el rol adecuado, redirigir al inicio
    if (routeRegex.test(pathname) && !roles.includes(token.privilege)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Si pasa todas las validaciones, continuar con la petición
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Excluir archivos estáticos y rutas internas de Next.js
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Siempre ejecutar para rutas API
    "/(api|trpc)(.*)",
  ],
};
