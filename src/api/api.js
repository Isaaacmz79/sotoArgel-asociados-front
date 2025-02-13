const API_URL = "/api/consultas"; // Usa ruta relativa


export const getConsultas = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error en la solicitud");
    return await response.json();
  } catch (error) {
    console.error("Error obteniendo las consultas:", error);
    return null;
  }
};
