type Props = {
  className?: string;
};

const KeyForgeLogo = ({ className = "" }: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-white ${className}`}
    >
      {/* Key head */}
      <circle cx="7" cy="17" r="4.5" stroke="currentColor" strokeWidth="2" />
      {/* Key shaft */}
      <line
        x1="10"
        y1="14"
        x2="20"
        y2="4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Key teeth */}
      <line
        x1="14"
        y1="10"
        x2="16"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="17"
        y1="7"
        x2="19"
        y2="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default KeyForgeLogo;
