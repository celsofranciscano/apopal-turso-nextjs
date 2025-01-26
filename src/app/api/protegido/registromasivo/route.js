
export async function POSTT(request) {
    try {
      // Obtener datos desde la solicitud
      const partners = await request.json(); // Espera un array en la propiedad "partners"
     
  
      // Validar que se recibieron datos
      if (!Array.isArray(partners) || partners.length === 0) {
        return NextResponse.json(
          { error: "Se requiere un array de datos en 'partners'" },
          { status: 400 }
        );
      }
  
      // Crear múltiples registros en la base de datos
      const newPartners = await prisma.tbpartners.createMany({
        data: partners, // Array de datos enviado en la solicitud
        //   skipDuplicates: true, // Opcional: omitir duplicados si hay restricciones únicas
      });
  
      // Responder con el conteo de registros creados
      return NextResponse.json({
        message: "Registros creados exitosamente",
        count: newPartners.count,
      });
    } catch (error) {
      console.error("Error al crear registros:", error);
      return NextResponse.json(
        { error: "Error interno del servidor" },
        { status: 500 }
      );
    }
  }
  