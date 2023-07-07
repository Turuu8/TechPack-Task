import { Field } from "formik";

export const PlanWork = ({ jobs }: { jobs: { jobName: string }[] }) => {
  return (
    <>
      <span className="mt-4">Цалингийн хүлээлт:</span>
      <Field as="select" name="salary" type="salary" className={`w-full px-3 py-1 border rounded-md`}>
        <option value="">---</option>
        {salaryList?.map((el, i: number) => (
          <option key={i} value={el}>
            {el}
          </option>
        ))}
      </Field>

      <span className="mt-4">Ажиллахаар төлөвлөж буй чиглэл:</span>
      <Field as="select" name="job" type="job" className={`w-full px-3 py-1 border rounded-md`}>
        <option value="">---</option>
        {jobs?.map((el: { jobName: string }, i: number) => (
          <option key={i} value={el.jobName}>
            {el.jobName}
          </option>
        ))}
      </Field>

      <span className="mt-4">Ажиллах төрөл:</span>
      <Field as="select" name="workingType" type="workingType" className={`w-full px-3 py-1 border rounded-md`}>
        <option value="">---</option>
        {workingTypeList?.map((el, i: number) => (
          <option key={i} value={el}>
            {el}
          </option>
        ))}
      </Field>

      <button type="submit" className="border w-full mt-6 py-2 rounded-md bg-gray-900 text-white">
        Хадгалах
      </button>
    </>
  );
};

const salaryList = [
  "320,000 - 400,000",
  "400,000 - 600,000",
  "600,000 - 800,000",
  "800,000 - 1,000,000",
  "1,000,000 - 1,200,000",
  "1,200,000 - 1,500,000",
  "1,500,000 - 1,800,000",
  "1,800,000 - 2,100,000",
  "2,100,000 - 2,500,000",
  "2,500,000 - 3,000,000",
  "3,000,000 - 4,000,000",
  "4,000,000 - 5,000,000",
  "5,000,000 -ааc дээш",
];

const workingTypeList = ["Бүх цаг боломжтой", "Бүтэн цагийн", "Цагийн", "Ээлжийн", "Улирлаар", "Зайнаас"];
