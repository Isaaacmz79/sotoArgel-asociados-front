import Layout from "../../../components/Layout/Layout";

export default function DataProcessingAuthorization() {
  return (
    <Layout
      headTitle="Alianza Jurídica - Autorización de tratamiento de datos"
      headDescription="Autorización de tratamiento de datos personales para Alianza Jurídica & Servicios Integrales S.A.S."
      keywords="Abogados, Abogado, Asesoría Jurídica, Asesoría Legal, Medellin, Derecho Laboral, Seguridad Social, Accidentes de tránsito, Consulta gratis, Consulta en linea"
    >
      <div className="flex flex-col gap-2 max-w-3xl mx-auto pt-16 pb-20 px-5">
        <h1 className="text-bluePrimary text-xl md:text-2xl font-bold mb-5">
          AUTORIZACIÓN DE TRATAMIENTO DE DATOS PERSONALES
        </h1>
        <p>
          En calidad de cliente y/o usuario de ALIANZA JURÍDICA & SERVICIOS
          INTEGRALES S.A.S Certifico que:{" "}
        </p>
        <p>
          En observancia de lo establecido por la Ley 1581 de 2012 y el Decreto
          1377 de 2013, ALIANZA JURÍDICA & SERVICIOS INTEGRALES S.A.S ha sido
          respetuosa con la información personal proporcionada por mí y
          almacenada en sus bases de datos. Por lo tanto, y en cumplimiento de
          dichas disposiciones, me han comunicado lo siguiente:{" "}
        </p>
        <ol>
          <li>
            1. Se han aplicado todas las medidas de seguridad, protección,
            privacidad y confidencialidad necesarias en la gestión de esa
            información, tal como lo establece la ley y el manual interno de
            tratamiento de datos personales de la entidad.
          </li>
          <li>
            2. Me informan que la información está a mi disposición para que la
            revise, actualice, corrija o elimine mediante la comunicación por
            cualquier medio en su sede principal o mediante los canales de
            comunicación electrónica que estén disponibles a través de su
            secretaría.
          </li>
        </ol>
        <p>
          Para estos fines, la entidad me ha proporcionado adecuadamente sus
          datos de contacto, tales como dirección, número telefónico, sitio web
          y correo electrónico.
        </p>
        <p>
          Por consiguiente, doy mi autorización expresa a ALIANZA JURÍDICA &
          SERVICIOS INTEGRALES S.A.S para tratar y transferir mis datos
          personales almacenados en sus bases de datos, siempre que no se trate
          de información considerada como datos sensibles según lo definido en
          la Ley 1581 de 2012, o en caso de que sean datos sensibles, siempre
          que se apliquen alguna de las excepciones previstas en dicha ley.
        </p>
      </div>
    </Layout>
  );
}
