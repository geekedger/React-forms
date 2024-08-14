import React from 'react';
import { useDispatch } from 'react-redux';
import { setUncontrolledFormData } from '../redux/formSlice';
import { formSchema } from '../schemas/validationSchema';
import { useNavigate } from 'react-router-dom';

const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await formSchema.validate(data, { abortEarly: false });
      
      // Преобразуем изображение в base64
      const file = formData.get('picture') as File;
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          // Проверяем, что reader.result не равен null перед присвоением
          data.picture = reader.result.toString();
          dispatch(setUncontrolledFormData(data));
          navigate('/');
        }
      };
      reader.readAsDataURL(file);
    } catch (validationErrors) {
      console.log('Validation failed', validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="number" />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" />
      </div>

      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender">
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label htmlFor="terms">Accept Terms & Conditions</label>
        <input id="terms" name="terms" type="checkbox" />
      </div>

      <div>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" name="picture" type="file" />
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <input id="country" name="country" list="country-options" />
        <datalist id="country-options">
          <option value="USA" />
          <option value="Canada" />
          {/* Добавьте сюда остальные страны */}
        </datalist>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
