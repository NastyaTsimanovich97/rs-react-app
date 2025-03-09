interface IButtonProps {
  label: string;
  handleClick: () => void;
  className?: string;
}

export function Button({ label, handleClick, className }: IButtonProps) {
  return (
    <button className={className} onClick={handleClick}>
      {label}
    </button>
  );
}
