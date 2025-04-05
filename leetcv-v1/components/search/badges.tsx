export interface BadgeProps {
  name: string;
  length: number;
}

export const Badges = (props: BadgeProps) => {
  return (
    <div data-testid="badges">
      {props.length > 0 && (
        <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
          <span>{props.name}</span>
          <svg
            className="mr-1.5 ml-1.5 h-2 w-2 text-indigo-400"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx={4} cy={4} r={3} />
          </svg>
          <span>{props.length}</span>
        </span>
      )}
    </div>
  );
};
