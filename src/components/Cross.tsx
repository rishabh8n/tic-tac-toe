const Cross = ({ className }: { className?: string }) => {
  return (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="22.6274"
        width="9"
        height="32"
        rx="4.5"
        transform="rotate(45 22.6274 0)"
        fill="currentColor"
      />
      <rect
        y="6.36397"
        width="9"
        height="32"
        rx="4.5"
        transform="rotate(-45 0 6.36397)"
        fill="currentColor"
      />
    </svg>
  );
};

export default Cross;
