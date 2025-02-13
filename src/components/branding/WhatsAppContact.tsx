import { BsWhatsapp } from "react-icons/bs";
import { appConfig } from "../../constants";

const { contact, links } = appConfig.branding;

export const WhatsAppContact = () => {
  return (
    <a
      href={links.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 "
    >
      <BsWhatsapp className="text-blueSecondary" />
      <p className="text-customGray text-sm">{contact.phone}</p>
    </a>
  );
};

export const WhatsAppContactWhite = () => {
  return (
    <a
      href={links.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 "
    >
      <BsWhatsapp className="text-blueSecondary" />
      <p className="text-white text-sm">{contact.phone}</p>
    </a>
  );
};
