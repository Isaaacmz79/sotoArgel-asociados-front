import { useState } from "react";

export const PrivacyAdvice = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`transition-all flex flex-col w-full border-2 ${
        isOpen ? "border-bluePrimary py-5" : "border-customGray py-1"
      } shadow-md mt-10 px-5 gap-5`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "text-bluePrimary " : "text-customGray "
        } font-extrabold md:text-xl text-center`}
      >
        Aviso de privacidad
      </button>
      {isOpen && (
        <div className="flex flex-col gap-2 text-sm md:text-base">
          <p>
            En ALIANZA JURÍDICA & SERVICIOS INTEGRALES S.A.S respetamos la
            información personal proporcionada por usted y almacenada en
            nuestras bases de datos. De conformidad con el artículo 10 del
            Decreto 1377 de 2013 y la Ley 1581 de 2012, le solicitamos que nos
            proporcione y/o ratifique su autorización para seguir almacenando,
            utilizando, divulgando y procesando sus datos personales para fines
            de atención al cliente, comerciales, de marketing, laborales, de
            comunicación, proyectos, concursos, programas, socialización de
            políticas, resultados, cambios organizacionales, así como para
            realizar análisis estadísticos, comerciales, estratégicos,
            financieros, sociales, laborales, técnicos y de calificación de
            riesgo, respetando los principios y políticas establecidos en la ley
            y en el manual interno adoptado por nuestra empresa, el cual puede
            consultar directamente en nuestras instalaciones o en la página web
            de la entidad.
          </p>
          <p>
            Asimismo, queremos informarle que puede ejercer sus derechos para
            autorizar, conocer, actualizar, rectificar o suprimir la información
            proporcionada, o revocar la autorización otorgada, mediante el envío
            de una comunicación escrita a nuestra sede principal o al correo
            electrónico alianzjuridicamedellin@gmail.com.
          </p>
          <p>
            En virtud del artículo 10 del Decreto 1377 de 2013, si no recibimos
            su solicitud de supresión de sus datos personales dentro de los
            treinta (30) días siguientes al recibo de esta comunicación,
            continuaremos utilizando sus datos para los fines descritos en
            nuestra Política de Privacidad, sin perjuicio de su derecho a
            solicitar la supresión de sus datos en cualquier momento.
          </p>
        </div>
      )}
    </div>
  );
};
