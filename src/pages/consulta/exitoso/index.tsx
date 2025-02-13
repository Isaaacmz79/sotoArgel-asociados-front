import { PrivacyAdvice } from "../../../components/actionables/PrivacyAdvice";
import Layout from "../../../components/Layout/Layout";
import { BackToHomeButton } from "../../../components/buttons/BackToHomeButton";
import { BackToInquiryButton } from "../../../components/buttons/BackToInquiryButton";

export default function SubmitSuccess() {
  return (
    <Layout
      headTitle="Alianza Juridica - Consulta exitosa"
      headDescription="Confirmacion de consulta juridica especializada gratituita."
      keywords="Abogados, Abogado, Asesoría Jurídica, Asesoría Legal, Medellin, Derecho Laboral, Seguridad Social, Accidentes de tránsito, Consulta gratis, Consulta en linea"
    >
      <div className="flex flex-col items-left  m-auto min-h-screen py-10 md:py-20 gap-5 px-5">
        <div className="max-w-xl mx-auto flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl text-bluePrimary font-bold">
            Consulta exitosa!
          </h1>
          <p className="text-customGray md:text-xl">
            Tu consulta se ha envido exitosamente. Muy pronto uno de nuestros
            especialistas se pondrá en contacto contigo.
          </p>
          <div className="w-full flex flex-col gap-5 mt-5">
            <BackToHomeButton />
            <BackToInquiryButton />
          </div>
        </div>
        <div className="max-w-3xl mx-auto">
          <PrivacyAdvice />
        </div>
      </div>
    </Layout>
  );
}
