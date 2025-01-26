import AsistenciaTable from "@/components/common/tables/AsistenciaTable";
function Asistencia({params}) {
  const columns = [ "Codigo", "Nombre", "Apellido","Control",];

  return (
    <section className="grid gap-4">
      <AsistenciaTable
        url={`dashboard/activities/${params.PK_activity}/asistencia`}
        columns={columns}
        name={"asistencia"}
        title={"Asistencia"}
        params={params}
      />
    </section>
  );
}

export default Asistencia;
