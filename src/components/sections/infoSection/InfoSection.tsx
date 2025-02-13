import { SobreNosotros } from "./SobreNosotros";
import { Accidentes } from "./Accidentes";
import { LaboralSeguridadSocial } from "./LaboralSeguridadSocial";

export const bulletListItemClass = "list-disc ml-4";

export const InfoSection = () => {
  return (
    <div>
      <SobreNosotros />
      <LaboralSeguridadSocial />
      <Accidentes />
    </div>
  );
};
