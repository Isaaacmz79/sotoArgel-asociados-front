import { ComponentWithChildren } from "../../types/components/index";

export const Title = ({ children }: ComponentWithChildren) => {
  return (
    <h1 className="text-xl md:text-2xl font-bold mt-5 mb-3 text-center">
      {children}
    </h1>
  );
};
