import { InfoCard } from "./InfoCard";
import accidenteImg from "../../../images/accidente.jpg";
import { bulletListItemClass } from "./InfoSection";

export const Accidentes = () => {
  return (
    <InfoCard
      reverse={false}
      title="Accidentes de tránsito"
      imageAlt="Hombre escribiendo"
      image={accidenteImg}
      description={
        <>
          <p>
            ¿Tuviste un accidente de Tránsito y necesitas asesoría
            legal?¿quedaste con alguna lesión, secuela física o mental después
            de un accidente de Transito? ¿un familiar falleció en accidente de
            tránsito? ¿El seguro del vehículo no quiere responder por los daños?
          </p>
          <p>Somos especialistas en:</p>
          <ul>
            <li className={bulletListItemClass}>
              Reclamación de indemnización por lesiones y muerte en accidente de
              tránsito.
            </li>
            <li className={bulletListItemClass}>
              Reclamación ante la aseguradora por daños ocasionados en
              accidentes.
            </li>
            <li className={bulletListItemClass}>
              Reclamación ante el SOAT por muerte.
            </li>
            <li className={bulletListItemClass}>
              Responsabilidad civil en accidentes de tránsito.
            </li>
            <li className={bulletListItemClass}>Otros</li>
          </ul>
        </>
      }
    />
  );
};
