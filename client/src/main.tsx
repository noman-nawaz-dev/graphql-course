import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./components/Users.tsx";
import Home from "./components/Home.tsx";
import UserDetails from "./components/UserDetails.tsx";
import UserEdit from "./components/UserEdit.tsx";
import Login from "./components/Login.tsx";
import { setContext } from "@apollo/client/link/context";
import ProtectedRoute from "./components/ProtectedRoute";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_SERVER_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? token : "",
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route
              path="users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="users/:id"
              element={
                <ProtectedRoute>
                  <UserDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="users/:id/edit"
              element={
                <ProtectedRoute>
                  <UserEdit />
                </ProtectedRoute>
              }
            />
            <Route path="posts" element={<div>Posts Page (Coming Soon)</div>} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
