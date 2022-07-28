interface Props {
  label?: string;
  type?: 'submit' | 'button' | 'reset';
  children?: React.ReactNode | JSX.Element;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  label,
  type = 'submit',
  children,
  className,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      className={`btn btn-primary btn-md capitalize ${className}`}
      onClick={onClick}
    >
      {label}
      {children}
    </button>
  );
};
export default Button;
