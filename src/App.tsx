import { Link } from 'react-router-dom';

const App = () => (
  <div>
    <h1>Main Route</h1>
    <nav>
      <ul>
        <li><Link to="/uncontrolled">Uncontrolled Form</Link></li>
        <li><Link to="/hookform">Hook Form</Link></li>
      </ul>
    </nav>
  </div>
);

export default App;
