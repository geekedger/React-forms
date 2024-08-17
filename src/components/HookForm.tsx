import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { setHookFormData } from "../redux/formSlice";
import { useNavigate } from "react-router-dom";
import { formSchema, IFormData } from "../schemas/validationSchema";
import { convertBase64 } from "../utils/convertBase64"; // Importing the convertBase64 utility
import "../App.css";
import { useForm } from "react-hook-form";
import { RootState } from "../redux/store";

const HookForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver<IFormData>(formSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      age: 0,
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      terms: false,
      picture: undefined,
      country: "",
    },
  });

  const { errors, isValid } = formState;
  const countrySelectOptions = useSelector(
    (state: RootState) => state.countries.countries
  );
  const dispatch = useDispatch();

  const onSubmit = async (data: IFormData) => {
    const file = data.picture && (data.picture as FileList)[0];
    let base64: string = "";
    if (file) {
      base64 = (await convertBase64(file as File)) as string;
    }
    const formDataForSave = { ...data, picture: base64 };
    dispatch(setHookFormData(formDataForSave));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <div className="error-container">
          {errors.name && (
            <div className="error-message">{errors.name.message}</div>
          )}
        </div>
        <input
          id="name"
          {...register("name")}
          type="text"
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <div className="error-container">
          {errors.age && (
            <div className="error-message">{errors.age.message}</div>
          )}
        </div>
        <input id="age" {...register("age")} type="number" autoComplete="age" />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <div className="error-container">
          {errors.email && (
            <div className="error-message">{errors.email.message}</div>
          )}
        </div>
        <input
          id="email"
          {...register("email")}
          type="email"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div className="error-container">
          {errors.password && (
            <div className="error-message">{errors.password.message}</div>
          )}
        </div>
        <input
          id="password"
          {...register("password")}
          type="password"
          autoComplete="new-password"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="error-container">
          {errors.confirmPassword && (
            <div className="error-message">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>
        <input
          id="confirmPassword"
          {...register("confirmPassword")}
          type="password"
          autoComplete="new-password"
        />
      </div>

      <div>
        <label htmlFor="gender">Gender</label>
        <div className="error-container">
          {errors.gender && (
            <div className="error-message">{errors.gender.message}</div>
          )}
        </div>
        <select id="gender" {...register("gender")} autoComplete="gender">
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label htmlFor="terms">Accept Terms & Conditions</label>
        <div className="error-container">
          {errors.terms && (
            <div className="error-message">{errors.terms.message}</div>
          )}
        </div>
        <input id="terms" {...register("terms")} type="checkbox" />
      </div>

      <div>
        <label htmlFor="picture">Upload Picture</label>
        <div className="error-container">
          {errors.picture && (
            <div className="error-message">{errors.picture.message}</div>
          )}
        </div>
        <input id="picture" {...register("picture")} type="file" />
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <div className="error-container">
          {errors.country && (
            <div className="error-message">{errors.country.message}</div>
          )}
        </div>
        <input
          id="country"
          {...register("country")}
          list="country-options"
          autoComplete="country"
        />
        <datalist id="country-options">
          {countrySelectOptions.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </div>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default HookForm;
