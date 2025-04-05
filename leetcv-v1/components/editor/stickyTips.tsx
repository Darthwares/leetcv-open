import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { RootTip } from "@constants/defaults";
import Tips from "@components/editor/tips";
import { useTranslations } from "next-intl";
interface RootTipProps {
  stickyTips?: RootTip[];
}
export default function StickyTip({ stickyTips }: RootTipProps) {
  const [tipButton, setTipButton] = useState(true);
  const t = useTranslations("Dashboard");

  return (
    <div className="relative z-[51]" data-testid="stickyTip">
      <Transition.Root show={tipButton} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setTipButton}>
          <div className="fixed inset-0" />​
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <h2
                            id="slide-over-heading"
                            className="text-base font-semibold leading-6 inline-block px-4 text-indigo-700 rounded-t-lg border-b-2 pb-1 border-indigo-700 active"
                          >
                            {t("tips")}
                          </h2>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              data-testid="stickyButton"
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                              onClick={() => setTipButton(false)}
                            >
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <Tips tipData={stickyTips} />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
