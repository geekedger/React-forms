import * as yup from 'yup';
import { validCountries } from '../data/countries'; 

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z][a-z]*$/, 'Name must start with an uppercase letter'),
    age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .typeError('Age must be a number')
    .test('is-numeric', 'Age must be a number', value => !isNaN(value)), 
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(passwordRegEx, 'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character')
    .min(4, 'Password must be at least 4 characters long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  terms: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  picture: yup
    .mixed<File>()
    .test('fileSize', 'File too large', (value) => {
      console.log('File size:', value); // Отладка значения value
      if (value instanceof File) { // Проверка, что value является экземпляром File
        console.log('File size:', value.size);
        return value.size <= 1024 * 1024; // Ограничение 1MB
      }
      return true; // Если нет файла, пропускаем проверку
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      console.log('File type:', value); // Отладка значения value
      if (value instanceof File) { // Проверка, что value является экземпляром File
        console.log('File type:', value.type);
        return ['image/jpeg', 'image/png'].includes(value.type);
      }
      return true; // Если нет файла, пропускаем проверку
    }),
    country: yup.string()
    .test('validCountry', 'Invalid country name', value => 
      value === '' || validCountries.includes(value || '')
    )
    .required('Country is required'),
});
