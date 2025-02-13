export interface ComponentWithChildren {
    children: React.ReactNode;
  }
  
  export const InputErrorStd = ({ children }: ComponentWithChildren) => {
    return <p className="text-red-400 text-sm ">{children}</p>;
  };
  