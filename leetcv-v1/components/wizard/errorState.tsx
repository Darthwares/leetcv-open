export interface ErrorStateProps {
  message: string;
}

const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <p className="text-red-500 font-medium pl-1.5 text-xs md:text-sm">
      {message}
    </p>
  );
};
export default ErrorState;
