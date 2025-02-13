import { BsWhatsapp } from "react-icons/bs";

import styles from "../../styles/WhatsAppFloatingButton.module.css";
import { appConfig } from "../../constants";

const { branding } = appConfig;

export const WhatsAppFloatingButton = () => {
  return (
    <a
      className={styles.floatingButton}
      href={branding.links.whatsapp}
      target="_blank"
      rel="noreferrer"
    >
      <BsWhatsapp />
    </a>
  );
};
