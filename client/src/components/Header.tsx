import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "1rem",
        backgroundColor: "#f8f9fa",
        marginBottom: "2rem",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "2rem",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/users" style={{ textDecoration: "none", color: "#333" }}>
            Users
          </Link>
        </li>
        <li>
          <Link to="/posts" style={{ textDecoration: "none", color: "#333" }}>
            Posts
          </Link>
        </li>
        <li>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "#333",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" style={{ textDecoration: "none", color: "#333" }}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
