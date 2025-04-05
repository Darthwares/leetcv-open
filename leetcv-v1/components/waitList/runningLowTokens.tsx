interface RunningLowProps {
  title: string;
  buttonType: JSX.Element;
}

export default function RunningLow({ title, buttonType }: RunningLowProps) {
  return (
    <div className="flex md:items-center gap-2">
      <div className="flex items-center relative right-2 sm:gap-2">
        <img src="/icons/alert.gif" alt="alert" className="w-10 h-10" />
        <p className="relative sm:-left-3.5">{title}</p>
      </div>
      <span>{buttonType}</span>
    </div>
  );
}
