import axios from "axios";
import * as yup from "yup";

// From validation
export const SignupValidationSchema = yup.object().shape({
  email: yup.string().email("Имайл буруу байна").required("Имайл хаяг шаардлагатай"),
  firstName: yup.string().required("Овог Нэр шаардлагатай"),
  lastName: yup.string().required("Овог Нэр шаардлагатай"),
  password: yup
    .string()
    .min(8, ({ min }) => `Нууц үг хамгийн багадаа ${min} байх ёстой`)
    .required("Нууц үг шаардлагатай"),
  phoneNumber: yup
    .number()
    .min(8, ({ min }) => `Утасны дугаар хамгийн багадаа ${min} байх ёстой`)
    .required("Утасны дугаар шаардлагатай"),
});

export const LoginValidationSchema = yup.object().shape({
  email: yup.string().email("Имайл буруу байна").required("Имайл хаяг шаардлагатай"),
  password: yup
    .string()
    .min(8, ({ min }) => `Нууц үг хамгийн багадаа ${min} байх ёстой`)
    .required("Нууц үг шаардлагатай"),
});

export const getJobs = async () => {
  try {
    const res = await axios.get("api/jobs");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleleteJob = async (props: string) => {
  try {
    const res = await axios.delete(`api/jobs/${props}`);
    return res.data;
  } catch (error: unknown | any) {
    console.log(error.response);
    // alert(error.response.data);
  }
};
