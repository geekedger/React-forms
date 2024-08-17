import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { IFormData } from "../schemas/validationSchema";
import "../App.css";

const App = () => {
  const hookFormData = useSelector(
    (state: RootState) => state.form.hookFormData as IFormData | undefined,
  );
  const uncontrolledFormData = useSelector(
    (state: RootState) =>
      state.form.uncontrolledFormData as IFormData | undefined,
  );
  const previousForms = useSelector(
    (state: RootState) => state.form.previousForms,
  );

  const [latestForm, setLatestForm] = useState<string | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (hookFormData) {
      setLatestForm("Hook Form");
      const timer = setTimeout(() => setLatestForm(null), 3000);
      return () => clearTimeout(timer);
    } else if (uncontrolledFormData) {
      setLatestForm("Uncontrolled Form");
      const timer = setTimeout(() => setLatestForm(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [hookFormData, uncontrolledFormData]);

  useEffect(() => {
    if (uncontrolledFormData && uncontrolledFormData.picture instanceof File) {
      const url = URL.createObjectURL(uncontrolledFormData.picture);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (hookFormData && hookFormData.picture instanceof File) {
      const url = URL.createObjectURL(hookFormData.picture);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [hookFormData, uncontrolledFormData]);

  const renderFormData = (data: IFormData | undefined, formType: string) => {
    if (!data) return null;

    const isHighlighted = formType === latestForm;

    const renderPicture = (picture: File | FileList | string) => {
      if (typeof picture === "string") {
        if (picture.startsWith("data:image")) {
          return (
            <img
              src={picture}
              alt="Uploaded"
              style={{ width: "200px", height: "auto" }}
            />
          );
        } else {
          return <p>Invalid image data</p>;
        }
      } else if (picture instanceof File && objectUrl) {
        return (
          <img
            src={objectUrl}
            alt="Uploaded"
            style={{ width: "200px", height: "auto" }}
          />
        );
      }
      return null;
    };

    return (
      <div className={`data-display ${isHighlighted ? "highlight" : ""}`}>
        <h2>{formType} Data:</h2>
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Age:</strong> {data.age}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Gender:</strong> {data.gender}
        </p>
        <p>
          <strong>Country:</strong> {data.country}
        </p>
        {data.picture && (
          <div>
            <strong>Picture:</strong>
            {renderPicture(data.picture)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="current-forms">
        <h1 className="app-title">Main Route</h1>
        <nav className="app-nav">
          <ul>
            <li>
              <Link to="/uncontrolled">Uncontrolled Form</Link>
            </li>
            <li>
              <Link to="/hookform">Hook Form</Link>
            </li>
          </ul>
        </nav>

        {hookFormData && renderFormData(hookFormData, "Hook Form")}
        {uncontrolledFormData &&
          renderFormData(uncontrolledFormData, "Uncontrolled Form")}
      </div>

      {previousForms.length > 2 && (
        <div className="previous-forms">
          <h2>Previous Forms:</h2>
          {previousForms.map((formData, index) => (
            <div
              key={index}
              className={`previous-form ${
                index === previousForms.length - 1 ? "highlight" : ""
              }`}
            >
              {renderFormData(formData, `Previous Form ${index + 1}`)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
