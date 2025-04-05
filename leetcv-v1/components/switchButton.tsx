import { Switch } from "@headlessui/react";

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

 const SwitchButton = ({ label, checked, onChange }: SwitchProps) => {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={checked}
        onChange={onChange}
        className={classNames(
          checked ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            checked ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm">
        <span className="font-medium text-gray-600">{label}</span>
      </Switch.Label>
    </Switch.Group>
  );
};

export default SwitchButton;