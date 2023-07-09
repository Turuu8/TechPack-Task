import CV from "@models/cv";
import { connectDB } from "@utils/database";
import { ObjectId } from "mongodb";

export const PATCH = async (req: Request) => {
  const { form } = await req.json();
  try {
    await connectDB();
    const exist = await CV.findOne({ education: { $elemMatch: { _id: new ObjectId(form.data._id) } } });
    const filter = exist.education.filter((el: any) => el._id.valueOf() === form.data._id);

    filter[0].country = form.update.country;
    filter[0].degree = form.update.degree;
    filter[0].gpa = form.update.gpa;
    filter[0].occupation = form.update.occupation;
    filter[0].schoolName = form.update.schoolName;
    filter[0].endYear = form.update.endYear;
    filter[0].enstartYear = form.update.enstartYear;

    await exist.save();

    return new Response("Амжилттай шинэчлэгдлээ", { status: 200 });
  } catch (error) {
    return new Response("Олдсонгүй", { status: 500 });
  }
};

export const PUT = async (req: any) => {
  const { form, type } = await req.json();
  try {
    await connectDB();

    if (type === "general") {
      const cvitae = await CV.findOne({ userid: form.userid });

      cvitae.general.aboutMe = form.aboutMe;
      cvitae.general.lastName = form.lastName;
      cvitae.general.firstName = form.firstName;
      cvitae.general.gender = form.gender;
      cvitae.general.idNumber = form.idNumber;
      cvitae.general.birthday = form.birthday;

      await cvitae.save();
      return new Response("Амжилттай хадгаллаа", { status: 200 });
    }
    if (type === "connect") {
      const cvitae = await CV.findOne({ userid: form.userid });

      cvitae.connect.phoneNumber = form.phoneNumber;
      cvitae.connect.email = form.email;
      cvitae.connect.location = form.location;

      await cvitae.save();
      return new Response("Амжилттай хадгаллаа", { status: 200 });
    }
    if (type === "planWork") {
      const cvitae = await CV.findOne({ userid: form.userid });

      cvitae.planWork.salary = form.salary;
      cvitae.planWork.job = form.job;
      cvitae.planWork.workingType = form.workingType;

      await cvitae.save();
      return new Response("Амжилттай хадгаллаа", { status: 200 });
    }
    if (type === "education") {
      const cvitae = await CV.findOne({ userid: form.userid });

      cvitae.education.push({
        degree: form.degree,
        country: form.country,
        schoolName: form.schoolName,
        occupation: form.occupation,
        gpa: form.gpa,
        startYear: form.startYear,
        endYear: form.endYear,
      });
      await cvitae.save();
      return new Response("Амжилттай хадгаллаа", { status: 200 });
    }
    return new Response("Алдаа гарлаа", { status: 500 });
  } catch (error: unknown | any) {
    return new Response(error, { status: 500 });
  }
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    await connectDB();

    const cv = await CV.findOne({ userid: id });

    if (!cv) {
      return new Response("Олдсонгүй", { status: 500 });
    }

    return new Response(JSON.stringify(cv), { status: 200 });
  } catch (error) {
    return new Response("Олдсонгүй", { status: 500 });
  }
};
