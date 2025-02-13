import { ConsultaGratisBordered } from "../buttons/ConsultaGratisBordered";
import styles from "../../styles/Home.module.css";

export const SecondaryBanner = () => {
  return (
    <div className="flex flex-col ">
      <div
        className={`
          ${styles.secondaryBannerBg}        
          flex flex-col gap-4 items-center justify-center basis-3/4 z-20 text-white bg-blueTertiary
          py-12 px-5 
          md:py-22 md:px-24
          shadow-md
          `}
      >
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl">
          Consulta gratis
        </h1>
        <h2 className="text-center text-xl md:text-xl lg:text-2xl font-bold px-5">
          Recibe asesoría personalizada en solo unas horas.
        </h2>
        <ConsultaGratisBordered />
      </div>
    </div>
  );
};
