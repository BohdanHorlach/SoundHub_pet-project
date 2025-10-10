export default function SafeArea({ children, className = "" }) {
  return (
    <div className={`xl:px-36 lg:px-36 lg:py-2 md:px-12 md:py-4 px-8 py-0 ${className}`}>
      {children}
    </div>
  );
}