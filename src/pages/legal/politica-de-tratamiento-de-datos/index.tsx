import Layout from "../../../components/Layout/Layout";
import { Title } from "../../../components/commons/Title";
import { Subtitle } from "../../../components/commons/Subtitle";
import { FullDocButton } from "../../../components/buttons/FullDocButton";
import { appConfig } from "../../../constants";

const { branding } = appConfig;

export default function PrivacyPolicies() {
  return (
    <Layout
      headTitle="Alianza Jurídica - Politica de tratamiento de datos"
      headDescription="Conoce la política de tratamiento de datos personales de Alianza Jurídica & Servicios Integrales S.A.S."
      keywords="Abogados, Abogado, Asesoría Jurídica, Asesoría Legal, Medellin, Derecho Laboral, Seguridad Social, Accidentes de tránsito, Consulta gratis, Consulta en linea"
    >
      <div className="flex flex-col gap-2 max-w-3xl mx-auto pt-16 pb-20 px-5">
        <h1 className="text-bluePrimary text-xl md:text-2xl font-bold mb-5">
          POLÍTICA DE TRATAMIENTO DE DATOS
        </h1>
        <Title>MANUAL PARA EL TRATAMIENTO DE DATOS PERSONALES</Title>
        Por medio del cual se establece la adopción del manual de política de
        tratamiento de información y protección de datos personales de ALIANZA
        JURÍDICA & SERVICIOS INTEGRALES S.A.S.
        <br />
        <Title>CONSIDERANDO,</Title>
        <br />
        Que por medio de la ley 1581 del año 2012, se establece el régimen
        general de tratamiento de datos personales, cuyo objetivo es garantizar
        el derecho Constitucional que tienen todas las personas para acceder,
        actualizar y corregir la información que se haya recolectado sobre ellas
        en bases de datos o archivos, así como los demás derechos establecidos
        en los artículos 15 y 20 de la Constitución Política.
        <br />
        Que por medio de la ley 1581 del año 2012, se establece el régimen
        general de tratamiento de datos personales, cuyo objetivo es garantizar
        el derecho Constitucional que tienen todas las personas para acceder,
        actualizar y corregir la información que se haya recolectado sobre ellas
        en bases de datos o archivos, así como los demás derechos establecidos
        en los artículos 15 y 20 de la Constitución Política.
        <br />
        Que el Decreto 1377 del 27 de julio del año 2013 reglamentó a ley 1581
        del año 2012, para su implementación y aplicación.
        <br />
        Que, en cumplimiento de la Ley mencionada y su correspondiente Decreto
        reglamentario, se requiere la adopción de un manual interno que
        establezca políticas y procedimientos para proteger la información y los
        datos personales de las personas que han tenido o tienen relación con
        ALIANZA JURÍDICA & SERVICIOS INTEGRALES S.A.S.
        <br />
        En mérito de lo expuesto, el representante legal de ALIANZA JURÍDICA &
        SERVICIOS INTEGRALES S.A.S.
        <br />
        <Subtitle>DECIDE:</Subtitle>
        <br />
        <strong>ARTÍCULO PRIMERO:</strong> Adoptar el siguiente manual interno
        de políticas de tratamiento y protección de datos personales.{" "}
        <strong>Capítulo I. IDENTIFICACIÓN</strong>
        <strong>Nombre de la Institución:</strong>
        ALIANZA JURÍDICA & SERVICIOS INTEGRALES S.A.S.
        <strong>Número de Identificación Tributaria (NIT):</strong>
        <strong>Dirección:</strong>
        {branding.contact.address}
        <strong>Ciudad:</strong>
        Puerto Berrío
        <strong>Correo Electrónico:</strong>
        {branding.contact.mail}
        <strong>Número de Teléfono:</strong>
        {branding.contact.phone}
        <strong>Capítulo II. MARCO LEGAL</strong>
        La Ley Estatutaria 1266 de 2008 (diciembre 31), por la cual, se dictan
        las disposiciones generales del hábeas data y regula el manejo de la
        información contenida en bases de datos personales, en especial la
        financiera, crediticia, comercial, de servicios y la proveniente de
        terceros países. La ley se aplica a todos los datos de información
        personal registrados en un banco de datos, sean estos administrados por
        entidades de naturaleza pública o privada y se dictan otras
        disposiciones.
        <br />
        Decretos reglamentarios 1727/2009 y 2952/2010
        <br />
        LEY ESTATUTARIA 1581 DE 2012 (octubre 17), Por la cual se dictan
        disposiciones generales para la protección de datos personales.
        Reglamentada parcialmente por el Decreto Nacional 1377 de 2013.
        <br />
        Y, demás normas que las modifiquen deroguen o sustituyan.
        <strong>Capítulo III. DISPOSICIONES GENERALES</strong>
        <p className="text-customGray mb-10">...</p>
        <FullDocButton />
      </div>
    </Layout>
  );
}
