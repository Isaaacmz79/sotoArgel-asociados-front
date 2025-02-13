import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";

import { MenuMobileProps } from "./types/index-types";
import styles from "../../styles/MenuMobile.module.css";

export const MenuMobile = ({ handleMenu, isOpen }: MenuMobileProps) => {
  const openedMenu = () => (
    <button onClick={handleMenu}>
      <GrClose id={styles.closeButton} className="text-xl" />
    </button>
  );

  const closedMenu = () => (
    <button onClick={handleMenu} className="flex items-center">
      <GiHamburgerMenu className="text-xl" />
    </button>
  );

  return (
    <div className="lg:hidden">{isOpen ? openedMenu() : closedMenu()}</div>
  );
};
