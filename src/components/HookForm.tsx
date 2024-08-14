import { useForm } from 'react-hook-form';

 // путь к файлу с нашей схемой
import { useDispatch } from 'react-redux';
import { setHookFormData } from '../redux/formSlice';
import { useNavigate } from 'react-router-dom';
import { formSchema } from '../schemas/validationSchema';

import { yupResolver } from '@hookform/resolvers/yup';
const HookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    // Преобразуем изображение в base64
    const reader = new FileReader();
    reader.onloadend = () => {
      data.picture = reader.result;
      dispatch(setHookFormData(data));
      navigate('/');
    };
    reader.readAsDataURL(data.picture[0]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" {...register('age')} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" {...register('gender')}>
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>

      <div>
        <label htmlFor="terms">Accept Terms & Conditions</label>
        <input id="terms" type="checkbox" {...register('terms')} />
        {errors.terms && <p>{errors.terms.message}</p>}
      </div>

      <div>
        <label htmlFor="picture">Upload Picture</label>
        <input id="picture" type="file" {...register('picture')} />
        {errors.picture && <p>{errors.picture.message}</p>}
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <input id="country" {...register('country')} list="country-options" />
        <datalist id="country-options">
          <option value="USA" />
          <option value="Canada" />
          {/* Добавьте сюда остальные страны */}
        </datalist>
        {errors.country && <p>{errors.country.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default HookForm;
