import { Link } from "react-router-dom";
import { ComponentWithCustomClassName } from "../sections/types/index";

interface LinkToInquiryProps extends ComponentWithCustomClassName {
  text: string;
}

export const LinkToInquiry = ({
  text,
  customClassName,
}: LinkToInquiryProps) => {
  return (
    <Link className="m-auto" to="/consulta">
      <p className={`text-center ${customClassName}`}>{text}</p>
    </Link>
  );
};
