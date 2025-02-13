import { ComponentWithChildren } from "../../types/components/index";

export const Subtitle = ({ children }: ComponentWithChildren) => {
  return (
    <h1 className="md:text-xl font-bold mt-5 mb-3 text-center">{children}</h1>
  );
};
