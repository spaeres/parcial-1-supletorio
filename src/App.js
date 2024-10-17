import "./App.css";
import LoginComponent from "./components/Login/index";
import HomeComponent from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/home" element={<HomeComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
