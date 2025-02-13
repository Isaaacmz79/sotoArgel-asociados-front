import { useLocation } from "react-router-dom"; // Usa React Router
import { Link } from "react-router-dom"; // Usa React Router
import { useRef, useEffect } from "react";

export const SN_ButtonOrLink = ({ mobile = false }: { mobile?: boolean }) => {
  const location = useLocation(); // Obtiene la ubicación actual
  const sobreNosotrosEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    sobreNosotrosEl.current = document.getElementById("sobre-nosotros");
  }, []);

  if (location.pathname === "/") {
    return (
      <button
        onClick={() => {
          sobreNosotrosEl.current?.scrollIntoView({
            behavior: "smooth",
            block: mobile ? "start" : "center",
          });
        }}
      >
        Sobre nosotros
      </button>
    );
  } else {
    return <Link to="/#sobre-nosotros">Sobre nosotros</Link>;
  }
};