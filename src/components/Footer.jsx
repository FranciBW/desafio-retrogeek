export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto">
      <div className="container py-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
        <span className="small">
          © {new Date().getFullYear()} RetroGeek - Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}