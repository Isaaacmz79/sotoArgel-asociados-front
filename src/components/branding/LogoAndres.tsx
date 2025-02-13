import pathToLogo from "../../assets/brading/LogoAndres.svg";

export const LogoAndres = () => {
  return (
    <img
      alt="LogoAndres"
      src={pathToLogo}
      about="Logo de Soto Argel & Asociados S.A.S"
      width={200}
      height={90}
      className="h-auto max-h-12 md:max-h-20 w-auto object-contain"
    />
  );
};
