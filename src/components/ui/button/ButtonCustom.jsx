import { Button } from "antd";

export const ButtonGhost = ({ children, ...props }) => {
  return (
    <Button type="text" {...props}>
      {children}
    </Button>
  );
};

export const ButtonOutLine = ({
  children,
  roundedfull = false,
  className,
  ...props
}) => {
  return (
    <Button
      className={`py-[10px] px-4 text-[#222222] hover:!border-black hover:!text-black ${className} ${
        roundedfull ? "rounded-full" : ""
      }`}
      {...props}
    >
      {children}
    </Button>
  );
};
