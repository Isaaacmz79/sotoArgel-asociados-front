import Link from "next/link";

export const BackToHomeButton = () => {
  return (
    <button className="w-full bg-blueTertiary border-2 border-blueTertiary text-white font-bold py-1.5 shadow-md hover:shadow-lg transition-all">
      <Link href="/">Volver al inicio.</Link>
    </button>
  );
};
