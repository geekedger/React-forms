import * as yup from "yup";
import { validCountries } from "../data/countries";
export interface IFormData {
  name?: string | undefined;
  age: number;
  email?: string   | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
  gender?: string | undefined;
  terms: boolean; // Required
  picture?: File | FileList | string ; // Required
  country?: string | undefined;
}

// Регулярное выражение для проверки пароля
const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;

// Определение схемы валидации с типизацией
export const formSchema = yup.object<IFormData>().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[A-Z][a-z]*$/, "Name must start with an uppercase letter"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .typeError("Age must be a number")
    .test("is-numeric", "Age must be a number", (value) => !isNaN(value)),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      passwordRegEx,
      "Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character"
    )
    .min(4, "Password must be at least 4 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match") // Ensure that it matches `password`
    .required("Confirm Password is required"),
  gender: yup.string().required("Gender is required"),
  terms: yup.bool().oneOf([true], "You must accept the terms and conditions").required("Terms acceptance is required"),
  picture: yup
  .mixed<File | FileList >()
    .required("Picture is required")
    .test(
      "fileSize",
      "File size is too large. Max allowed size is 1MB",
      (value) => {
        let file: File | undefined;

        if (value instanceof FileList) {
          file = value[0];
        } else if (value instanceof File) {
          file = value;
        }

        if (!file) {
          return false; // Field is required
        }

        return file.size <= 1024 * 1024; // 1MB
      }
    )
    .test("fileType", "Invalid file type", (value) => {
      let file: File | undefined;

      if (value instanceof FileList) {
        file = value[0];
      } else if (value instanceof File) {
        file = value;
      }

      if (!file) {
        return false; // Field is required
      }

      const validTypes = ["image/png", "image/jpeg"];
      return validTypes.includes(file.type);
    }),
  country: yup
    .string()
    .required("Country is required")
    .test(
      "validCountry",
      "Invalid country name",
      (value) => validCountries.includes(value || "")
    ),
});
