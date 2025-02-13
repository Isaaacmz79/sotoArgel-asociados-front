import Layout from "../components/Layout/Layout";
import { BackToHomeButton } from "../components/buttons/BackToHomeButton";
export default function Custom404() {
  return (
    <Layout
      headTitle="Alianza Jurídica - Pagina no encontrada"
      headDescription="Estas buscando una página que no existe."
    >
      <div className="flex flex-col items-center justify-start  h-screen mt-28 mx-5">
        <p className="text-2xl">- 404 -</p>
        <h1 className="text-2xl md:text-3xl text-bluePrimary font-bold">
          Página no encontrada
        </h1>
        <p className="text-customGray mt-2">
          Lo sentimos. La página que estas buscando no existe.
        </p>
        <div className="w-44 flex flex-col gap-5 mt-10">
          <BackToHomeButton />
        </div>
      </div>
    </Layout>
  );
}
