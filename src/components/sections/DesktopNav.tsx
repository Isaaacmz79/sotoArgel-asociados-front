
import { ConsultaGratisButtonSm } from "../buttons/ConsultaGratisButtonSm";
import Link from "next/link";
import { SN_ButtonOrLink } from "../buttons/SN_ButtonOrLink";
import { S_ButtonOrLink } from "../buttons/S_ButtonOrLink";

export const DesktopNav = () => {
  return (
    <div className="hidden lg:flex lg:flex-col lg:gap-2">
      
      <div className="flex items-center gap-5 max-w-fit ">
        <ul className="flex items-center gap-5 text-customGray">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <SN_ButtonOrLink />
          </li>
          <li>
            <S_ButtonOrLink />
          </li>
        </ul>
        <ConsultaGratisButtonSm />
      </div>
    </div>
  );
};
