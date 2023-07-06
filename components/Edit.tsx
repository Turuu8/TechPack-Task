import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CloseButton } from "./CloseButton";
import { DialogProps } from "@types";

export const Edit = ({ isOpen, closeModal, hadldeUpdate, data, jobId, setEditValue, editValue, edit }: DialogProps) => {
  useEffect(() => {
    const value = data?.filter((el: { _id: string }) => jobId === el._id);
    if (edit === "role") {
      setEditValue(value[0]?.role);
    } else {
      setEditValue(value[0]?.jobName);
    }
  }, [jobId]);

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
              <Dialog.Panel
                className={`w-full ${
                  edit === "role" ? "max-w-[220px]" : "max-w-md"
                } transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {edit === "role" ? "Хэрэглэгч & Админ" : "Ажлын Байр"}
                </Dialog.Title>
                <CloseButton closeModal={closeModal} />
                <div className="mt-2">
                  {edit === "role" ? (
                    <select
                      name="cars"
                      id="cars"
                      value={editValue}
                      className="w-full px-3 py-1 border rounded-md text-lg"
                      onChange={(e) => setEditValue(e.target.value)}
                    >
                      <option value="user">Хэрэглэгч</option>
                      <option value="admin">Админ</option>
                    </select>
                  ) : (
                    <input
                      className="w-full px-3 py-1 border rounded-md text-lg"
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  )}
                </div>

                <div className="mt-4">
                  <button type="button" className="border w-full py-2 rounded-md bg-gray-900 text-white" onClick={hadldeUpdate}>
                    Хадгалах
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
