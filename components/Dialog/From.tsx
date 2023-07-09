import { Fragment, useEffect, useState } from "react";
import { FromProps } from "@types";
import { Dialog, Transition } from "@headlessui/react";
import { CloseButton } from "./CloseButton";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { Connect, Detail, Education, General, PlanWork } from "./FormPages";

export const From = ({ isOpen, closeModal, handleSubmit, from, type }: FromProps) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      if (type === "planWork") {
        const res = (await axios.get("api/jobs")).data;
        setJobs(res);
      }
    })();
  }, []);

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
                className={`w-full  ${
                  type === "detail" ? "max-w-3xl" : "max-w-md"
                } transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                <Dialog.Title as="h3" className="text-xl text-center font-medium leading-6 text-gray-900">
                  {type === "general" && "Ерөнхий мэдээлэл"}
                  {type === "connect" && "Холбоо барих мэдээлэл"}
                  {type === "planWork" && "Ажиллахаар төлөвлөж буй ажлын байр"}
                  {type === "education" && "Боловсрол"}
                  {type === "detail" ? null : <p className="text-sm text-gray-500">Монголоор бөглөн үү</p>}
                </Dialog.Title>
                <CloseButton closeModal={closeModal} />
                <Formik initialValues={from} onSubmit={handleSubmit}>
                  <Form className="flex flex-col">
                    {type === "general" && <General />}
                    {type === "connect" && <Connect />}
                    {type === "planWork" && <PlanWork jobs={jobs} />}
                    {type === "education" && <Education />}
                    {type === "detail" && <Detail form={from} />}
                  </Form>
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
