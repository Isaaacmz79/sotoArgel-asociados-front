import { ComponentWithChildren } from "../../types/components/index";

export const InquirySection = ({ children }: ComponentWithChildren) => {
  return (
    <div className="py-10 px-5 md:px-20 lg:py-12">
      <div className="flex items-start justify-between gap-20">{children}</div>
    </div>
  );
};
