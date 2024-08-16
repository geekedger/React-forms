import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RootState } from '../redux/store';
import "../App.css";

const App = () => {
  const hookFormData = useSelector((state: RootState) => state.form.hookFormData);
  const uncontrolledFormData = useSelector((state: RootState) => state.form.uncontrolledFormData);

  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (hookFormData || uncontrolledFormData) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 3000); 
      return () => clearTimeout(timer);
    }
  }, [hookFormData, uncontrolledFormData]);

  const renderFormData = (data: any, formType: string) => {
    if (!data) return null;

    return (
      <div className={`data-display ${highlight ? 'highlight' : ''}`}>
        <h2>{formType} Data:</h2>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Age:</strong> {data.age}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Password:</strong> {data.password}</p>
        <p><strong>Confirm Password:</strong> {data.confirmPassword}</p>
        <p><strong>Gender:</strong> {data.gender}</p>
        <p><strong>Terms Accepted:</strong> {data.terms ? 'Yes' : 'No'}</p>
        <p><strong>Country:</strong> {data.country}</p>
        {data.picture && (
          <div>
            <strong>Picture:</strong>
            <img src={data.picture} alt="Uploaded" style={{ width: '100px', height: 'auto' }} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Main Route</h1>
      <nav className="app-nav">
        <ul>
          <li><Link to="/uncontrolled">Uncontrolled Form</Link></li>
          <li><Link to="/hookform">Hook Form</Link></li>
        </ul>
      </nav>

      {renderFormData(hookFormData, 'Hook Form')}
      {renderFormData(uncontrolledFormData, 'Uncontrolled Form')}
    </div>
  );
};

export default App;
