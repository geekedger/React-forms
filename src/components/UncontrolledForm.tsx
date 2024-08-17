import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUncontrolledFormData } from "../redux/formSlice";
import { useNavigate } from "react-router-dom";
import { formSchema } from "../schemas/validationSchema";
import "../App.css";
import { convertBase64 } from "../utils/convertBase64";
import * as Yup from "yup";
import { RootState } from "../redux/store";

const UncontrolledForm = () => {
  const navigate = useNavigate();

  const countrySelectOptions = useSelector(
    (state: RootState) => state.countries.countries
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const [nameError, setNameError] = useState<string>("");
  const [ageError, setAgeError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [genderError, setGenderError] = useState<string>("");
  const [acceptTermsError, setAcceptTermsError] = useState<string>("");
  const [pictureError, setPictureError] = useState<string>("");
  const [countryError, setCountryError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = pictureRef.current?.files?.[0];

    let base64: string = "";
    if (file) {
      base64 = (await convertBase64(file)) as string;
    }

    const formData = {
      name: nameRef.current?.value,
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      picture: file,
      gender: genderRef.current?.value,
      terms: termsRef.current?.checked || false,
      country: countryRef.current?.value,
    };

    const formDataForSave = { ...formData, picture: base64 };

    try {
      await formSchema.validate(formData, { abortEarly: false });

      dispatch(setUncontrolledFormData(formDataForSave));

      if (nameRef.current) nameRef.current.value = "";
      if (ageRef.current) ageRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";
      if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
      if (genderRef.current) genderRef.current.value = "";
      if (termsRef.current) termsRef.current.checked = false;
      if (pictureRef.current) pictureRef.current.value = "";
      if (countryRef.current) countryRef.current.value = "";

      navigate("/");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = error.inner.reduce(
          (acc, validationError) => {
            acc[validationError.path as keyof typeof formData] =
              validationError.message;
            return acc;
          },
          {} as Record<keyof typeof formData, string>
        );

        setNameError(errors.name || "");
        setAgeError(errors.age || "");
        setEmailError(errors.email || "");
        setPasswordError(errors.password || "");
        setConfirmPasswordError(errors.confirmPassword || "");
        setGenderError(errors.gender || "");
        setAcceptTermsError(errors.terms || "");
        setPictureError(errors.picture || "");
        setCountryError(errors.country || "");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <div className="error-container">
          {nameError && <div className="error-message">{nameError}</div>}
        </div>
        <input
          id="name"
          ref={nameRef}
          name="name"
          type="text"
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <div className="error-container">
          {ageError && <div className="error-message">{ageError}</div>}
        </div>
        <input
          id="age"
          ref={ageRef}
          name="age"
          type="text"
          autoComplete="age"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <div className="error-container">
          {emailError && <div className="error-message">{emailError}</div>}
        </div>
        <input
          id="email"
          ref={emailRef}
          name="email"
          type="email"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div className="error-container">
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
        </div>
        <input
          id="password"
          ref={passwordRef}
          name="password"
          type="password"
          autoComplete="new-password"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="error-container">
          {confirmPasswordError && (
            <div className="error-message">{confirmPasswordError}</div>
          )}
        </div>
        <input
          id="confirmPassword"
          ref={confirmPasswordRef}
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
        />
      </div>

      <div>
        <label htmlFor="gender">Gender</label>
        <div className="error-container">
          {genderError && <div className="error-message">{genderError}</div>}
        </div>
        <select id="gender" ref={genderRef} name="gender" autoComplete="gender">
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label htmlFor="terms">Accept Terms & Conditions</label>
        <div className="error-container">
          {acceptTermsError && (
            <div className="error-message">{acceptTermsError}</div>
          )}
        </div>
        <input id="terms" ref={termsRef} name="terms" type="checkbox" />
      </div>

      <div>
        <label htmlFor="picture">Upload Picture</label>
        <div className="error-container">
          {pictureError && <div className="error-message">{pictureError}</div>}
        </div>
        <input id="picture" ref={pictureRef} name="picture" type="file" />
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <div className="error-container">
          {countryError && <div className="error-message">{countryError}</div>}
        </div>
        <input
          id="country"
          ref={countryRef}
          name="country"
          list="country-options"
          autoComplete="country"
        />
        <datalist id="country-options">
          {countrySelectOptions.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
