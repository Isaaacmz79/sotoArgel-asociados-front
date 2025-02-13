import Head from "next/head";

import { LayoutProps } from "../../types/components";
import { Header } from "./Header";
import Footer from "./Footer";
import { WhatsAppFloatingButton } from "../buttons/WhatsAppFloatingButton";

export default function Layout({
  headTitle,
  headDescription,
  children,
  keywords,
}: LayoutProps) {
  return (
    <div className="flex flex-col min-w-screen min-h-screen scroll-smooth">
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={headDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-full mt-16 md:mt-28">
        {children} <WhatsAppFloatingButton />
      </main>
      <Footer />
    </div>
  );
}
