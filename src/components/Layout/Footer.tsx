import Link from "next/link";
import { MailContactWhite } from "../branding/MailContac";
import { WhatsAppContactWhite } from "../branding/WhatsAppContact";
import { AddressWhite } from "../branding/Address";

export default function Footer() {
  return (
    <footer
      className="
        flex flex-col items-center justify-center w-full py-8 mt-32
        bg-bluePrimary text-white px-5 md:px-10 text-xs md:text-base
      "
    >
      <p className="mb-2 text-center">© Dr. Andrés Soto Argel</p>

      {/* Sección Legal */}
      <div className="w-full flex flex-col items-start md:items-center border-t py-5 gap-2 pt-10">
        <h1 className="font-bold text-left md:text-center">Legal</h1>
        <ul className="flex flex-col gap-2 text-left">
          <Link href="/legal/politica-de-tratamiento-de-datos">
            <li>Política de tratamiento de datos personales</li>
          </Link>
          <Link href="/legal/autorizacion-tratamiento-de-datos">
            <li>Autorización tratamiento de datos</li>
          </Link>
        </ul>
      </div>

      {/* Información de contacto */}
      <div
        className="
          flex flex-col items-center justify-center gap-4
          md:flex-row md:items-center md:gap-6
          w-full text-center md:text-left
        "
      >
        <AddressWhite />
        <WhatsAppContactWhite />
        <MailContactWhite />
      </div>
    </footer>
  );
}
