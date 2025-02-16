import { useEffect, useState } from "react";

interface Consulta {
  _id: string;
  expIdentifier: string;
  fullName: string;
  documentId: string;
      email: string;
      phone: string;
      problemDescription: string;
      town: string;
      contactMethod: string;
      privacyPolicy: boolean;
  // Otras propiedades que necesites...
}

function Consultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        // Si has configurado el proxy, puedes usar "/api/consultas" directamente.
        const response = await fetch("https://sotoargel-asociados.onrender.com/api/consultas");

        if (!response.ok) throw new Error("Error en la solicitud");
        const data = await response.json();
        if (data.ok) {
          setConsultas(data.consultas);
        }
      } catch (error) {
        console.error("Error obteniendo las consultas:", error);
      }
    };

    fetchConsultas();
  }, []);

  return (
    <div>
      <h1>Lista de Consultas</h1>
      {consultas.length > 0 ? (
        <ul>
          {consultas.map((consulta) => (
            <li key={consulta._id}>
              <strong>{consulta.expIdentifier}</strong> - {consulta.fullName} - {consulta.documentId} - {consulta.email} - {consulta.phone} - {consulta.problemDescription} - 
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay consultas registradas.</p>
      )}
    </div>
  );
}

export default Consultas;
