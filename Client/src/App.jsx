import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Login, Signup } from "./pages";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Signup />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
