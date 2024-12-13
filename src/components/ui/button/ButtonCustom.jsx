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
export const ButtonIcon = ({ icon, onClick, className }) => {
  return (
    <button
      className={`w-12 bg-slate-200 hover:bg-slate-400 duration-200 rounded-xl ${className}`}
      onClick={onClick}
    >
      <img src={icon} alt="" />
    </button>
  );
};
export const ButtonAdmin = ({ content, icon, onClick }) => {
  return (
    <Button
      variant="outlined"
      icon={icon}
      className="p-5 rounded-xl text-gray-800 font-bold text-lg bg-purple-400 border-transparent"
      onClick={onClick}
    >
      {content}
    </Button>
  );
};
