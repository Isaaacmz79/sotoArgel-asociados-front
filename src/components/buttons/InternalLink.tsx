import { Link } from "react-router-dom";

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
  customClassName?: string;
}

export const InternalLink = ({
  children,
  href,
  customClassName,
}: InternalLinkProps) => {
  return (
    <Link to={href}>
      <span className={`text-blue-400 ${customClassName}`}>{children}</span>
    </Link>
  );
};
