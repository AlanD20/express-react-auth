interface Props {
  label: string;
  type: 'text' | 'email' | 'password';
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  required?: boolean;
  autoComplete?: string;
}

const TextInput = ({
  label,
  type,
  name,
  className,
  onChange,
  required,
  autoComplete,
}: Props) => {
  return (
    <div className="input-container mb-2 [&+.input-container]:mb-4">
      <label htmlFor={name} className="label capitalize">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className={`input input-bordered border-2 border-solid input-md w-full text-base focus:outline-none focus:border-gray-500 ${className}`}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
};
export default TextInput;
