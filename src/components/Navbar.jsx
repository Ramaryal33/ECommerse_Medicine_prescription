import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      {/* Internal CSS */}
      <style>
        {`
          .navbar-custom {
            background-color: black;
          }
          .navbar-custom .navbar-brand {
            color: white;
          }
          .navbar-custom .nav-link {
            color: white;
          }
          .navbar-custom .btn {
            background-color: #007bff;
            color: white;
          }
        `}
      </style>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom px-4">
        <Link className="navbar-brand fw-bold fs-4" to="/">Murkery</Link>
        <div className="ms-auto">
          <Link to="/Signup" className="btn btn-primary">Sign Up</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
