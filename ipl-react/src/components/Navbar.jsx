
function Navbar({ onNavigate }) {
  return (
    <nav className="navbar">
      <h2>🏏 IPL TICKET BOOKING</h2>

      <ul>
        <li>
          <button onClick={() => onNavigate("home")}>
            Home
          </button>
        </li>

        <li>
          <button onClick={() => onNavigate("home")}>
            Matches
          </button>
        </li>

        <li>
          <button onClick={() => onNavigate("home")}>
            Book Tickets
          </button>
        </li>

        <li>
          <button onClick={() => onNavigate("bookings")}>
            My Bookings
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
