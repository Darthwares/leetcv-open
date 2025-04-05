import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { trpc } from "@utils/trpc";
import { userIdState } from "@state/state";
import { useRecoilState } from "recoil";
import { GemsSvg } from "@components/svg";

const RewardUI = ({
  isOpen,
  setIsOpen,
  unitName,
  currentLesson,
  courseName,
  difficulty,
  setIsChestOpen,
}: {
  isOpen: boolean;
  unitName: string;
  currentLesson: string;
  courseName: string;
  difficulty: string;
  setIsOpen: (open: boolean) => void;
  setIsChestOpen: (open: boolean) => void;
}) => {
  const [showChest, setShowChest] = useState(false);
  const [showGems, setShowGems] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [userId] = useRecoilState(userIdState);

  const updateOpenedChest = trpc.useMutation([
    "fs.leetCourse.updateChestOpened",
  ]);

  const { data: courseGems } = trpc.useQuery(
    ["fs.leetCourse.getLeetCourseGems", { id: userId }],
    {
      enabled: !!userId,
    }
  );

  function closeModal() {
    updateOpenedChest.mutate({
      unitName: unitName,
      currentLesson: currentLesson,
      courseName: courseName,
      difficulty: difficulty,
    });
    setIsOpen(false);
    setIsChestOpen(true);
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

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

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
            <div className="flex min-h-96 items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col items-center justify-center min-h-96 bg-white text-white p-4">
                    <div
                      className={`flex items-center gap-2 absolute top-4 right-4 transition-opacity duration-500 ${
                        showChest ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <GemsSvg className="w-8 text-indigo-400" />
                      <span className="text-indigo-400 text-xl">
                        {courseGems?.gems}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                      <div
                        className={`text-indigo-400 text-4xl font-bold transition-all duration-500 mt-5 ${
                          showGems
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                      >
                        +5 gems
                      </div>

                      <div
                        className={`relative transition-all duration-500 h-full scale-100 opacity-100"`}
                      >
                        <lottie-player
                          src="/assets/lottie/diamonds-chest.json"
                          background="white"
                          speed="1"
                          loop
                          autoplay
                          data-testid="lottie"
                        ></lottie-player>
                      </div>

                      <div
                        className={`text-center space-y-2 transition-all duration-500 ${
                          showText
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                      >
                        <h2 className="text-2xl font-bold text-gray-800">
                          Enjoy your reward!
                        </h2>
                        <p className="text-gray-600">
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
                        <button
                          onClick={() => closeModal()}
                          className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2"
                        >
                          <span className="text-xl">💎</span> Claim 5 Gems
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
