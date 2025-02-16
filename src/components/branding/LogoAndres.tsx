import pathToLogo from "../../assets/brading/LogoAndres.svg";

export const LogoAndres = () => {
  return (
    <img
      alt="LogoAndres"
      src={pathToLogo}
      about="Logo de Soto Argel & Asociados S.A.S"
      width={220}
      height={100}
      className="h-auto max-h-16 md:max-h-24 w-auto object-contain"
    />
  );
};
