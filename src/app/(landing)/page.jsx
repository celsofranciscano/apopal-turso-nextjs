export default async function Home() {
  return (
    <main>
      <section className=" bg-blue-700 md:bg-fondo h-screen bg-cover pt-20 px-4 md:px-16 grid md:grid-cols-2">
        <div></div>
        <div className="flex flex-col justify-center gap-5 ">
          <h2 className=" font-medium bg-blue-400 text-white px-3 py-1 text-lg  rounded-md w-fit">
            Bienvenido a
          </h2>
          <h2 className="text-6xl font-bold text-white">
            Agua Potable el Palmar
          </h2>
          <p className="text-zinc-200 text-lg">
            Accede a tu cuenta para ver tu consumo de agua y pagar tus facturas
          </p>
          <button className="text-blue-500 bg-white text-xl font-medium px-6 py-2 rounded-md w-fit">
            Ingresar a mi cuenta
          </button>
        </div>
      </section>

     

   
    
    </main>
  );
}
