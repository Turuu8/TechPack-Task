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
