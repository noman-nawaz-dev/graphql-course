import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../graphql/query/user.query";
import { User } from "../types/user.types";
import { Link } from "react-router-dom";

const Users = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  if (error) return <div>Error: {error.message}</div>;
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>Users</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              First Name
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Last Name
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Email
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Profile Photo
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.getAllUsers?.map((user: User) => (
            <tr key={user._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.firstName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.lastName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {user.email}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <Link
                  to={`/users/${user._id}`}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "6px 12px",
                    textDecoration: "none",
                    borderRadius: "4px",
                    marginRight: "8px",
                  }}
                >
                  View
                </Link>
                <Link
                  to={`/users/${user._id}/edit`}
                  style={{
                    backgroundColor: "#2196F3",
                    color: "white",
                    padding: "6px 12px",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
