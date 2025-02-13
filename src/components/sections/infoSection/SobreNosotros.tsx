import { InfoCard } from "./InfoCard";
import quienesSomos from "../../../images/quienes-somos-img.webp";

export const SobreNosotros = () => {
  return (
    <InfoCard
      reverse={false}
      title="Sobre nosotros"
      imageAlt="La justicia levantando una balanza."
      image={quienesSomos}
      description={
        <>
          <p>
            Nuestro equipo está formado por profesionales altamente capacitados
            y comprometidos con brindar soluciones eficientes y efectivas a sus
            problemas legales. Nos especializamos en Derecho Laboral, Seguridad
            Social y Accidentes de Tránsito, y contamos con la experiencia
            necesaria para brindar asesoramiento, realizar trámites y
            representar legalmente a nuestros clientes. Ofrecemos atención de
            forma presencial y en línea de forma permanente, con especialistas
            en cada área de trabajo para garantizar la mejor calidad en cada
            servicio que ofrecemos.
          </p>
          <p>
            En nuestra oficina, la calidad humana y académica de nuestros
            profesionales es nuestra mayor fortaleza. Nos enfocamos en ofrecer
            soluciones inmediatas pero eficaces, demostrando nuestro
            profesionalismo y responsabilidad en cada caso que se nos presenta.
            Con nosotros, puede estar seguro de que sus asuntos legales estarán
            en las mejores manos.
          </p>
        </>
      }
    />
  );
};
