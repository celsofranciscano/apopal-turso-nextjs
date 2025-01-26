function PDFgenerate({ filteredData }) {
  const generatePDF = () => {
    if (!filteredData || filteredData.length === 0) {
      console.warn("No hay datos disponibles para exportar.");
      return;
    }

    // Contenido HTML dinámico con estilos
    let htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Reporte de Datos</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: "Arial", sans-serif;
              background-color: #ffffff;
              color: #333;
              line-height: 1.6;
              padding: 50px;
            }
            .container {
              width: 100%;
              margin: 0 auto;
              background: #ffffff;
              padding: 40px;
            }
            .membrete {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
            }
            .membrete img {
              width: 100px;
              height: auto;
            }
            .membrete div {
              flex-grow: 1;
              text-align: center;
            }
            .membrete h1 {
              font-size: 32px;
              font-weight: 800;
              color: #000000;
            }
            .membrete p {
              font-size: 16px;
              color: #000000;
            }
            .lineas div {
              height: 5px;
            }
            .linea-roja {
              background-color: red;
            }
            .linea-amarilla {
              background-color: yellow;
            }
            .linea-verde {
              background-color: green;
            }
            .informacion {
              text-align: center;
              font-size: 16px;
              color: #000000;
              font-weight: 600;
            }
            .titulo {
              font-size: 25px;
              font-weight: 500;
              color: black;
              text-align: center;
              padding: 20px 0;
            }
            .date {
              text-align: right;
              margin-top: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              border: 1px solid #ddd;
            }
            table th,
            table td {
              padding: 12px 15px;
              text-align: left;
              border: 1px solid #ddd;
            }
            table th {
              background-color: #e4e4e7;
              color: black;
              font-weight: bold;
            }
            table tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            table tr:hover {
              background-color: #f1f1f1;
            }
            footer {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 10px 40px;
              background-color: #fff;
              font-size: 14px;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="membrete">
              <img src="/logo.jpg" alt="Logo" />
              <div>
                <h1>Agua Potable el Palmar - APOPAL</h1>
                <p class="informacion">
                  Fundada el 31 de enero de 1995 con PJ 001/95 <br />
                  Afiliado a la Mancomunidad 1º de Mayo - Distrito Nº 9 - Cochabamba - Bolivia
                </p>
              </div>
              <img src="/logo.jpg" alt="Imagen Cochabamba" />
            </div>
            <div class="lineas">
              <div class="linea-roja"></div>
              <div class="linea-amarilla"></div>
              <div class="linea-verde"></div>
            </div>
            <div class="date">
              <p>Fecha de emisión: ${new Date().toLocaleDateString("es-ES")}</p>
              <p>Hora de emisión: ${new Date().toLocaleTimeString("es-ES")}</p>
            </div>
            <h1 class="titulo">Lista de los Socios de Agua Potable El Palmar - APOPAL</h1>
            <section class="table-section">
              <table>
                <thead>
                  <tr>
                    ${Object.keys(filteredData[0])
                      .map((header) => `<th>${header}</th>`)
                      .join("")}
                  </tr>
                </thead>
                <tbody>
                  ${filteredData
                    .map(
                      (row) =>
                        `<tr>${Object.values(row)
                          .map((value) => `<td>${value !== null && value !== undefined ? value : ""}</td>`)
                          .join("")}</tr>`
                    )
                    .join("")}
                </tbody>
              </table>
            </section>
          </div>
          <footer>
            <div>www.apopal.com</div>
            <div>Página 1</div>
          </footer>
        </body>
      </html>
    `;

      // Crear un Blob con el contenido HTML
      const blob = new Blob([htmlContent], { type: "application/pdf" });

      // Crear una URL para el Blob
      const url = URL.createObjectURL(blob);
  
      // Crear un enlace de descarga
      const link = document.createElement("a");
      link.href = url;
      link.download = `Reporte_APOPAL_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Agregar el enlace al documento, hacer clic y eliminarlo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Liberar la URL
      URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={generatePDF}
      className="flex gap-1 text-sm px-4 py-1 rounded-md text-zinc-600 hover:bg-zinc-200"
    >
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
        />
      </svg>
      <span>Generar PDF</span>
    </button>
  );
}

export default PDFgenerate;
