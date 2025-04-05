import { Tab } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface TabPage {
  id: string;
  title: string;
  counter?: number;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabPage[];
}

export default function Tabs({ tabs }: TabsProps) {
  return (
    <div className="w-full px-1 mx-auto max-w-5xl sm:px-4 lg:px-8">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/5 p-1">
          {tabs.map((tabPage) => (
            <Tab
              key={tabPage.id}
              data-testid={tabPage.id}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 text-gray-800 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow-md text-gray-800"
                    : "hover:bg-white/[0.12] hover:text-gray-800"
                )
              }
            >
              {tabPage.title}
              {!!tabPage.counter && (
                <span
                  data-testid={`tab-counter-${tabPage.id}`}
                  className="px-2 border-2 border-gray-400 rounded-xl font-bold mx-2"
                >
                  {tabPage.counter > 10 ? "9+" : tabPage.counter}
                </span>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tabPage, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white pt-3",
                "ring-white ring-opacity-60 screen_height"
              )}
            >
              <div data-testid={`tab-content-${tabPage.id}`}>
                {tabPage.content}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
