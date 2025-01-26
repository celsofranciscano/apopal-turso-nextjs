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
          // Si el usuario no existe, rechazar el login
          throw new Error("El usuario no existe en la base de datos.");
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
  },
});
