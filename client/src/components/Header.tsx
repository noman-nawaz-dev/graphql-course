import { Link } from "react-router-dom";

const Header = () => {
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
      </ul>
    </nav>
  );
};

export default Header;
