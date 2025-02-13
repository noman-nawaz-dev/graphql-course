import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main style={{ padding: "0 2rem" }}>
        <Outlet />
      </main>
    </>
  );
}

export default App;
