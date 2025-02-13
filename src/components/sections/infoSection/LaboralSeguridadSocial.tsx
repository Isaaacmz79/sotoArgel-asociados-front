import { InfoCard } from "./InfoCard";
import dLaboral from "../../../images/d-laboral.jpg";
import { bulletListItemClass } from "./InfoSection";

export const LaboralSeguridadSocial = () => {
  return (
    <InfoCard
      reverse={true}
      title="Derecho Laboral y Seguridad Social"
      imageAlt="Hombre escribiendo"
      image={dLaboral}
      description={
        <>
          <p>
            ¿Estás buscando un abogado especialista en Derecho Laboral y
            Seguridad Social?¿Ha tenido problemas con la liquidación de su
            contrato de trabajo?¿No le han reconocido su pensión luego de
            cumplir los requisitos?
          </p>
          <p>Somos especialistas en:</p>
          <ul>
            <li className={bulletListItemClass}>Pensiones.</li>
            <li className={bulletListItemClass}>
              Trámites ante las EPS e IPS.
            </li>
            <li className={bulletListItemClass}>Riesgos laborales.</li>
            <li className={bulletListItemClass}>
              Liquidación de contratos de trabajo.
            </li>
            <li className={bulletListItemClass}>
              Reclamaciones ante empleadores públicos o privados.
            </li>
            <li className={bulletListItemClass}>Otros</li>
          </ul>
        </>
      }
    />
  );
};
