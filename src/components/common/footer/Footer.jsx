// components/Footer.js
function Footer() {
  return (
    <footer className=" mt-36 border">
      <div className="  flex justify-between items-center ">
        {/* Left side: copyright */}
        <div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
