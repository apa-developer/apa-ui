"use client";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ className, children, onClick }: Props) {
  return (
    <button
      role="button"
      aria-label="Click to perform an action"
      onClick={onClick}
      className={`text-sm font-semibold shadow-[2px_2px_0_0_#000] border-2 border-black bg-sky-300 h-[35px] px-4 rounded hover:translate-x-[2px] hover:shadow-none hover:translate-y-[2px] ${className}`}>
      {children}
    </button>
  );
}
