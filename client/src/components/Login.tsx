import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_USER_TOKEN } from "../graphql/query/user.query";
import { useUser } from "../hooks/useUser";
import { getUserIdFromToken } from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [getUserToken, { loading }] = useLazyQuery(GET_USER_TOKEN, {
    onCompleted: (data) => {
      const token = data.getUserToken;
      if (token) {
        localStorage.setItem("authToken", token);
        const userId = getUserIdFromToken();
        // Fetch user details and set user context
        const user = {
          _id: userId,
        }; // Replace with actual user data
        setUser(user);
        navigate("/users");
      } else {
        setError("Invalid credentials");
      }
    },
    onError: (error) => {
      setError(error.message);
      localStorage.removeItem("authToken"); // Clear any existing invalid token
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await getUserToken({
        variables: { email, password },
      });
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && (
        <div
          style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}
        >
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
              required
              disabled={loading}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
              required
              disabled={loading}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
