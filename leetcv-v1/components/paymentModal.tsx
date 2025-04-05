import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { CheckCircleIcon, XIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type MailingList = {
  id: number;
  title: string;
  note: string;
};

interface PaymentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  mailingLists: MailingList[];
  selectedMailingLists: MailingList;
  setSelectedMailingLists: (mailingList: MailingList) => void;
  handleContinue: () => void;
}

const PaymentModal = ({
  isOpen,
  closeModal,
  selectedMailingLists,
  mailingLists,
  setSelectedMailingLists,
  handleContinue,
}: PaymentModalProps) => {
  return (
    <>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 backdrop-blur-sm bg-gray-500/20 bg-opacity-25" />
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
                  <Dialog.Panel className="w-full lg:p-10 py-8 px-2 max-w-xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                    <div className="absolute right-0 top-0 pr-4 pt-4 block">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ring-1 ring-indigo-500 focus:ring-offset-2"
                        onClick={closeModal}
                      >
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium capitalize leading-6 text-gray-900"
                    >
                      {"Select Payment Options"}
                    </Dialog.Title>
                    <div className="mt-2">
                      <RadioGroup
                        value={selectedMailingLists}
                        onChange={setSelectedMailingLists}
                      >
                        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:gap-x-4">
                          {mailingLists.map((mailingList, index) => (
                            <RadioGroup.Option
                              key={mailingList.id}
                              value={mailingList}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-gradient-to-r from-indigo-100 to-pink-200"
                                    : "border-gray-300 bg-white",
                                  "relative flex rounded-lg border-2 p-4 shadow-sm focus:outline-none cursor-pointer"
                                )
                              }
                            >
                              {({ checked }) => (
                                <>
                                  <span className={`flex w-full flex-1`}>
                                    <span className="flex w-full flex-col">
                                      <RadioGroup.Label
                                        as="div"
                                        className="block space-y-2 w-full font-medium"
                                      >
                                        <span className="text-base w-full text-center text-red-500 py-3">
                                          {mailingList.note}
                                        </span>
                                        <p> {mailingList.title}</p>
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                        as="span"
                                        className="mt-6 text-sm"
                                      >
                                        Ensure seamless payment processing
                                        without any disruptions.
                                      </RadioGroup.Description>
                                    </span>
                                  </span>
                                  <CheckCircleIcon
                                    className={classNames(
                                      !checked ? "invisible" : "",
                                      "h-5 w-5"
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span
                                    className={classNames(
                                      checked
                                        ? "border-indigo-600"
                                        : "border-transparent",
                                      "pointer-events-none border absolute -inset-px rounded-lg"
                                    )}
                                    aria-hidden="true"
                                  />
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                        <div className="flex pt-5 justify-end">
                          <button
                            type="button"
                            className="rounded bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
                            onClick={handleContinue}
                          >
                            Continue
                          </button>
                        </div>
                      </RadioGroup>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
};

export default PaymentModal;
