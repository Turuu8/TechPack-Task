import { Fragment } from "react";
import { DialogProps } from "@types";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { CloseButton } from "./CloseButton";

export const Delete = ({ isOpen, closeModal }: DialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-sm transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 text-center">
                  Та устгахдаа итгэлтэй байна уу?
                </Dialog.Title>

                <CloseButton closeModal={closeModal} />
                <div className="mt-4 flex-between px-8 gap-5">
                  <button type="button" className="border w-1/2 py-2 rounded-md" onClick={closeModal}>
                    Үгүй
                  </button>
                  <button type="button" className="border w-1/2 py-2 rounded-md bg-gray-900 text-white" onClick={closeModal}>
                    Тийм
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
