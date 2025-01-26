// src\lib\auth\auth.js
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/lib/db/prisma"; // Asegúrate de que el archivo prisma está configurado correctamente.

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await prisma.tbusers.findUnique({
          where: { email: profile.email },
        });

        if (!existingUser) {
          // Si el usuario no existe, registrarlo como "Cliente"
          const defaultPrivilege = await prisma.tbprivileges.findUnique({
            where: { privilege: "Cliente" },
          });

          await prisma.tbusers.create({
            data: {
              email: profile.email,
              firstName: profile.given_name || profile.name.split(" ")[0],
              lastName:
                profile.family_name ||
                profile.name.split(" ").slice(1).join(" "),
              profileImage: profile.picture,
              FK_privilege: defaultPrivilege.PK_privilege,
              lastLogin: new Date(), // Registrar el primer inicio de sesión
            },
          });

          token.privilege = "Cliente"; // Asignar privilegio por defecto
        } else {
          // Si el usuario ya existe, actualizar la marca de tiempo de la última conexión
          await prisma.tbusers.update({
            where: { email: profile.email },
            data: {
              lastLogin: new Date(), // Actualizar con la fecha y hora actual
            },
          });
          // Asignar el privilegio actual del usuario
          const userPrivilege = await prisma.tbprivileges.findUnique({
            where: { PK_privilege: existingUser.FK_privilege },
          });
          token.privilege = userPrivilege.privilege;
        }

        // Guardar datos del perfil en el token
        token.user = {
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Transferir el valor de 'privilege' desde el token a la sesión
      session.privilege = token.privilege;
      // Asegurarse de que los datos del usuario estén en la sesión
      session.user = token.user;
      return session;
    },
  }
});
