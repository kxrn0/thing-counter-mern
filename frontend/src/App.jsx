import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import useAuthContext from "./hooks/useAuthContext";
import Upload from "./pages/Upload/Upload";
import Counter from "./pages/Counter/Counter";
import "./style.css";
import useCounterContext from "./hooks/useCounterContext";

function App() {
  const { user } = useAuthContext();
  const { counters } = useCounterContext();

  return (
    <div className="App">
      <BrowserRouter>
        <button onClick={() => console.log(counters)}>counter store</button>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/home/1" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/home/:page"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/counter/:id" element={<Counter />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
          <Route path="/new-counter" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
