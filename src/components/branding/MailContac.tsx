import { MdOutlineEmail } from "react-icons/md";
import { appConfig } from "../../constants";

const { mail } = appConfig.branding.contact;

export const MailContact = () => {
  return (
    <a
      href="mailto:alianzjuridicamedellin@gmail.com?Subject=Solicitud%20de%20consulta"
      target="_top"
      className="flex items-center gap-2"
    >
      <MdOutlineEmail className="text-blueSecondary" />
      <p className="text-customGray text-sm">{mail}</p>
    </a>
  );
};

export const MailContactWhite = () => {
  return (
    <a
      href="mailto:alianzjuridicamedellin@gmail.com?Subject=Solicitud%20de%20consulta"
      target="_top"
      className="flex items-center gap-2"
    >
      <MdOutlineEmail className="text-blueSecondary" />
      <p className="text-white text-sm">{mail}</p>
    </a>
  );
};