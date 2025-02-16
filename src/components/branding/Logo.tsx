import pathToLogo from "../../assets/brading/logo.svg";

export const Logo = () => {
  return (
    <img
      alt="Logo"
      src={pathToLogo}
      about="Logo de Alianza Jurídica y Servicio Integrales S.A.S"
      width={200}
      height={100}
      className="h-8 md:h-14 w-auto object-contain"
    />
  );
};