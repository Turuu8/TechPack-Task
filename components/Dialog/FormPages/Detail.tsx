import { Field } from "formik";

export const Detail = ({ form }) => {
  return (
    <>
      <div className="flex flex-col pb-3 rounded-md border-b">
        <span className="mt-4">Миний тухай:</span> <span className="mt-2 w-full text-center text-gray-500 font-medium">{form.general.aboutMe}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Овог:</span> <span className="mt-4 text-gray-500 font-medium">{form.general.lastName}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Нэр:</span> <span className="mt-4 text-gray-500 font-medium">{form.general.firstName}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Төрсөн он:</span> <span className="mt-4 text-gray-500 font-medium">{form.general.birthday}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Хүйс:</span> <span className="mt-4 text-gray-500 font-medium">{form.general.gender}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Регистрийн дугаар:</span> <span className="mt-4 text-gray-500 font-medium">{form.general.idNumber}</span>
      </div>

      <div className="flex-between mt-8">
        <span className="mt-4">И-мэйл хаяг:</span> <span className="mt-4 text-gray-500 font-medium">{form.connect.email}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Утасны дугаар:</span> <span className="mt-4 text-gray-500 font-medium">{form.connect.phoneNumber}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Оршин суугаа хаяг:</span> <span className="mt-4 text-gray-500 font-medium">{form.connect.location}</span>
      </div>

      <div className="flex-between mt-8">
        <span className="mt-4">Ажиллах төрөл:</span> <span className="mt-4 text-gray-500 font-medium">{form.planWork.workingType}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Цалингийн хүлээлт:</span> <span className="mt-4 text-gray-500 font-medium">{form.planWork.salary}</span>
      </div>
      <div className="flex-between">
        <span className="">Ажиллахаар төлөвлөж буй чиглэл:</span>{" "}
        <span className="mt-4 text-gray-500 font-medium text-end w-[300px]">{form.planWork.job}</span>
      </div>

      <div className="mt-8">
        {form.education?.map((el, i) => {
          if (i === 0) {
            return;
          }
          return (
            <div className="border-b border-t rounded-md pb-3 mb-3" key={i}>
              <div className="flex-between">
                <span className="mt-4">Боловсролын зэрэг:</span> <span className="mt-4 text-gray-500 font-medium">{el.degree}</span>
              </div>
              <div className="flex-between">
                <span className="mt-4">Улс:</span> <span className="mt-4 text-gray-500 font-medium">{el.country}</span>
              </div>
              <div className="flex-between">
                <span className="mt-4">Сургуулийн нэр:</span> <span className="mt-4 text-gray-500 font-medium">{el.schoolName}</span>
              </div>
              <div className="flex-between">
                <span className="mt-4">Эзэмшсэн мэргэжил:</span> <span className="mt-4 text-gray-500 font-medium">{el.occupation}</span>
              </div>
              <div className="flex-between">
                <span className="mt-4">Голч дүн (GPA):</span> <span className="mt-4 text-gray-500 font-medium">{el.gpa}</span>
              </div>
              <div className="flex-between">
                <span className="mt-4">Он:</span>{" "}
                <span className="mt-4 text-gray-500 font-medium">
                  {el.startYear} - {el.endYear}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
