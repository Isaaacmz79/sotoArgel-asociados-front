import Layout from "../../../components/Layout/Layout";
import { BackToHomeButton } from "../../../components/buttons/BackToHomeButton";
import { BackToInquiryButton } from "../../../components/buttons/BackToInquiryButton";

export default function SubmitSuccess() {
  return (
    <Layout
      headTitle="Alianza Juridica - Error"
      headDescription="Confirmacion de consulta juridica especializada gratituita."
      keywords="Abogados, Abogado, Asesoría Jurídica, Asesoría Legal, Medellin, Derecho Laboral, Seguridad Social, Accidentes de tránsito, Consulta gratis, Consulta en linea"
    >
      <div className="flex flex-col items-left  m-auto min-h-screen py-10 md:py-20 gap-5 px-5">
        <div className="max-w-xl mx-auto flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl text-bluePrimary font-bold">
            Algo salio mal...
          </h1>
          <p className="text-customGray md:text-xl">
            Hemos tenido un error interno, tu consulta no ha sido enviada.
            Puedes intentarlo de nuevo o{" "}
            <a
              className="text-blue-500 font-bold"
              href="https://wa.link/6xtfw7"
              target="_blank"
              rel="noreferrer"
            >
              comunicarte con nosotros a través de nuestro WhatsApp
            </a>
          </p>
          <div className="w-full flex flex-col gap-5 mt-5">
            <BackToHomeButton />
            <BackToInquiryButton />
          </div>
        </div>
      </div>
    </Layout>
  );
}
