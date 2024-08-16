import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUncontrolledFormData } from '../redux/formSlice';
import { useNavigate } from 'react-router-dom';
import { formSchema } from '../schemas/validationSchema';
import '../App.css';
import { validCountries } from '../data/countries';

const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Convert FormData to a plain object
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Manually handle checkbox value
    data.terms = formData.has('terms'); // Checkbox is checked if it exists in FormData

    // Perform validation
    try {
      await formSchema.validate(data, { abortEarly: false });
      setErrors({});

      // Handle file processing
      const file = formData.get('picture') as File | null;

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          data.picture = reader.result as string;
          dispatch(setUncontrolledFormData(data));
          navigate('/');
        };
        reader.readAsDataURL(file);
      } else {
        dispatch(setUncontrolledFormData(data));
        navigate('/');
      }
    } catch (validationErrors: any) {
      const errorObj: { [key: string]: string } = {};
      validationErrors.inner.forEach((err: any) => {
        errorObj[err.path] = err.message;
      });
      setErrors(errorObj);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <div className="error-container">
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <input id="name" name="name" type="text" autoComplete="name" />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <div className="error-container">
          {errors.age && <div className="error-message">{errors.age}</div>}
        </div>
        <input id="age" name="age" type="text" autoComplete="age" />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <div className="error-container">
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <input id="email" name="email" type="email" autoComplete="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div className="error-container">
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        <input id="password" name="password" type="password" autoComplete="new-password" />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="error-container">
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
        </div>
        <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" />
      </div>

      <div>
        <label htmlFor="gender">Gender</label>
        <div className="error-container">
          {errors.gender && <div className="error-message">{errors.gender}</div>}
        </div>
        <select id="gender" name="gender" autoComplete="gender">
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label htmlFor="terms">Accept Terms & Conditions</label>
        <div className="error-container">
          {errors.terms && <div className="error-message">{errors.terms}</div>}
        </div>
        <input id="terms" name="terms" type="checkbox" />
      </div>

      <div>
        <label htmlFor="picture">Upload Picture</label>
        <div className="error-container">
          {errors.picture && <div className="error-message">{errors.picture}</div>}
        </div>
        <input id="picture" name="picture" type="file" />
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <div className="error-container">
          {errors.country && <div className="error-message">{errors.country}</div>}
        </div>
        <input id="country" name="country" list="country-options" autoComplete="country" />
        <datalist id="country-options">
          {validCountries.map(country => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;