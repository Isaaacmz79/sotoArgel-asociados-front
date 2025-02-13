import Layout from "../../components/Layout/Layout";
import { InquirySection } from "../../components/sections/InquirySection";
import  ConsultaForm  from "../../components/actionables/Form";

export default function Consulta() {
  return (
    <Layout
      headTitle="Alianza Juridica - Consulta gratis"
      headDescription="Consulta juridica especializada gratituita en temas de derecho laboral, seguridad social y accidentes de tránsito."
      keywords="Abogados, Abogado, Asesoría Jurídica, Asesoría Legal, Medellin, Derecho Laboral, Seguridad Social, Accidentes de tránsito, Consulta gratis, Consulta en linea"
    >
      <InquirySection>
        <div className="flex flex-col  max-w-2xl">
          <h1 className="text-bluePrimary font-bold lg:text-4xl md:text-3xl text-2xl">
            Cuéntanos tu caso.
          </h1>
          <p className="font-medium mt-3 text-customGray">
            Llena el formulario a continuación para ser asesorado por uno de
            nuestros especialistas.{" "}
            <span className="font-bold">
              Recibirás una respuesta en menos de 24 horas y de forma totalmente
              gratuita.
            </span>
          </p>
          <ConsultaForm />
        </div>
      </InquirySection>
    </Layout>
  );
}
