import { Field } from "formik";

export const Detail = ({ form }) => {
  return (
    <>
      <div className="flex justify-between">
        <span className="mt-4 min-w-[110px]">Миний тухай:</span> <span className="mt-4">{form.general.aboutMe}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Овог:</span> <span className="mt-4">{form.general.lastName}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Нэр:</span> <span className="mt-4">{form.general.firstName}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Төрсөн он:</span> <span className="mt-4">{form.general.birthday}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Хүйс:</span> <span className="mt-4">{form.general.gender}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Регистрийн дугаар:</span> <span className="mt-4">{form.general.idNumber}</span>
      </div>

      <div className="flex-between mt-8">
        <span className="mt-4">И-мэйл хаяг:</span> <span className="mt-4 text-end">{form.connect.email}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Утасны дугаар:</span> <span className="mt-4 text-end">{form.connect.phoneNumber}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Оршин суугаа хаяг:</span> <span className="mt-4 text-end">{form.connect.location}</span>
      </div>

      <div className="flex-between mt-8">
        <span className="mt-4">Ажиллах төрөл:</span> <span className="mt-4 text-end">{form.planWork.workingType}</span>
      </div>
      <div className="flex-between">
        <span className="mt-4">Цалингийн хүлээлт:</span> <span className="mt-4 text-end">{form.planWork.salary}</span>
      </div>
      <div className="flex-between">
        <span className="">Ажиллахаар төлөвлөж буй чиглэл:</span> <span className="mt-4 text-end  w-[300px]">{form.planWork.job}</span>
      </div>

      <div className="mt-8">
        {form.education?.map((el, i) => {
          if (i === 0) {
            return;
          }
          return (
            <div className="border-b border-t rounded-md pb-3 mb-3" key={i}>
              <div className="flex-between">
                <span className="mt-4">Боловсролын зэрэг:</span> <span className="mt-4 text-end">{el.degree}</span>
              </div>
              <div className="flex-between">
                <span className="mt-4">Улс:</span> <span className="mt-4 text-end">{el.country}</span>
              </div>
              <div className="flex-between">
                <span className="mt-4">Сургуулийн нэр:</span> <span className="mt-4 text-end">{el.schoolName}</span>
              </div>
              <div className="flex-between">
                <span className="mt-4">Эзэмшсэн мэргэжил:</span> <span className="mt-4 text-end">{el.occupation}</span>
              </div>
              <div className="flex-between">
                <span className="mt-4">Голч дүн (GPA)::</span> <span className="mt-4 text-end">{el.gpa}</span>
              </div>
              <div className="flex-between">
                <span className="mt-4">Он:</span>{" "}
                <span className="mt-4 text-end">
                  {el.startYear} -{el.endYear}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
