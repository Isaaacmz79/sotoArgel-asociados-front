import { InfoSection } from "../components/sections/infoSection/InfoSection";
import Layout from "../components/Layout/Layout";
import { MainBanner } from "../components/sections/MainBannerSection";
import { SecondaryBanner } from "../components/sections/SecondaryBanner";

export default function Home() {
  return (
    <Layout
      headTitle="Alianza Juridica"
      headDescription="Abogados especialistas en derecho laboral, seguridad social y accidentes de tránsito."
      keywords="Abogados, Abogado, Asesoría Jurídica, Asesoría Legal, Medellin, Derecho Laboral, Seguridad Social, Accidentes de tránsito, Consulta gratis, Consulta en linea"
    >
      <MainBanner />
      <InfoSection />
      <SecondaryBanner />
    </Layout>
  );
}
