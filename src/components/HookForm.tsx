import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { setHookFormData } from '../redux/formSlice';
import { useNavigate } from 'react-router-dom';
import { formSchema } from '../schemas/validationSchema';
import '../App.css';

const HookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: 'onChange', // Trigger validation on change
  });

  const onSubmit = (data: any) => {
    const file = data.picture[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      data.picture = reader.result;
      dispatch(setHookFormData(data));
      navigate('/');
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <div className="error-container">
          {errors.name && <div className="error-message">{errors.name.message}</div>}
        </div>
        <input id="name" {...register('name')} type="text" autoComplete="name" />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <div className="error-container">
          {errors.age && <div className="error-message">{errors.age.message}</div>}
        </div>
        <input id="age" {...register('age')} type="number" autoComplete="age" />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <div className="error-container">
          {errors.email && <div className="error-message">{errors.email.message}</div>}
        </div>
        <input id="email" {...register('email')} type="email" autoComplete="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div className="error-container">
          {errors.password && <div className="error-message">{errors.password.message}</div>}
        </div>
        <input id="password" {...register('password')} type="password" autoComplete="new-password" />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="error-container">
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword.message}</div>}
        </div>
        <input id="confirmPassword" {...register('confirmPassword')} type="password" autoComplete="new-password" />
      </div>

      <div>
        <label htmlFor="gender">Gender</label>
        <div className="error-container">
          {errors.gender && <div className="error-message">{errors.gender.message}</div>}
        </div>
        <select id="gender" {...register('gender')} autoComplete="gender">
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label htmlFor="terms">Accept Terms & Conditions</label>
        <div className="error-container">
          {errors.terms && <div className="error-message">{errors.terms.message}</div>}
        </div>
        <input id="terms" {...register('terms')} type="checkbox" />
      </div>

      <div>
        <label htmlFor="picture">Upload Picture</label>
        <div className="error-container">
          {errors.picture && <div className="error-message">{errors.picture.message}</div>}
        </div>
        <input id="picture" {...register('picture')} type="file" />
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <div className="error-container">
          {errors.country && <div className="error-message">{errors.country.message}</div>}
        </div>
        <input id="country" {...register('country')} list="country-options" autoComplete="country" />
        <datalist id="country-options">
          <option value="USA" />
          <option value="Canada" />
          <option value="Argentina" />
          <option value="Brazil" />
          <option value="Canada" />
          <option value="Denmark" />
          <option value="Egypt" />
          <option value="France" />
          <option value="Germany" />
          <option value="Hungary" />
          <option value="India" />
          <option value="Japan" />
        </datalist>
      </div>

      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  );
};

export default HookForm;
