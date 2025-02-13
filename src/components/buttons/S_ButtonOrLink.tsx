import { useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export const S_ButtonOrLink = ({ mobile = false }: { mobile?: boolean }) => {
  const location = useLocation(); // Usa useLocation de React Router
  const serviciosEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    serviciosEl.current = document.getElementById("derecho-laboral-y-seguridad-social");
  }, []);

  if (location.pathname === "/") {
    return (
      <button
        onClick={() => {
          serviciosEl.current?.scrollIntoView({
            behavior: "smooth",
            block: mobile ? "start" : "center",
          });
        }}
      >
        Servicios
      </button>
    );
  } else {
    return <Link to="/#derecho-laboral-y-seguridad-social">Servicios</Link>;
  }
};