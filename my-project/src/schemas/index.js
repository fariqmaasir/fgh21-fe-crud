import * as yup from "yup";

const validatePassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/;
// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number

export const basicSchema = yup.object().shape({
  name: yup.string().min(4).required("Required"),
  email: yup
    .string()
    .email("Please enter your a valid email")
    .required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(validatePassword, { message: "Please create a strong password" })
    .required("Required"),
});
