import { useEffect } from "react";

import { LayoutProps } from "../../types/components";
import { Header } from "./Header";
import Footer from "./Footer";
import { WhatsAppFloatingButton } from "../buttons/WhatsAppFloatingButton";

export default function Layout({
  headTitle,
  headDescription: _headDescription,
  children,
  keywords: _keywords,
}: LayoutProps) {
  useEffect(() => {
    document.title = headTitle;
  }, [headTitle]);

  return (
    <div className="flex flex-col min-w-screen min-h-screen scroll-smooth">
      <Header />
      <main className="h-full mt-16 md:mt-28">
        {children} <WhatsAppFloatingButton />
      </main>
      <Footer />
    </div>
  );
}
