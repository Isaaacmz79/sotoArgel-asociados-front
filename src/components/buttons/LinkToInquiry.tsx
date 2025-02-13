import Link from "next/link";
import { ComponentWithCustomClassName } from "../sections/types/index";

interface LinkToInquiryProps extends ComponentWithCustomClassName {
  text: string;
}

export const LinkToInquiry = ({
  text,
  customClassName,
}: LinkToInquiryProps) => {
  return (
    <Link className="m-auto" href="/consulta">
      <p className={`text-center ${customClassName}`}>{text}</p>
    </Link>
  );
};
