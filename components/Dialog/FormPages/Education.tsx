import { Field } from "formik";

export const Education = () => {
  return (
    <>
      <span className="mt-4">Боловсролын зэрэг:</span>
      <Field as="select" name="degree" type="degree" className={`w-full px-3 py-1 border rounded-md`}>
        <option value="">---</option>
        {degreeList.map((el, i) => (
          <option key={i} value={el}>
            {el}
          </option>
        ))}
      </Field>

      <span className="mt-4">Улс:</span>
      <Field as="select" name="country" type="country" className={`w-full px-3 py-1 border rounded-md`}>
        <option value="">---</option>
        {countryList.map((el, i) => (
          <option key={i} value={el}>
            {el}
          </option>
        ))}
      </Field>

      <span className="mt-4">Сургуулийн нэр:</span>
      <Field name="schoolName" type="schoolName" className={`w-full px-3 py-1 border rounded-md`} />

      <span className="mt-4">Эзэмшсэн мэргэжил:</span>
      <Field name="occupation" type="occupation" className={`w-full px-3 py-1 border rounded-md`} />

      <span className="mt-4">Голч дүн (GPA):</span>
      <p className="text-sm text-gray-500">99.0% & 3.9</p>
      <Field name="gpa" type="gpa" className={`w-full px-3 py-1 border rounded-md`} />

      <span className="mt-4">Элссэн он:</span>
      <Field as="select" name="startYear" type="startYear" className={`w-full px-3 py-1 border rounded-md`}>
        <option value="">---</option>
        {yearList.reverse().map((el, i) => (
          <option key={i} value={el}>
            {el}
          </option>
        ))}
      </Field>

      <span className="mt-4">Төгссөн он:</span>
      <Field as="select" name="endYear" type="endYear" className={`w-full px-3 py-1 border rounded-md`}>
        <option value="">---</option>
        <option value="Одоо сурч байгаа">Одоо сурч байгаа</option>
        {yearList.map((el, i) => (
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

const degreeList = ["Доктор", "Магистр", "Бакалавр", "Мэргэшсэн", "Тусгай дунд", "Бүрэн дунд", "Бүрэн бус дунд", "Бага"];

const yearList = [
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
  "2005",
  "2004",
  "2003",
  "2002",
  "2001",
  "2000",
  "1999",
  "1998",
  "1997",
  "1996",
  "1995",
  "1994",
  "1993",
  "1992",
  "1991",
  "1990",
  "1989",
  "1988",
  "1987",
  "1986",
  "1985",
  "1984",
  "1983",
  "1982",
  "1981",
  "1980",
  "1979",
  "1978",
  "1977",
  "1976",
  "1975",
  "1974",
  "1973",
];

const countryList = [
  "Румын",
  "Монгол",
  "Орос",
  "Хятад",
  "Япон",
  "Солонгос",
  "Австрали",
  "Австри",
  "Америк",
  "Аргентин",
  "Белги",
  "Болгар",
  "Бразил",
  "Вьетнам",
  "Герман",
  "Голланд",
  "Грек",
  "Дани",
  "Египет",
  "Индонези",
  "Ирланд",
  "Испани",
  "Итали",
  "Их Британи",
  "Казакстан",
  "Канад",
  "Люксембург",
  "Малайз",
  "Мороко",
  "Норвеги",
  "Польш",
  "Сингапур",
  "Тайвань",
  "Тайланд",
  "Турк",
  "Унгар",
  "Финланд",
  "Франц",
  "Чех",
  "Швед",
  "Швейцарь",
  "Шинэ Зеланд",
  "Шри Ланка",
  "Энэтхэг",
];
