import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RootState } from '../redux/store';
import { IFormData } from '../schemas/validationSchema'; // Update the path as necessary
import "../App.css";

const App = () => {
  const hookFormData = useSelector((state: RootState) => state.form.hookFormData as IFormData | undefined);
  const uncontrolledFormData = useSelector((state: RootState) => state.form.uncontrolledFormData as IFormData | undefined);

  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    console.log('hookFormData:', hookFormData);
    console.log('uncontrolledFormData:', uncontrolledFormData);

    if (hookFormData || uncontrolledFormData) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 3000); 
      return () => clearTimeout(timer);
    }
  }, [hookFormData, uncontrolledFormData]);

  const renderFormData = (data: IFormData | undefined, formType: string) => {
    if (!data) return null;

    // Handle picture type for picture
    const renderPicture = (picture: File | FileList | string) => {
      console.log('Rendering picture:', picture);

      if (typeof picture === 'string') {
        // If picture is a Base64 string
        if (picture.startsWith('data:image')) {
          console.log('Base64 image URL:', picture);
          return <img src={picture} alt="Uploaded" style={{ width: '200px', height: 'auto' }} />;
        } else {
          console.log('Invalid Base64 image data:', picture);
          return <p>Invalid image data</p>;
        }
      } else if (picture instanceof File) {
        // If picture is a File object
        const objectUrl = URL.createObjectURL(picture);
        console.log('Object URL:', objectUrl);

        // Clean up the object URL when the component unmounts or the picture changes
        useEffect(() => {
          return () => URL.revokeObjectURL(objectUrl);
        }, [objectUrl]);

        return <img src={objectUrl} alt="Uploaded" style={{ width: '200px', height: 'auto' }} />;
      }

      console.log('No picture to render');
      return null; 
    };

    return (
      <div className={`data-display ${highlight ? 'highlight' : ''}`}>
        <h2>{formType} Data:</h2>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Age:</strong> {data.age}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Gender:</strong> {data.gender}</p>
        <p><strong>Country:</strong> {data.country}</p>
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
