import Link from "next/link";
import { WhatsAppContact } from "../branding/WhatsAppContact";

import { ConsultaGratisButtonSm } from "../buttons/ConsultaGratisButtonSm";
import { MailContact } from "../branding/MailContac";
import { MenuMobileProps } from "../actionables/types/index-types";
import { Address } from "../branding/Address";
import { useRef, useEffect } from "react";
import { S_ButtonOrLink } from "../buttons/S_ButtonOrLink";
import { SN_ButtonOrLink } from "../buttons/SN_ButtonOrLink";

export const MobileNav = ({ handleMenu }: MenuMobileProps) => {
  const sobreNosotrosEl = useRef<HTMLElement | null>(null);
  const serviciosEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    sobreNosotrosEl.current = document.getElementById("sobre-nosotros");
    serviciosEl.current = document.getElementById(
      "derecho-laboral-y-seguridad-social"
    );
  }, []);

  return (
    <nav className="absolute z-50  flex flex-col items-center justify-center gap-5 w-full p-5 bg-white border-t-2 border-bluePrimary shadow-md">
      <ul className="flex flex-col items-center justify-center gap-5 text-customGray">
        <li onClick={handleMenu}>
          <Link href="/">Inicio</Link>
        </li>
        <li onClick={handleMenu}>
          <SN_ButtonOrLink mobile={true} />
        </li>
        <li onClick={handleMenu}>
          <S_ButtonOrLink mobile={true} />
        </li>
      </ul>
      <ConsultaGratisButtonSm />
      <div className="flex flex-col items-center gap-3 mt-5">
        <WhatsAppContact />
        <MailContact />
        <Address />
      </div>
    </nav>
  );
};
