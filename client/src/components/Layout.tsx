interface Props {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className = '' }: Props) => {
  return (
    <div
      className={`flex flex-col items-center relative w-full h-screen ${className}`}
    >
      {children}
    </div>
  );
};
export default Layout;
