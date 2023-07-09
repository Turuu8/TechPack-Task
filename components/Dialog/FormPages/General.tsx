import { Field } from "formik";

export const General = () => {
  return (
    <>
      <span className="mt-4">Миний тухай</span>
      <Field as="textarea" name="aboutMe" type="aboutMe" className={`w-full px-3 py-1 h-20 border rounded-md resize-none`} />

      <span className="mt-4">Эцэг/Эхийн нэр:</span>
      <Field name="lastName" type="lastName" className={`w-full px-3 py-1 border rounded-md`} />

      <span className="mt-4">Өөрийн нэр:</span>
      <Field name="firstName" type="firstName" className={`w-full px-3 py-1 border rounded-md`} />

      <span className="mt-4">Регистрийн дугаар:</span>
      <Field placeholder="АЭ99221133" name="idNumber" type="idNumber" className={`w-full px-3 py-1 border rounded-md`} />

      <span className="mt-4">Хүйс:</span>
      <Field as="select" name="gender" type="gender" className={`w-full px-3 py-1 border rounded-md`}>
        <option>---</option>
        <option value="Эрэгтэй">Эрэгтэй</option>
        <option value="Эмэгтэй">Эмэгтэй</option>
      </Field>

      <span className="mt-4">Төрсөн огноо:</span>
      <p className="text-sm text-gray-500">1999-01-30 & 1999/01/30</p>
      <Field name="birthday" type="birthday" className={`w-full px-3 py-1 border rounded-md`} />

      <button type="submit" className="border w-full mt-6 py-2 rounded-md bg-gray-900 text-white">
        Хадгалах
      </button>
    </>
  );
};
