import { ConsultaGratisBordered } from "../buttons/ConsultaGratisBordered";
import transportation from "../../assets/icons/transportation.svg";
import workBag from "../../assets/icons/work-bag.svg";
import styles from "../../styles/Home.module.css";

export const MainBanner = () => {
  return (
    <div className="flex flex-col">
      <div className={`${styles.primaryBannerBg} md:basis-3/4 md:h-auto`}>
        <div
          className="
          flex flex-col items-center w-full text-white md:basis-3/4 md:h-auto
          py-32 px-5
          md:py-22 md:px-24
          lg:py-32 lg:px-24
          backdrop-brightness-[35%]"
        >
          <div>
            <h1 className="text-center text-xl md:text-2xl lg:text-4xl max-w-4xl">
              ¿Necesitas asesoría legal en temas de derecho laboral, seguridad
              social o accidentes de tránsito?
            </h1>
            <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-bold">
              Contáctanos y recibirás tu respuesta en cuestión de horas.
            </h2>
            <ConsultaGratisBordered />
          </div>
        </div>
      </div>
      <div
        className={`${styles.secondaryBannerBg} flex flex-col md:px-5 lg:flex-row lg:flex z-20 items-center justify-between basis-1/4 gap-5 md:gap-10 text-white py-10 lg:px-20 xl:px44`}
      >
        <h3 className="text-lg text-center md:text-start px-5 md:px-0 md:text-xl max-w-sm">
          Especialistas en Derecho Laboral, Seguridad Social y Accidentes de
          Tránsito
        </h3>
        <div className="flex flex-col md:flex-row gap-10 md:gap-5 text-lg md:text-xl">
          <div className="flex flex-col items-center justify-center">
            <img src={workBag} alt="Maletín de trabajo" />
            <p>Derecho Laboral</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src={transportation} alt="Vehículos" />
            <p>Accidentes de tránsito</p>
          </div>
        </div>
      </div>
    </div>
  );
};
