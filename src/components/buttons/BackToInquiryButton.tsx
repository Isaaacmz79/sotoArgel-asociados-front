import { Link } from "react-router-dom";

export const BackToInquiryButton = () => {
  return (
    <button className="w-full border-2 border-blueTertiary text-blueTertiary font-bold py-1.5 shadow-md hover:shadow-lg transition-all">
      <Link to="/consulta">Volver a consultar.</Link>
    </button>
  );
};
