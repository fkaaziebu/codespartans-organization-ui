export const CheckIcon = ({ color = "#D5D7DA" }: { color?: string }) => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={20} height={20} rx={10} fill={color} />
      <path
        d="M6.25 10L8.75 12.5L13.75 7.5"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
