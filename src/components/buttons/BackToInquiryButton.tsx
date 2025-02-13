import Link from "next/link";

export const BackToInquiryButton = () => {
  return (
    <button className="w-full border-2 border-blueTertiary text-blueTertiary font-bold py-1.5 shadow-md hover:shadow-lg transition-all">
      <Link href="/consulta">Volver a consultar.</Link>
    </button>
  );
};
