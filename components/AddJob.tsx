import { Fragment } from "react";
import { AddJobsProps } from "@types";
import { Dialog, Transition } from "@headlessui/react";
import { CloseButton } from "./CloseButton";

export const AddJob = ({ isOpen, closeModal, handleSubmit, handleChange, value }: AddJobsProps) => {
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
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900">
                  Ажлын нэр ээ олуулан уу ?
                </Dialog.Title>
                <CloseButton closeModal={closeModal} />
                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Монголоор бичнэ үү</p>
                    <input className="w-full px-3 py-1 border rounded-md text-lg" type="text" value={value} onChange={handleChange} />
                  </div>

                  <div className="mt-4">
                    <button type="submit" className="border w-full py-2 rounded-md bg-gray-900 text-white">
                      Нэмэх
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
