import { Button } from "antd";

export const ButtonGhost = ({ children, className, ...props }) => {
  return (
    <Button className={className} type="text" {...props}>
      {children}
    </Button>
  );
};

export const ButtonOutLine = ({
  children,
  roundedfull = false,
  className,
  type,
  ...props
}) => {
  return (
    <Button
      type={type}
      className={`py-[10px] px-4 text-[#222222] hover:!border-black hover:!text-black ${className} ${
        roundedfull ? "rounded-full" : ""
      }`}
      {...props}
    >
      {children}
    </Button>
  );
};

export const ButtonPrimary = ({ children, className, onClick, ...props }) => {
  return (
    <Button
      className={`!bg-primary text-white font-semibold text-base !outline-none !border-none hover:!text-white hover:!bg-primary/80 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};
