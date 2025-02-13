interface LabelStdProps {
    label: string;
    htmlFor: string;
    className?: string;
    required?: boolean;
  }
  
  export const LabelStd = ({
    htmlFor,
    label,
    className,
    required = false,
  }: LabelStdProps) => {
    return (
      <label htmlFor={htmlFor} className={className}>
        {label} {required && <span className="text-red-700 font-bold">*</span>}
      </label>
    );
  };
  