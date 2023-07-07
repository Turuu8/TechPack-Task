import { Field } from "formik";

export const Connect = () => {
  return (
    <>
      <span className="mt-4">Утасны дугаар:</span>
      <Field placeholder="ИО99221133" name="phoneNumber" type="phoneNumber" className={`w-full px-3 py-1 border rounded-md`} />

      <span className="mt-4">И-мэйл хаяг:</span>
      <Field placeholder="2000-1-1" name="email" type="email" className={`w-full px-3 py-1 border rounded-md`} />

      <span className="mt-4">Оршин суугаа хаяг:</span>
      <p className="text-sm text-gray-500">Дүүрэг, Хороо, (Хотхон, Байр, Тоот / Хэсэг, Гудамж, Тоот)</p>
      <Field placeholder="" name="location" type="location" className={`w-full px-3 py-1 border rounded-md`} />

      <button type="submit" className="border w-full mt-6 py-2 rounded-md bg-gray-900 text-white">
        Хадгалах
      </button>
    </>
  );
};
