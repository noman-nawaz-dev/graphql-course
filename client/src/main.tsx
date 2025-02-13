import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./components/Users.tsx";
import Home from "./components/Home.tsx";
import UserDetails from "./components/UserDetails.tsx";
import UserEdit from "./components/UserEdit.tsx";

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_SERVER_URI,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="users/:id/edit" element={<UserEdit />} />
            <Route path="posts" element={<div>Posts Page (Coming Soon)</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
