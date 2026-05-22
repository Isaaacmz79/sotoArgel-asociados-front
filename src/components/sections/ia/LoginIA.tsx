import React, { useState } from "react";

const IA_USER = "Legal";
const IA_PASS = "Andres123";

interface LoginIAProps {
  onLogin: () => void;
}

const LoginIA: React.FC<LoginIAProps> = ({ onLogin }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulamos un pequeño delay para UX
    setTimeout(() => {
      if (usuario === IA_USER && contrasena === IA_PASS) {
        sessionStorage.setItem("ia_auth", "1");
        onLogin();
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-5">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-3 h-3 rounded-full bg-blueSecondary inline-block" />
          <h1 className="text-bluePrimary font-bold text-lg">
            Legal Labor Advisor
          </h1>
        </div>

        <h2 className="text-bluePrimary font-bold text-xl mb-1">
          Iniciar sesión
        </h2>
        <p className="text-customGray text-sm mb-6">
          Acceso exclusivo para uso interno.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-blueTertiary mb-1">
              Usuario
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Usuario"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blueSecondary transition-colors"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blueTertiary mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Contraseña"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blueSecondary transition-colors"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="text-sm bg-red-50 border border-red-300 text-red-600 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 bg-bluePrimary text-white font-semibold rounded-lg px-6 py-2.5 text-sm hover:bg-blueTertiary transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Verificando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginIA;
