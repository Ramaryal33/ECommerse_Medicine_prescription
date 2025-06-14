import '../App.css';  // Ensure the correct path to your App.css
import doctorImg from '../assets/doctor.jpg';  // Ensure the image path is correct

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${doctorImg})`,  // Background image of doctor
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '80vh',  // Adjust image height
        }}
      >
        <div className="overlay">
          <h1 className="text-white fw-bold">WE PROVIDE</h1>
          <h2 className="text-white">TOTAL HEALTH CARE SOLUTION</h2>
          <p className="text-white">
            See your cardiovascular system in action with our interactive illustrations and animations.
          </p>
        </div>
      </div>

      {/* Info Boxes with Background Color */}
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="info-box">
              <h5>EMERGENCY CASE</h5>
              <p>If an urgent problem arises or you need a doctor outside of working hours, call us immediately.</p>
              <p className="fw-bold">+86-123-456-789</p>
              <button className="btn btn-light btn-sm">READ MORE</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-box">
              <h5>DOCTORS TIMETABLE</h5>
              <p>This timetable is a guide. Check online for updated info to plan your appointments.</p>
              <button className="btn btn-light btn-sm">READ MORE</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-box">
              <h5>OPENING HOURS</h5>
              <ul className="list-unstyled">
                <li>Mon - Fri: 08:00 - 17:00</li>
                <li>Saturday: 09:00 - 14:00</li>
                <li>Sunday: 08:00 - 10:00</li>
                <li>Holidays: Closed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} Murkery Healthcare. All rights reserved.
      </footer>
    </div>
  );
}

export default HomePage;
