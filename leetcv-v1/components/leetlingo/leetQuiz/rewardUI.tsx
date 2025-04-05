import React, { useEffect, useState, Fragment } from "react";
import { Gem } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";

const RewardUI = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const [showChest, setShowChest] = useState(false);
  const [showGems, setShowGems] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const sequence = async () => {
      setShowChest(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setShowGems(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setShowText(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setShowButtons(true);
    };
    sequence();
  }, []);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[61]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
                    <div
                      className={`flex items-center gap-2 absolute top-4 right-4 transition-opacity duration-500 ${
                        showChest ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Gem className="text-indigo-400" size={24} />
                      <span className="text-indigo-400 text-xl">5541</span>
                    </div>

                    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                      <div
                        className={`text-indigo-400 text-4xl font-bold transition-all duration-500 ${
                          showGems
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                      >
                        +5 gems
                      </div>

                      <div
                        className={`relative transition-all duration-500 ${
                          showChest
                            ? "scale-100 opacity-100"
                            : "scale-50 opacity-0"
                        }`}
                      >
                        <div className="w-24 h-24 bg-amber-500 rounded-lg flex items-center justify-center shadow-lg">
                          <div className="w-20 h-20 bg-amber-700 rounded-md flex items-center justify-center">
                            <Gem className="text-indigo-400 w-12 h-12 animate-pulse" />
                          </div>
                        </div>
                        <div className="absolute -top-2 -right-2 animate-bounce">
                          <Gem className="text-indigo-400 w-4 h-4 opacity-50" />
                        </div>
                        <div
                          className="absolute -top-1 -left-2 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        >
                          <Gem className="text-indigo-400 w-3 h-3 opacity-40" />
                        </div>
                      </div>

                      <div
                        className={`text-center space-y-2 transition-all duration-500 ${
                          showText
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                      >
                        <h2 className="text-2xl font-bold">
                          Enjoy your reward!
                        </h2>
                        <p className="text-gray-400">
                          Keep making great progress!
                        </p>
                      </div>

                      <div
                        className={`flex flex-col w-full gap-4 mt-4 transition-all duration-500 ${
                          showButtons
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                      >
                        <button className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2">
                          <span className="text-xl">💎</span>  Claim 10 Gems
                        </button>
                        <button
                          onClick={closeModal}
                          className="w-full text-gray-400 hover:text-gray-300 transition-colors py-2"
                        >
                          NO THANKS
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RewardUI;